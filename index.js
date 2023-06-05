import { handleClick } from './onClick.js'
import { keyPadMove } from './onKeyUp.js'

document.addEventListener("click", handleClick);

document.addEventListener("keydown", keyPadMove);

