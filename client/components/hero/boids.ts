import { Vector3 } from 'three';

export interface Boid {
  position: Vector3;
  velocity: Vector3;
}

export interface BoidsConfig {
  count: number;
  bounds: Vector3; // half-extents of the containment box
  maxSpeed: number;
  maxForce: number;
  perceptionRadius: number;
  separationRadius: number;
  cursorAvoidRadius: number;
}

export function createBoids(config: BoidsConfig): Boid[] {
  const boids: Boid[] = [];
  for (let i = 0; i < config.count; i++) {
    boids.push({
      position: new Vector3(
        (Math.random() * 2 - 1) * config.bounds.x,
        (Math.random() * 2 - 1) * config.bounds.y,
        (Math.random() * 2 - 1) * config.bounds.z
      ),
      velocity: new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
        .normalize()
        .multiplyScalar(config.maxSpeed * 0.5),
    });
  }
  return boids;
}

const tmp = new Vector3();
const separation = new Vector3();
const alignment = new Vector3();
const cohesion = new Vector3();
const avoidCursor = new Vector3();
const acceleration = new Vector3();

/**
 * One simulation step of classic separation/alignment/cohesion flocking,
 * plus gentle avoidance of a world-space cursor target. Mutates boids in place.
 * O(n^2) neighbor search -- fine at this instance count (<=300) for a decorative scene.
 */
export function stepBoids(
  boids: Boid[],
  config: BoidsConfig,
  delta: number,
  cursorTarget: Vector3 | null
) {
  for (let i = 0; i < boids.length; i++) {
    const boid = boids[i];
    separation.set(0, 0, 0);
    alignment.set(0, 0, 0);
    cohesion.set(0, 0, 0);
    let neighborCount = 0;
    let separationCount = 0;

    for (let j = 0; j < boids.length; j++) {
      if (i === j) continue;
      const other = boids[j];
      const dist = boid.position.distanceTo(other.position);
      if (dist < config.perceptionRadius && dist > 0) {
        alignment.add(other.velocity);
        cohesion.add(other.position);
        neighborCount++;
      }
      if (dist < config.separationRadius && dist > 0) {
        tmp.copy(boid.position).sub(other.position).divideScalar(dist * dist);
        separation.add(tmp);
        separationCount++;
      }
    }

    acceleration.set(0, 0, 0);

    if (neighborCount > 0) {
      alignment.divideScalar(neighborCount).setLength(config.maxSpeed).sub(boid.velocity);
      alignment.clampLength(0, config.maxForce);

      cohesion.divideScalar(neighborCount).sub(boid.position).setLength(config.maxSpeed).sub(boid.velocity);
      cohesion.clampLength(0, config.maxForce);

      acceleration.add(alignment.multiplyScalar(1.0));
      acceleration.add(cohesion.multiplyScalar(0.9));
    }

    if (separationCount > 0) {
      separation.divideScalar(separationCount).setLength(config.maxSpeed).sub(boid.velocity);
      separation.clampLength(0, config.maxForce);
      acceleration.add(separation.multiplyScalar(1.6));
    }

    // Gentle cursor avoidance -- nothing gimmicky, just a soft repulsion field.
    if (cursorTarget) {
      const dist = boid.position.distanceTo(cursorTarget);
      if (dist < config.cursorAvoidRadius && dist > 0) {
        avoidCursor
          .copy(boid.position)
          .sub(cursorTarget)
          .setLength(config.maxSpeed)
          .sub(boid.velocity);
        avoidCursor.clampLength(0, config.maxForce * 2.5);
        const strength = 1 - dist / config.cursorAvoidRadius;
        acceleration.add(avoidCursor.multiplyScalar(strength));
      }
    }

    // Soft containment: steer back toward center as boids approach bounds.
    if (Math.abs(boid.position.x) > config.bounds.x * 0.85) {
      acceleration.x -= Math.sign(boid.position.x) * config.maxForce * 1.5;
    }
    if (Math.abs(boid.position.y) > config.bounds.y * 0.85) {
      acceleration.y -= Math.sign(boid.position.y) * config.maxForce * 1.5;
    }
    if (Math.abs(boid.position.z) > config.bounds.z * 0.85) {
      acceleration.z -= Math.sign(boid.position.z) * config.maxForce * 1.5;
    }

    boid.velocity.add(acceleration.multiplyScalar(delta * 60));
    boid.velocity.clampLength(0, config.maxSpeed);
    boid.position.add(tmp.copy(boid.velocity).multiplyScalar(delta * 60 * 0.016));
  }
}
