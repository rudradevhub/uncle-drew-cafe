import { Effect, EffectAttribute } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
  uniform float progress;
  uniform float pixelSize;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
    // 1. DEPTH MASKING: Ignore background (depth > 0.99)
    if (depth > 0.99) {
      outputColor = inputColor;
      return;
    }

    // 2. PIXELATION LOGIC
    float d = pixelSize;
    vec2 gridUV = floor(uv * d) / d;
    vec4 pixelatedColor = texture2D(inputBuffer, gridUV);

    // 3. DITHERED BLEND
    float noise = random(gl_FragCoord.xy);
    float mixFactor = smoothstep(progress - 0.2, progress + 0.2, noise);
    float finalMix = mix(0.0, 1.0, progress * 1.5); 

    if (finalMix < noise) {
        outputColor = pixelatedColor;
        // Subtle texture grain
        outputColor.rgb += (noise - 0.5) * 0.05;
    } else {
        outputColor = inputColor;
    }
  }
`;

type ResolutionEffectProps = {
  progress: number;
  pixelSize?: number;
};

export class ResolutionEffect extends Effect {
  constructor({ progress = 0, pixelSize = 60.0 }: ResolutionEffectProps) {
    super(
      'ResolutionEffect',
      fragmentShader,
      {
        attributes: EffectAttribute.DEPTH,
        uniforms: new Map([
          ['progress', new Uniform(progress)],
          ['pixelSize', new Uniform(pixelSize)],
        ]),
      }
    );
  }

  updateProgress(p: number) {
    const u_progress = this.uniforms.get('progress');
    if (u_progress) u_progress.value = p;
  }
}