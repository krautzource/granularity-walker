function addRect(node) {
    if (node.tagName !== "g") return;
    const bbox = node.getBBox();
    node.insertAdjacentHTML(
        "afterbegin",
        `<rect x="${bbox.x}" y="${bbox.y}" width="${bbox.width}" height="${bbox.height}" data-rect="true" fill="transparent" stroke="none"/>`
    );
}

function clearRect(node) {
    if (node.tagName !== "g") return;
    node.querySelectorAll("rect[data-rect]").forEach((node) => node.remove());
}

function disableElement(needsAriaHidden, node) {
    node.removeAttribute("tabindex");
    node.removeAttribute("aria-label");
    node.setAttribute("role", "none");
    clearRect(node);
    if (needsAriaHidden) node.setAttribute('aria-hidden', 'true');
}

function enableElement(node) {
    node.setAttribute("tabindex", "0");
    node.removeAttribute("aria-hidden");
    node.setAttribute("aria-label", node.getAttribute("data-label"));
    node.setAttribute("role", "img");
    addRect(node);
}

export function moveDown(activeNode) {
    const activeNodeLevel = parseInt(activeNode.getAttribute("data-level"));
    const newLevel = activeNodeLevel + 1;
    const newActiveNode = activeNode.querySelector(`[data-level="${newLevel}"]`);
    if (!newActiveNode) return;
    disableElement(false, activeNode);
    activeNode.querySelectorAll(`[data-level="${newLevel}"]`).forEach(enableElement);
    newActiveNode.focus();
    return newActiveNode;
}

export function moveUp(activeNode) {
    const activeNodeLevel = parseInt(activeNode.getAttribute("data-level"));
    if (activeNodeLevel < 1) return;
    const newLevel = Math.max(activeNodeLevel - 1, 0);
    const ancestor = activeNode.closest(`[data-level="${newLevel}"]`);
    enableElement(ancestor);
    ancestor.querySelectorAll('[tabindex="0"]').forEach(disableElement.bind(null, true));
    ancestor.focus();
    return ancestor;
}

export function moveHorizontally(activeNode, isReversed) {
    const increment = isReversed ? -1 : 1;
    const currentNodes = [
        ...activeNode.closest('[data-level="0"]').querySelectorAll('[tabindex="0"]')
    ];
    currentNodes[currentNodes.indexOf(activeNode) + increment]?.focus();
}
