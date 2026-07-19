import * as THREE from "three";

export class EnemyBullet {

    public mesh: THREE.Mesh;
    public speed = 0.35;
    public alive = true;

    private direction: THREE.Vector3;

    constructor(
        start: THREE.Vector3,
        target: THREE.Vector3
    ) {

        const geometry =
            new THREE.SphereGeometry(
                0.15,
                16,
                16
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: 0xff3300,
                emissive: 0xaa0000

            });

        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        this.mesh.castShadow = true;
        this.mesh.position.copy(start);

        this.direction =
            new THREE.Vector3();

        this.direction.subVectors(
            target,
            start
        );

        this.direction.normalize();

    }

    public update(): void {

        this.mesh.position.addScaledVector(
            this.direction,
            this.speed
        );

        if (

            this.mesh.position.z > 40 ||
            this.mesh.position.z < -180 ||
            Math.abs(this.mesh.position.x) > 40

        ) {

            this.alive = false;

        }

    }

    public remove(
        scene: THREE.Scene
    ): void {

        scene.remove(this.mesh);

        this.mesh.geometry.dispose();

        if (Array.isArray(this.mesh.material)) {

            this.mesh.material.forEach(
                material => material.dispose()
            );

        } else {

            this.mesh.material.dispose();

        }

    }

}