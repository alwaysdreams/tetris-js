export default class View {
    constructor(el, w, h, rows, columns) {
        this.el = el;
        this.w = w;
        this.h = h;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.context = this.canvas.getContext("2d");

        this.blockW = this.w / columns;
        this.blockH = this.h / rows;

        this.el.appendChild(this.canvas);
    }

    render({ playfield }) {
        this.clearScreen();
        this.renderPlayField(playfield);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.w, this.h);
    }

    renderPlayField(playfield) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(x * this.blockW, y * this.blockH, this.blockW, this.blockH, "red")
                }
            }
        }
    }

    renderBlock(x, y, w, h, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = "black";
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, w, h);
        this.context.strokeRect(x, y, w, h);
    }
}