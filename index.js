import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector("#root");

const game = new Game();
const view = new View(root, 320, 640, 20, 10);
view.render(game.getState());

// window.game = game;
// window.view = view;

document.addEventListener("keydown", event => {
    switch (event.keyCode) {
        case 37: // LEFT ARROW
            game.movePieceLeft();
            break;
        case 38: // UP ARROW
            game.rotatePiece();
            break;
        case 39: // RIGHT ARROW
            game.movePieceRight();
            break;
        case 40: // DOWN ARROW
            game.movePieceDown();
            break;

    }
    view.render(game.getState());
});
