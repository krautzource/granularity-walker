document.addEventListener("click", handleClick);

function addRect(node) {
  console.log("addRect:", node);
  if (node.tagName !== "g") return;
  const bbox = node.getBBox();
  node.insertAdjacentHTML(
    "afterbegin",
    `<rect x="${bbox.x}" y="${bbox.y}" width="${bbox.width}" height="${bbox.height}" data-rect="true" fill="transparent" stroke="blue"/>`
  );
}

function clearRect(node) {
  console.log("clearRect:", node);
  if (node.tagName !== "g") return;
  node.querySelectorAll("rect[data-rect]").forEach((node) => node.remove());
}

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

document.addEventListener("keydown", move);

function move(event) {
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

function moveDown(activeNode) {
  const activeNodeLevel = parseInt(activeNode.getAttribute("data-level"));
  const newLevel = activeNodeLevel + 1;
  const newActiveNode = activeNode.querySelector(`[data-level="${newLevel}"]`);
  if (!newActiveNode) return;
  activeNode.removeAttribute("tabindex");
  activeNode.removeAttribute("aria-label");
  activeNode.setAttribute("role", "none");
  clearRect(activeNode);
  activeNode
    .querySelectorAll(`[data-level="${newLevel}"]`)
    .forEach((currentLevelChild) => {
      currentLevelChild.setAttribute("tabindex", "0");
      currentLevelChild.removeAttribute("aria-hidden");
      currentLevelChild.setAttribute(
        "aria-label",
        currentLevelChild.getAttribute("data-label")
      );
      currentLevelChild.setAttribute("role", "img");
      addRect(currentLevelChild);
    });
  newActiveNode.focus();
  return newActiveNode;
}

function moveUp(activeNode) {
  const activeNodeLevel = parseInt(activeNode.getAttribute("data-level"));
  if (activeNodeLevel < 1) return;
  const newLevel = Math.max(activeNodeLevel - 1, 0);
  const ancestor = activeNode.closest(`[data-level="${newLevel}"]`);
  ancestor.setAttribute("tabindex", "0");
  ancestor.setAttribute("aria-label", ancestor.getAttribute("data-label"));
  ancestor.setAttribute("role", "img");
  addRect(ancestor);
  ancestor.querySelectorAll('[tabindex="0"]').forEach((descendant) => {
    descendant.removeAttribute("tabindex");
    descendant.setAttribute("aria-hidden", "true");
    descendant.removeAttribute("aria-label");
    descendant.setAttribute("role", "none");
    clearRect(descendant);
  });
  ancestor.focus();
  return ancestor;
}

function moveHorizontally(activeNode, isReversed) {
  const increment = isReversed ? -1 : 1;
  const currentNodes = [
    ...activeNode.closest('[data-level="0"]').querySelectorAll('[tabindex="0"]')
  ];
  currentNodes[currentNodes.indexOf(activeNode) + increment]?.focus();
}
