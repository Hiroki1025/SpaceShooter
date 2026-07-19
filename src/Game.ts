import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Collision } from "./Collision";

import { Player } from "./Player";
import { Stage } from "./Stage";
import { Input } from "./Input";
import { HUD } from "./HUD";
import { GameManager } from "./GameManager";

export class Game {

    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    //

    private stage: Stage;
    private player: Player;
    private input: Input;
    private hud: HUD;
    private gameManager: GameManager;

    constructor() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            500
        );

       this.camera.position.set(
    0,
    12,
    24
);

this.camera.lookAt(
    0,
    0,
    -40
);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.shadowMap.enabled = true;

        document.body.appendChild(
            this.renderer.domElement
        );

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.target.set(0, 0, -20);

    
        this.createLights();

        this.stage = new Stage();
        this.scene.add(this.stage.group);

        this.player = new Player();
        this.scene.add(this.player.mesh);

        this.input = new Input();

        this.hud = new HUD();

        this.gameManager = new GameManager(
    this.scene,
    this.stage,
    this.player,
    this.hud
);

        window.addEventListener(
            "resize",
            this.onResize
        );

        this.animate();
    }

    private createLights(): void {

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                0.4
            );

        this.scene.add(ambient);

        const directional =
            new THREE.DirectionalLight(
                0xffffff,
                1.2
            );

        directional.position.set(
            20,
            30,
            20
        );

        directional.castShadow = true;

        directional.shadow.mapSize.width = 2048;
        directional.shadow.mapSize.height = 2048;

        directional.shadow.camera.left = -60;
        directional.shadow.camera.right = 60;
        directional.shadow.camera.top = 60;
        directional.shadow.camera.bottom = -60;

        this.scene.add(directional);
    }
        private animate = (): void => {

        requestAnimationFrame(
            this.animate
        );


        this.input.update();

        this.player.move(
    this.input.left,
    this.input.right,
    this.input.up,
    this.input.down
);

Collision.playerVsWalls(
    this.player,
    this.stage.walls
);

this.player.update();

        if (this.input.shoot) {

            this.gameManager.shoot();
        }

        this.gameManager.update();

        this.camera.position.x +=
            (
                this.player.mesh.position.x
                - this.camera.position.x
            ) * 0.08;

        this.camera.position.z +=
            (
                this.player.mesh.position.z + 28
                - this.camera.position.z
            ) * 0.08;

        this.controls.target.set(
            this.player.mesh.position.x,
            this.player.mesh.position.y,
            this.player.mesh.position.z - 15
        );

        this.controls.update();

        this.renderer.render(
            this.scene,
            this.camera
        );
    };

    private onResize = (): void => {

        this.camera.aspect =
            window.innerWidth /
            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    };

    public dispose(): void {

        window.removeEventListener(
            "resize",
            this.onResize
        );

        this.input.dispose();

        this.renderer.dispose();
    }

}