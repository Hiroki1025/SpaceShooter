export class Input {

    public left: boolean = false;
    public right: boolean = false;
    public up: boolean = false;
    public down: boolean = false;

    public shoot: boolean = false;

    constructor() {

        window.addEventListener(
            "keydown",
            this.onKeyDown
        );

        window.addEventListener(
            "keyup",
            this.onKeyUp
        );
    }

    private onKeyDown = (
        event: KeyboardEvent
    ): void => {

        switch (event.code) {

            case "ArrowLeft":
            case "KeyA":
                this.left = true;
                break;

            case "ArrowRight":
            case "KeyD":
                this.right = true;
                break;

            case "ArrowUp":
            case "KeyW":
                this.up = true;
                break;

            case "ArrowDown":
            case "KeyS":
                this.down = true;
                break;

            case "Space":
                this.shoot = true;
                break;
        }
    };

    private onKeyUp = (
        event: KeyboardEvent
    ): void => {

        switch (event.code) {

            case "ArrowLeft":
            case "KeyA":
                this.left = false;
                break;

            case "ArrowRight":
            case "KeyD":
                this.right = false;
                break;

            case "ArrowUp":
            case "KeyW":
                this.up = false;
                break;

            case "ArrowDown":
            case "KeyS":
                this.down = false;
                break;

            case "Space":
                this.shoot = false;
                break;
        }
    };

    public update(): void {

    }

    public dispose(): void {

        window.removeEventListener(
            "keydown",
            this.onKeyDown
        );

        window.removeEventListener(
            "keyup",
            this.onKeyUp
        );
    }

}