import * as THREE from "three";

import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Bullet } from "./Bullet";
import { EnemyBullet } from "./EnemyBullet";
import { Particle } from "./Particle";
import { HUD } from "./HUD";
import { Collision } from "./Collision";
import { Stage } from "./Stage";

export class GameManager {

    private scene: THREE.Scene;
    private stage: Stage;
    private player: Player;
    private hud: HUD;

    public enemies: Enemy[] = [];
    public bullets: Bullet[] = [];
    public enemyBullets: EnemyBullet[] = [];
    public particles: Particle[] = [];

    private spawnTimer = 0;
    private shootTimer = 0;
    private enemyShootTimer = 0;

    private score = 0;

    constructor(
        scene: THREE.Scene,
        stage: Stage,
        player: Player,
        hud: HUD
    ) {

        this.scene = scene;
        this.stage = stage;
        this.player = player;
        this.hud = hud;

        for (let i = 0; i < 6; i++) {

            this.spawnEnemy();

        }

    }

    private spawnEnemy(): void {

        const x =
            THREE.MathUtils.randFloat(
                -18,
                18
            );

        const z =
            THREE.MathUtils.randFloat(
                -140,
                -80
            );

        const enemy =
            new Enemy(
                x,
                z
            );

        this.scene.add(
            enemy.mesh
        );

        this.enemies.push(
            enemy
        );

    }
        public shoot(): void {

        if (this.shootTimer > 0) {
            return;
        }

        const position =
            this.player.mesh.position.clone();

        position.y += 0.3;

        const bullet =
            new Bullet(position);

        this.scene.add(
            bullet.mesh
        );

        this.bullets.push(
            bullet
        );

        this.shootTimer = 10;

    }

    private enemyShoot(): void {

        if (this.enemyShootTimer > 0) {
            return;
        }

        for (const enemy of this.enemies) {

            if (!enemy.mesh.parent) {
                continue;
            }

            if (Math.random() < 0.25) {

                const bullet =
                    new EnemyBullet(
                        enemy.mesh.position.clone(),
                        this.player.mesh.position.clone()
                    );

                this.scene.add(
                    bullet.mesh
                );

                this.enemyBullets.push(
                    bullet
                );

            }

        }

        this.enemyShootTimer = 40;

    }

    private createExplosion(
        position: THREE.Vector3
    ): void {

        for (let i = 0; i < 15; i++) {

            const particle =
                new Particle(
                    position.clone()
                );

            this.scene.add(
                particle.mesh
            );

            this.particles.push(
                particle
            );

        }

    }

    private addScore(
    value: number
): void {

    this.score += value;

    this.hud.addScore(
        value
    );

}
        public update(): void {

        if (this.shootTimer > 0) {

            this.shootTimer--;

        }

        if (this.enemyShootTimer > 0) {

            this.enemyShootTimer--;

        }

        this.spawnTimer++;

        if (this.spawnTimer >= 120) {

            this.spawnEnemy();

            this.spawnTimer = 0;

        }

        this.enemyShoot();

        for (const bullet of this.bullets) {

            bullet.update();

        }

        for (const bullet of this.enemyBullets) {

            bullet.update();

        }

        for (const enemy of this.enemies) {

            enemy.update(
                this.player.mesh.position
            );

        }

        for (const particle of this.particles) {

            particle.update();

        }

        Collision.playerVsWalls(
            this.player,
            this.stage.walls
        );

        Collision.bulletVsWalls(
            this.bullets,
            this.stage.walls,
            this.scene
        );

        const score = Collision.bulletVsEnemies(
            this.bullets,
            this.enemies,
            this.scene
        );

        if (score > 0) {

            this.addScore(score);

            for (const enemy of this.enemies) {

                if (!enemy.mesh.parent) {

                    this.createExplosion(
                        enemy.mesh.position.clone()
                    );

                }

            }

        }

        if (

            Collision.enemyBulletVsPlayer(
                this.enemyBullets,
                this.player,
                this.scene
            )

        ) {

            this.hud.damage();

        }

        if (

            Collision.playerVsEnemies(
                this.player,
                this.enemies
            )

        ) {

            this.hud.damage();

        }
                this.bullets =
            Collision.removeDeadBullets(
                this.bullets,
                this.scene
            );

        this.enemyBullets =
            Collision.removeDeadEnemyBullets(
                this.enemyBullets,
                this.scene
            );

        this.enemies =
            Collision.removeDeadEnemies(
                this.enemies
            );

        this.particles =
            this.particles.filter((particle) => {

                if (!particle.alive) {

                    this.scene.remove(
                        particle.mesh
                    );

                    particle.dispose();

                    return false;

                }

                return true;

            });

        if (this.hud.getHP() <= 0) {

            this.hud.gameOver();

        }

        if (

            this.score >= 2500

        ) {

            this.hud.clear();
        }

    }

}