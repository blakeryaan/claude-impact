import { describe, it, expect } from 'vitest';
import { haversineKm } from './haversine';

describe('haversineKm', () => {
  it('returns 0 for the same point', () => {
    expect(haversineKm(-37.8136, 144.9631, -37.8136, 144.9631)).toBeCloseTo(0, 3);
  });
  it('matches a known Melbourne distance (CBD → Williamstown ~8km)', () => {
    const d = haversineKm(-37.8136, 144.9631, -37.8650, 144.9000);
    expect(d).toBeGreaterThan(7);
    expect(d).toBeLessThan(9);
  });
  it('is symmetric', () => {
    const a = haversineKm(-37.81, 144.96, -37.79, 144.97);
    const b = haversineKm(-37.79, 144.97, -37.81, 144.96);
    expect(a).toBeCloseTo(b, 6);
  });
});
