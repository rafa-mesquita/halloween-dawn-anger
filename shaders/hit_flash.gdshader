shader_type canvas_item;

uniform float intensity : hint_range(0.0, 1.0) = 0.7;

void fragment() {
	vec4 tex = texture(TEXTURE, UV);
	if (tex.a > 0.01) {
		// Mistura o pixel original com vermelho puro
		vec3 red = vec3(1.0, 0.0, 0.0);
		COLOR = vec4(mix(tex.rgb, red, intensity), tex.a);
	} else {
		COLOR = vec4(0.0);
	}
}
