export class HUD {

    private score: number = 0;
    private hp: number = 30;

    private scoreText: HTMLDivElement;
    private hpText: HTMLDivElement;
    private message: HTMLDivElement;

    constructor() {

        this.scoreText = document.createElement("div");
        this.hpText = document.createElement("div");
        this.message = document.createElement("div");

        this.initialize();
    }

    private initialize(): void {

        document.body.appendChild(this.scoreText);
        document.body.appendChild(this.hpText);
        document.body.appendChild(this.message);

        this.scoreText.style.position = "absolute";
        this.scoreText.style.left = "20px";
        this.scoreText.style.top = "20px";
        this.scoreText.style.color = "white";
        this.scoreText.style.fontSize = "24px";
        this.scoreText.style.fontFamily = "Arial";

        this.hpText.style.position = "absolute";
        this.hpText.style.left = "20px";
        this.hpText.style.top = "55px";
        this.hpText.style.color = "white";
        this.hpText.style.fontSize = "24px";
        this.hpText.style.fontFamily = "Arial";

        this.message.style.position = "absolute";
        this.message.style.left = "50%";
        this.message.style.top = "50%";
        this.message.style.transform = "translate(-50%, -50%)";
        this.message.style.color = "red";
        this.message.style.fontSize = "48px";
        this.message.style.fontWeight = "bold";
        this.message.style.fontFamily = "Arial";
        this.message.style.display = "none";

        this.update();
    }

    public addScore(value: number): void {

        this.score += value;
        this.update();
    }

    public damage(value: number = 1): void {

        this.hp -= value;

        if (this.hp < 0) {
            this.hp = 0;
        }

        this.update();
    }

    public heal(value: number = 1): void {

        this.hp += value;
        this.update();
    }

    public getHP(): number {

        return this.hp;
    }

    public getScore(): number {

        return this.score;
    }

    public update(): void {

        this.scoreText.innerHTML =
            "SCORE : " + this.score;

        this.hpText.innerHTML =
            "HP : " + this.hp;
    }

    public showMessage(text: string): void {

        this.message.innerHTML = text;
        this.message.style.display = "block";
    }

    public hideMessage(): void {

        this.message.style.display = "none";
    }

    public gameOver(): void {

        this.showMessage("GAME OVER");
    }

    public clear(): void {

        this.showMessage("CLEAR!");
    }

}