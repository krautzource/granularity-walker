import { moveUp, moveDown, moveHorizontally } from './moves.js'

export function keyPadMove(event) {
    if (![37, 38, 39, 40].includes(event.keyCode)) return;
    if (
        event.target !== document.activeElement ||
        !event.target.hasAttribute("data-level")
    )
        return;
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            moveHorizontally(event.target, true);
            break;
        case 38: //up
            moveUp(event.target);
            break;
        case 39: //right
            moveHorizontally(event.target, false);
            break;
        case 40: //down
            moveDown(event.target);
            break;
        default:
            break;
    }
}
