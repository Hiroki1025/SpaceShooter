import * as THREE from "three";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Bullet } from "./Bullet";
import { EnemyBullet } from "./EnemyBullet";

export class Collision {

    public static checkSphere(
        p1: THREE.Vector3,
        r1: number,
        p2: THREE.Vector3,
        r2: number
    ): boolean {

        return p1.distanceTo(p2) <= r1 + r2;

    }

    public static bulletVsEnemies(
        bullets: Bullet[],
        enemies: Enemy[],
        scene: THREE.Scene
    ): number {

        let score = 0;

        for (const bullet of bullets) {

            if (!bullet.alive) continue;

            for (const enemy of enemies) {

                if (!enemy.mesh.parent) continue;

                if (
                    this.checkSphere(
                        bullet.mesh.position,
                        bullet.getRadius(),
                        enemy.mesh.position,
                        0.9
                    )
                ) {

                    bullet.alive = false;
                    bullet.remove(scene);

                    if (enemy.damage(1)) {

                        enemy.destroy(scene);

                        score += 100;

                    }

                    break;

                }

            }

        }

        return score;

    }

    public static enemyBulletVsPlayer(
        bullets: EnemyBullet[],
        player: Player,
        scene: THREE.Scene
    ): boolean {

        for (const bullet of bullets) {

            if (!bullet.alive) continue;

            if (
                this.checkSphere(
                    bullet.mesh.position,
                    0.2,
                    player.mesh.position,
                    0.8
                )
            ) {

                bullet.alive = false;
                bullet.remove(scene);

                return true;

            }

        }

        return false;

    }

    public static playerVsEnemies(
        player: Player,
        enemies: Enemy[]
    ): boolean {

        for (const enemy of enemies) {

            if (!enemy.mesh.parent) continue;

            if (
                this.checkSphere(
                    player.mesh.position,
                    0.8,
                    enemy.mesh.position,
                    0.9
                )
            ) {

                return true;

            }

        }

        return false;

    }

    public static playerVsWalls(
        player: Player,
        walls: THREE.Mesh[]
    ): void {

        const radius = 0.6;

        for (const wall of walls) {

            const box =
                new THREE.Box3().setFromObject(wall);

            const minX = box.min.x - radius;
            const maxX = box.max.x + radius;
            const minZ = box.min.z - radius;
            const maxZ = box.max.z + radius;

            const p = player.mesh.position;

            if (
                p.x > minX &&
                p.x < maxX &&
                p.z > minZ &&
                p.z < maxZ
            ) {

                const dx1 = Math.abs(p.x - minX);
                const dx2 = Math.abs(maxX - p.x);
                const dz1 = Math.abs(p.z - minZ);
                const dz2 = Math.abs(maxZ - p.z);

                const min = Math.min(
                    dx1,
                    dx2,
                    dz1,
                    dz2
                );

                if (min === dx1) {

                    p.x = minX;

                } else if (min === dx2) {

                    p.x = maxX;

                } else if (min === dz1) {

                    p.z = minZ;

                } else {

                    p.z = maxZ;

                }

            }

        }

    }

    public static bulletVsWalls(
        bullets: Bullet[],
        walls: THREE.Mesh[],
        scene: THREE.Scene
    ): void {

        for (const bullet of bullets) {

            if (!bullet.alive) continue;

            for (const wall of walls) {

                const box =
                    new THREE.Box3().setFromObject(wall);

                if (
                    box.containsPoint(
                        bullet.mesh.position
                    )
                ) {

                    bullet.alive = false;

                    bullet.remove(scene);

                    break;

                }

            }

        }

    }

    public static removeDeadBullets(
        bullets: Bullet[],
        scene: THREE.Scene
    ): Bullet[] {

        return bullets.filter((bullet) => {

            if (!bullet.alive) {

                bullet.remove(scene);

                return false;

            }

            return true;

        });

    }

    public static removeDeadEnemyBullets(
        bullets: EnemyBullet[],
        scene: THREE.Scene
    ): EnemyBullet[] {

        return bullets.filter((bullet) => {

            if (!bullet.alive) {

                bullet.remove(scene);

                return false;

            }

            return true;

        });

    }

    public static removeDeadEnemies(
        enemies: Enemy[]
    ): Enemy[] {

        return enemies.filter(
            enemy => enemy.mesh.parent !== null
        );

    }

}