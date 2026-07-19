import * as THREE from "three";

export class Player {

    public mesh: THREE.Group;

    private speed: number = 0.25;

    constructor() {

        this.mesh = new THREE.Group();

        this.createBody();
        this.createCockpit();
        this.createWings();
        this.createEngine();

        this.mesh.position.set(0, 0.5, 10);
    }

    private createBody(): void {

        const geometry = new THREE.BoxGeometry(
            1,
            0.5,
            3
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x3a7bff,
            metalness: 0.7,
            roughness: 0.3
        });

        const body = new THREE.Mesh(
            geometry,
            material
        );

        body.castShadow = true;

        this.mesh.add(body);
    }

    private createCockpit(): void {

        const points: THREE.Vector2[] = [];

        points.push(new THREE.Vector2(0.0, 0.0));
        points.push(new THREE.Vector2(0.18, 0.15));
        points.push(new THREE.Vector2(0.28, 0.45));
        points.push(new THREE.Vector2(0.20, 0.70));
        points.push(new THREE.Vector2(0.0, 0.90));

        const geometry = new THREE.LatheGeometry(
            points,
            32
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x66ccff,
            metalness: 0.8,
            roughness: 0.2
        });

        const cockpit = new THREE.Mesh(
            geometry,
            material
        );

        cockpit.rotation.x = Math.PI / 2;
        cockpit.scale.set(0.6, 0.6, 0.8);

        cockpit.position.set(
            0,
            0.3,
            -1.2
        );

        cockpit.castShadow = true;

        this.mesh.add(cockpit);
    }

    private createWings(): void {

        const shape = new THREE.Shape();

        shape.moveTo(0, 0);
        shape.lineTo(2, 0.4);
        shape.lineTo(2.6, 1.2);
        shape.lineTo(0.3, 0.8);
        shape.closePath();

        const geometry = new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.15,
                bevelEnabled: false
            }
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.5,
            roughness: 0.5
        });

        const leftWing = new THREE.Mesh(
            geometry,
            material
        );

        leftWing.rotation.x = Math.PI / 2;
        leftWing.rotation.z = Math.PI;

        leftWing.position.set(
            -0.4,
            -0.05,
            0.2
        );

        leftWing.castShadow = true;

        this.mesh.add(leftWing);

        const rightWing = leftWing.clone();

        rightWing.scale.x = -1;

        rightWing.position.x = 0.4;

        this.mesh.add(rightWing);
    }

    private createEngine(): void {

        const geometry = new THREE.CylinderGeometry(
            0.18,
            0.18,
            0.6,
            24
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x333333
        });

        const left = new THREE.Mesh(
            geometry,
            material
        );

        left.rotation.x = Math.PI / 2;
        left.position.set(
            -0.3,
            -0.1,
            1.6
        );

        left.castShadow = true;

        this.mesh.add(left);

        const right = left.clone();

        right.position.x = 0.3;

        this.mesh.add(right);
    }

    public move(
        left: boolean,
        right: boolean,
        up: boolean,
        down: boolean
    ): void {

        if (left) {
            this.mesh.position.x -= this.speed;
        }

        if (right) {
            this.mesh.position.x += this.speed;
        }

        if (up) {
            this.mesh.position.z -= this.speed;
        }

        if (down) {
            this.mesh.position.z += this.speed;
        }

        this.mesh.position.x = THREE.MathUtils.clamp(
            this.mesh.position.x,
            -12,
            12
        );

        this.mesh.position.z = THREE.MathUtils.clamp(
            this.mesh.position.z,
            -12,
            12
        );
    }

    public update(): void {

        this.mesh.rotation.z =
            -this.mesh.position.x * 0.03;
    }

}