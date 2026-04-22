shader_type canvas_item;

uniform float source_hue : hint_range(0.0, 360.0) = 0.0;
uniform float hue_tolerance : hint_range(0.0, 180.0) = 30.0;
uniform vec4 swap_color : source_color = vec4(1.0, 0.5, 0.1, 1.0);
uniform float min_saturation : hint_range(0.0, 1.0) = 0.2;
uniform bool debug_mode = false;

vec3 rgb2hsv(vec3 c) {
	vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void fragment() {
	vec4 tex = texture(TEXTURE, UV);

	if (tex.a > 0.01) {
		vec3 hsv = rgb2hsv(tex.rgb);
		float hue_diff = abs(hsv.x - source_hue / 360.0);
		hue_diff = min(hue_diff, 1.0 - hue_diff);
		bool in_range = hue_diff < hue_tolerance / 360.0 && hsv.y > min_saturation;

		if (debug_mode) {
			// Verde = pixel detectado, vermelho = fora do range
			COLOR = in_range ? vec4(0.0, 1.0, 0.0, tex.a) : vec4(1.0, 0.0, 0.0, tex.a);
		} else if (in_range) {
			vec3 target_hsv = rgb2hsv(swap_color.rgb);
			vec3 new_hsv;
			if (target_hsv.y < 0.05) {
				// Cor alvo acromática (branco, cinza, preto) → desatura mantendo brilho relativo
				float value_ratio = (target_hsv.z > 0.001) ? (hsv.z / target_hsv.z) : 1.0;
				new_hsv = vec3(hsv.x, 0.0, clamp(target_hsv.z * value_ratio, 0.0, 1.0));
			} else {
				// Cor cromática → troca só o hue, mantém saturação e brilho originais
				new_hsv = vec3(target_hsv.x, hsv.y, hsv.z);
			}
			COLOR = vec4(hsv2rgb(new_hsv), tex.a);
		} else {
			COLOR = tex;
		}
	} else {
		COLOR = tex;
	}
}
