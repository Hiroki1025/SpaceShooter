import * as THREE from "three";

export class Stage {

    public group: THREE.Group;
    public walls: THREE.Mesh[] = [];

    constructor() {

        this.group = new THREE.Group();

        this.createGround();
        this.createStars();
        this.createWalls();

    }

    private createGround(): void {

        const geometry = new THREE.PlaneGeometry(
            120,
            220
        );

        const material =
            new THREE.MeshStandardMaterial({

                color: 0x222222

            });

        const ground =
            new THREE.Mesh(
                geometry,
                material
            );

        ground.rotation.x = -Math.PI / 2;

        ground.receiveShadow = true;

        this.group.add(ground);

    }

    private createStars(): void {

        const geometry =
            new THREE.BufferGeometry();

        const vertices: number[] = [];

        for (let i = 0; i < 1500; i++) {

            vertices.push(
                THREE.MathUtils.randFloatSpread(250),
                THREE.MathUtils.randFloat(30, 120),
                THREE.MathUtils.randFloatSpread(250)
            );

        }

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
                vertices,
                3
            )
        );

        const material =
            new THREE.PointsMaterial({

                color: 0xffffff,
                size: 0.5

            });

        const stars =
            new THREE.Points(
                geometry,
                material
            );

        this.group.add(stars);

    }

    private createWalls(): void {

        const shape = new THREE.Shape();

        shape.moveTo(-1, -1);
        shape.lineTo(1, -1);
        shape.lineTo(1, 1);
        shape.lineTo(-1, 1);
        shape.lineTo(-1, -1);

        const geometry =
            new THREE.ExtrudeGeometry(
                shape,
                {
                    depth: 2,
                    bevelEnabled: true,
                    bevelSize: 0.15,
                    bevelThickness: 0.15,
                    bevelSegments: 2
                }
            );

        const material =
            new THREE.MeshStandardMaterial({

                color: 0x666666,
                metalness: 0.6,
                roughness: 0.5

            });

        const positions = [

            [-10, -20],
            [-5, -35],
            [8, -28],
            [12, -45],

            [-15, -60],
            [-3, -72],
            [10, -85],

            [-12, -100],
            [0, -108],
            [14, -118],

            [-8, -135],
            [6, -145]

        ];

        for (const pos of positions) {

            const wall =
                new THREE.Mesh(
                    geometry,
                    material
                );

            wall.position.set(
                pos[0],
                0,
                pos[1]
            );

            wall.rotation.x = -Math.PI / 2;

            wall.castShadow = true;
            wall.receiveShadow = true;

            this.group.add(wall);

            this.walls.push(wall);

        }

    }

}