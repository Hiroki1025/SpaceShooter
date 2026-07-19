import * as THREE from "three";

export class Particle {

    public mesh: THREE.Points;

    private velocities: THREE.Vector3[] = [];

    private life = 1.0;

    public alive = true;

    constructor(position: THREE.Vector3) {

        const count = 80;

        const vertices: number[] = [];

        for (let i = 0; i < count; i++) {

            vertices.push(
                position.x,
                position.y,
                position.z
            );

            this.velocities.push(

                new THREE.Vector3(

                    THREE.MathUtils.randFloatSpread(0.35),

                    THREE.MathUtils.randFloatSpread(0.35),

                    THREE.MathUtils.randFloatSpread(0.35)

                )

            );

        }

        const geometry =
            new THREE.BufferGeometry();

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                vertices,
                3
            )

        );

        const material =
            new THREE.PointsMaterial({

                color: 0xffcc33,

                size: 0.18,

                transparent: true,

                opacity: 1

            });

        this.mesh =
            new THREE.Points(
                geometry,
                material
            );

    }

    public update(): void {

        if (!this.alive) {

            return;

        }

        const positions =
            this.mesh.geometry.getAttribute(
                "position"
            ) as THREE.BufferAttribute;

        for (let i = 0; i < this.velocities.length; i++) {

            positions.setXYZ(

                i,

                positions.getX(i) + this.velocities[i].x,

                positions.getY(i) + this.velocities[i].y,

                positions.getZ(i) + this.velocities[i].z

            );

        }

        positions.needsUpdate = true;

        this.life -= 0.02;

        (
            this.mesh.material as THREE.PointsMaterial
        ).opacity = this.life;

        if (this.life <= 0) {

            this.alive = false;

        }

    }

    public dispose(): void {

        this.mesh.geometry.dispose();

        (
            this.mesh.material as THREE.Material
        ).dispose();

    }

}