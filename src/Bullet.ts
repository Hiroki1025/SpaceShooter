import * as THREE from "three";

export class Bullet {

    public mesh: THREE.Mesh;

    public speed: number = 0.8;
    public alive: boolean = true;

    constructor(position: THREE.Vector3) {

        const geometry =
            new THREE.SphereGeometry(
                0.12,
                16,
                16
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: 0x00ffff,
                emissive: 0x0088ff

            });

        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        this.mesh.castShadow = true;

        this.mesh.position.copy(position);

        this.mesh.position.y += 0.3;
    }

    public update(): void {

        this.mesh.position.z -= this.speed;

        if (
            this.mesh.position.z < -180
        ) {

            this.alive = false;

        }

    }

    public getRadius(): number {

        return 0.2;

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