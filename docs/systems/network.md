# System: Network

Status: pendente (Sprint 8)

## Arquitetura

Host-as-hub: 1 host + até 3 clientes. Host é autoridade do loot. Damage é autoridade do target.
Usar Godot High-Level Multiplayer API com ENet (jogo instalado) ou WebRTC (export HTML5).

## NetworkManager.gd (Autoload)

```gdscript
var is_host: bool
var my_index: int       # 0 = host, 1+ = clientes
var peers: Array        # [{index, char_id, nick}]

func host_game() -> String   # retorna código 5 dígitos
func join_game(code: String) -> void
func set_my_character(char_id: String) -> void
func set_my_nick(nick: String) -> void   # máx 12 chars
func start_match(players: Array) -> void  # host only
```

## RPCs por sistema

| Sistema | RPC | Confiabilidade |
|---|---|---|
| State sync | `sync_state(data: Dictionary)` | unreliable (30Hz) |
| Dano | `apply_incoming_hit(hit: Dictionary)` | reliable |
| Power cast | `broadcast_power_cast(params: Dictionary)` | reliable |
| Loot spawn | `spawn_loot(data: Dictionary)` | reliable |
| Loot pickup | `pickup_loot(net_id: int)` | reliable |
| Loot despawn | `despawn_loot(net_id: int)` | reliable |
| Restart | `restart_match()` | reliable |

## Payload do state sync (30Hz)

```gdscript
{
    "x": position.x,
    "y": position.y,
    "flip_x": sprite.flip_h,
    "anim": current_anim_name,
    "frame": current_frame_index,
    "hp": hp,
    "lives": lives,
    "is_dead": is_dead,
    "shielded": shield_charges > 0,
    "stunned": is_stunned,
    "cursed": curse_multiplier > 1.0,
    "powers": special_powers.duplicate(),
    "is_eye": is_eye,
    "eye_hits": eye_hits_remaining,
    "eye_facing": eye_facing,
    "eye_dashing": is_dashing,
    "eye_remaining_ms": eye_transform_remaining_ms,
    "frozen": is_frozen,
    "slamming": is_slamming,
}
```

## Autoridade de dano

O fighter é `MultiplayerSynchronizer` authority do próprio peer.
`apply_incoming_hit` só executa no cliente dono do fighter:
```gdscript
@rpc("any_peer", "call_local", "reliable")
func apply_incoming_hit(hit: Dictionary) -> void:
    if not is_multiplayer_authority(): return
    # aplicar dano localmente
```

## Loot authority

Apenas o host spawna e despawna loots. Clientes só recebem eventos via RPC.
Triple-send não é necessário com RPCs reliable do Godot (ENet garante entrega).

## Código de sala

5 dígitos aleatórios gerados pelo host. Compartilhado manualmente (clipboard).
Sem broker externo — conexão direta via IP local ou relay se necessário.
