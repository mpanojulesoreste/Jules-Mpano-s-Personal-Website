import { Color } from 'three';

// Signature depth-gradient colormap, matched to the brief's three anchor
// stops (viridis-style): #440154 -> #21918C -> #FDE725.
const STOPS = [
  { t: 0, color: new Color('#440154') },
  { t: 0.5, color: new Color('#21918C') },
  { t: 1, color: new Color('#FDE725') },
];

const scratch = new Color();

/** Sample the depth colormap at t in [0, 1]. Near = warm (t near 1), far = cool (t near 0). */
export function depthColorAt(t: number, target: Color = scratch): Color {
  const clamped = Math.min(1, Math.max(0, t));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (clamped >= a.t && clamped <= b.t) {
      const localT = (clamped - a.t) / (b.t - a.t);
      return target.copy(a.color).lerp(b.color, localT);
    }
  }
  return target.copy(STOPS[STOPS.length - 1].color);
}
