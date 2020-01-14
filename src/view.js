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

        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.w * 2 / 3;
        this.playfieldHeight = this.h;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockW = this.playfieldInnerWidth / columns;
        this.blockH = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.w / 3;
        this.panelHeight = this.h;

        this.el.appendChild(this.canvas);
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayField(state);
        this.renderPanel(state)
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.w, this.h);
    }

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.w /2, this.h /2);
    }

    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0,0,0,.75)';
        this.context.fillRect(0, 0, this.w, this.h);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Resume', this.w /2, this.h /2);
    }

    renderGameOverScreen({ score }) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.w /2, this.h /2 - 48);
        this.context.fillText(`Score: ${score}`, this.w /2, this.h /2);
        this.context.fillText('Press ENTER to Restart', this.w /2, this.h /2 + 48);
    }

    renderPlayField({ playfield }) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(
                        this.playfieldX + (x * this.blockW),
                        this.playfieldY + (y * this.blockH),
                        this.blockW,
                        this.blockH,
                        View.colors[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 48);
        this.context.fillText(`Next`, this.panelX, this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockW * 0.5),
                        this.panelY + 100 + (y * this.blockH * 0.5),
                        this.blockW * 0.5,
                        this.blockH * 0.5,
                        View.colors[block]
                    );
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