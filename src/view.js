export default class View {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };

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

    render({ playfield, score, level }) {
        this.clearScreen();
        this.renderPlayField(playfield);
        // this.renderScore(score, level);
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
                    this.renderBlock(x * this.blockW, y * this.blockH, this.blockW, this.blockH, View.colors[block])
                }
            }
        }
    }

    // renderScore(score, level) {
    //     this.context.font = "30px Arial";
    //     this.context.fillStyle = "white";
    //     this.context.fillText("Hello World", 0, 0);
    // }

    renderBlock(x, y, w, h, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = "black";
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, w, h);
        this.context.strokeRect(x, y, w, h);
    }
}