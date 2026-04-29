Icones do kill feed (Valorant-style HUD)
========================================

Cada arquivo abaixo representa uma causa de morte. Ao colocar o PNG aqui, o
kill feed automaticamente passa a mostrar a imagem em vez do círculo
colorido com letra (fallback).

Formato esperado: PNG quadrado, 64x64 (ou similar — o jogo escala pra 28px),
fundo transparente, ícone branco/colorido nítido (estilo flat, sem detalhes
finos demais).

Arquivos esperados:
- basic_attack.png        — espada / golpe básico
- eye_attack.png          — bote do Flying Eye
- skull_curse.png         — caveira (skull curse contato)
- skull_curse_dot.png     — veneno (DOT do skull curse)
- skeleton_bite.png       — mordida do esqueleto/omar
- archer_arrow.png        — flecha do arqueiro
- archer_arrow_pierce.png — flecha roxa piercing (L2)
- heavens_fury.png        — raio do Heaven's Fury
- land_mine.png           — mina (L1 e festa L2)
- wheel.png               — roda
- fire_storm.png          — fogo (raio do fire storm)
- fire_storm_burn.png     — queimadura DOT (fire storm L2)
- ice_beam.png            — gelo / snowstorm L2 dmg tick
- fall.png                — caiu do mapa (suicídio)

Sem o arquivo: kill feed mostra um círculo colorido com a letra inicial
da causa. Não quebra nada.

------------------------------------------------------------------------

Cabeças dos players (avatar do killer/vítima)
=============================================

Mesma pasta. Formato: PNG quadrado (preferencialmente 64x64), fundo
transparente, só a cabeça/rosto do personagem (jogo escala pra ~26px).

Arquivos esperados:
- head_p1.png  — Player 1 (laranja)
- head_p2.png  — Player 2 (roxo)
- head_p3.png  — Player 3 (verde)
- head_p4.png  — Player 4 (vermelho)

Sem o arquivo: kill feed mostra pílula colorida (cor do char) com o nick
do jogador.
