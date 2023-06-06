import { moveUp, moveDown } from './moves.js'


export function handleClick(event) {
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
