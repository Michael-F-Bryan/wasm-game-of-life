import { Universe } from "game-of-life";

console.log(Universe);

const pre = document.getElementById("game-of-life-canvas");

const PLAYING = Symbol();
const PAUSED = Symbol();

class Player {
    constructor(width = 64, height = 64) {
        this.width = width;
        this.height = height;
        this.universe = Universe.new(width, height);
        this.playing = false;

        this.initialize_universe();
    }

    start() {
        this.playing = true;
    }

    pause() {
        this.playing = false;
    }

    toggleState() {
        this.playing = !this.playing;
    }

    initialize_universe() {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                const ix = x + y * this.height;
                const alive = ix % 2 == 0 || ix % 7 == 0;
                this.universe.set_cell(x, y, alive);
            }
        }
    }

    tick() {
        if (this.playing) {
            this.universe = this.universe.tick();
            return true;
        } else {
            return false;
        }
    }

    render(targetElement) {
        targetElement.textContent = this.universe.render();
    }
}

const player = new Player(128, 48);

const renderLoop = () => {
    const changed = player.tick();
    if (changed) {
        player.render(pre);
        console.log("Rendered");
    }

    requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);

document.onmousedown = _ => player.start();
document.onmouseup = _ => player.pause();
player.render(pre);