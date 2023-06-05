import { moveUp, moveDown, moveHorizontally } from './moves.js'

document.addEventListener("click", handleClick);

function handleClick(event) {
  console.log(event.target);
  if (!event.target.closest("[data-level]")) return;
  const activeAncestor = event.target.closest('[tabindex="0"]');
  if (!activeAncestor) return;
  if (
    activeAncestor.getAttribute("data-reverse") === "true" ||
    activeAncestor.querySelector('[data-reverse="true"]')
  ) {
    let newActiveNode = moveUp(activeAncestor);
    if (!newActiveNode)
      activeAncestor
        .querySelectorAll('[data-reverse="true"]')
        .forEach((node) => node.removeAttribute("data-reverse"));
    return;
  }
  let newActiveNode = moveDown(activeAncestor);
  if (!newActiveNode) activeAncestor.setAttribute("data-reverse", "true");
}

document.addEventListener("keydown", keyPadMove);

function keyPadMove(event) {
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
