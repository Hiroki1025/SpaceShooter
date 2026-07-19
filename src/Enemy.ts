import * as THREE from "three";

export class Enemy {

    public mesh: THREE.Group;
    public hp = 3;
    public speed = 0.08;

    private body: THREE.Mesh;
    private time = Math.random() * Math.PI * 2;

    constructor(x: number, z: number) {

        this.mesh = new THREE.Group();

        // ===== 胴体（LatheGeometry） =====
        const points: THREE.Vector2[] = [
            new THREE.Vector2(0.0, 0.0),
            new THREE.Vector2(0.35, 0.1),
            new THREE.Vector2(0.75, 0.35),
            new THREE.Vector2(0.95, 0.8),
            new THREE.Vector2(0.9, 1.2),
            new THREE.Vector2(0.7, 1.45),
            new THREE.Vector2(0.45, 1.6),
            new THREE.Vector2(0.2, 1.72),
            new THREE.Vector2(0.0, 1.8)
        ];

        const bodyGeometry = new THREE.LatheGeometry(points, 40);

        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x55ff88,
            roughness: 0.4,
            metalness: 0.1
        });

        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.body.castShadow = true;
        this.body.receiveShadow = true;

        this.mesh.add(this.body);

        // ===== 左目 =====
        const eyeGeometry = new THREE.SphereGeometry(0.13, 16, 16);

        const whiteMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff
        });

        const leftEye = new THREE.Mesh(
            eyeGeometry,
            whiteMaterial
        );

        leftEye.position.set(0.32, 1.25, 0.72);

        // ===== 右目 =====
        const rightEye = leftEye.clone();
        rightEye.position.x = -0.32;

        this.mesh.add(leftEye);
        this.mesh.add(rightEye);

        // ===== 瞳 =====
        const pupilGeometry = new THREE.SphereGeometry(0.05, 12, 12);

        const pupilMaterial = new THREE.MeshStandardMaterial({
            color: 0x000000
        });

        const leftPupil = new THREE.Mesh(
            pupilGeometry,
            pupilMaterial
        );

        leftPupil.position.set(0.32, 1.25, 0.84);

        const rightPupil = leftPupil.clone();
        rightPupil.position.x = -0.32;

        this.mesh.add(leftPupil);
        this.mesh.add(rightPupil);

        // ===== 口 =====
        const mouth = new THREE.Mesh(

            new THREE.TorusGeometry(
                0.18,
                0.03,
                12,
                40,
                Math.PI
            ),

            new THREE.MeshStandardMaterial({
                color: 0xff6699
            })

        );

        mouth.rotation.x = Math.PI;

        mouth.position.set(
            0,
            0.82,
            0.86
        );

        this.mesh.add(mouth);

        // ===== ほっぺ =====
        const cheekMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xffaacc
            });

        const cheekGeometry =
            new THREE.SphereGeometry(0.08);

        const leftCheek =
            new THREE.Mesh(
                cheekGeometry,
                cheekMaterial
            );

        leftCheek.position.set(
            0.55,
            0.95,
            0.76
        );

        const rightCheek =
            leftCheek.clone();

        rightCheek.position.x = -0.55;

        this.mesh.add(leftCheek);
        this.mesh.add(rightCheek);

        this.mesh.position.set(
            x,
            0,
            z
        );
    }

    public update(playerPosition: THREE.Vector3): void {

        this.time += 0.04;

        // ぷるぷる
        const scale =
            1.0 +
            Math.sin(this.time * 3.0) * 0.04;

        this.body.scale.set(
            scale,
            1.0 / scale,
            scale
        );

        // ふわふわ
        this.mesh.position.y =
            0.25 +
            Math.sin(this.time) * 0.2;

        const direction =
            new THREE.Vector3()
                .subVectors(
                    playerPosition,
                    this.mesh.position
                );

        direction.y = 0;

        if (direction.length() > 0.2) {

            direction.normalize();

            this.mesh.position.addScaledVector(
                direction,
                this.speed
            );
        }

        this.mesh.lookAt(
            playerPosition.x,
            this.mesh.position.y,
            playerPosition.z
        );
    }

    public damage(value: number): boolean {

        this.hp -= value;

        return this.hp <= 0;
    }

    public destroy(scene: THREE.Scene): void {

        scene.remove(this.mesh);

        this.mesh.traverse((obj) => {

            if (obj instanceof THREE.Mesh) {

                obj.geometry.dispose();

                if (Array.isArray(obj.material)) {

                    obj.material.forEach(m => m.dispose());

                } else {

                    obj.material.dispose();

                }

            }

        });

    }

}