import { Universe, Cell } from "game-of-life";
import { memory } from "game-of-life/game_of_life_bg";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

class Player {
    constructor(width = 64, height = 64) {
        this.width = width;
        this.height = height;
        this.universe = Universe.new(width, height);
        this.playing = false;
        this.tick_count = 0;

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

    render(ctx) {
        this.drawGrid(ctx);
        this.drawCells(ctx);
    }

    drawGrid(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = GRID_COLOR;

        // Vertical lines.
        for (let i = 0; i <= this.width; i++) {
            ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
            ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * this.height + 1);
        }

        // Horizontal lines.
        for (let j = 0; j <= this.height; j++) {
            ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
            ctx.lineTo((CELL_SIZE + 1) * this.width + 1, j * (CELL_SIZE + 1) + 1);
        }

        ctx.stroke();
    }

    drawCells(ctx) {
        const cellsPtr = this.universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, this.width * this.height);

        ctx.beginPath();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const ix = this.universe.index_of(x, y);

                ctx.fillStyle = cells[ix] === Cell.Dead
                    ? DEAD_COLOR
                    : ALIVE_COLOR;

                ctx.fillRect(
                    x * (CELL_SIZE + 1) + 1,
                    y * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }

        ctx.stroke();
    }
}

const player = new Player(128, 48);
const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * player.height + 1;
canvas.width = (CELL_SIZE + 1) * player.width + 1;

const ctx = canvas.getContext("2d");

const renderLoop = () => {
    const changed = player.tick();
    if (changed) {
        player.render(ctx);
        console.log("Rendered");
    }

    requestAnimationFrame(renderLoop);
};


document.onmousedown = _ => player.start();
document.onmouseup = _ => player.pause();

player.render(ctx);
requestAnimationFrame(renderLoop);