export function deepCloneNode(node: HTMLElement): HTMLElement {
    const clone = node.cloneNode(true) as HTMLElement;
    const descendantsWithId = clone.querySelectorAll('[id]');
    const nodeName = node.nodeName.toLowerCase();

    // Remove the `id` to avoid having multiple elements with the same id on the page.
    clone.removeAttribute('id');

    descendantsWithId.forEach((descendant) => {
        descendant.removeAttribute('id');
    });

    if (nodeName === 'canvas') {
        transferCanvasData(node as HTMLCanvasElement, clone as HTMLCanvasElement);
    } else if (
        nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'textarea'
    ) {
        transferInputData(node as HTMLInputElement, clone as HTMLInputElement);
    }

    transferData('canvas', node, clone, transferCanvasData);
    transferData('input, textarea, select', node, clone, transferInputData);
    return clone;
}

function transferData<T extends Element>(selector: string, node: HTMLElement, clone: HTMLElement, callback: (source: T, clone: T) => void) {
    const descendantElements = node.querySelectorAll<T>(selector)

    if (descendantElements.length) {
        const cloneElements = clone.querySelectorAll<T>(selector)

        for (let i = 0; i < descendantElements.length; i++) {
            callback(descendantElements[i], cloneElements[i])
        }
    }
}

let cloneUniqueId = 0

function transferInputData(source: Element & { value: string }, clone: Element & { value: string; name: string; type: string }) {
    // Browsers throw an error when assigning the value of a file input programmatically.
    if (clone.type !== 'file') {
        clone.value = source.value
    }

    if (clone.type === 'radio' && clone.name) {
        clone.name = `mat-clone-${clone.name}-${cloneUniqueId++}`;
    }
}

function transferCanvasData(source: HTMLCanvasElement, clone: HTMLCanvasElement) {
    const context = clone.getContext('2d')

    if (context) {
        try {
            context.drawImage(source, 0, 0)
        } catch {}
    }
}

export const IS_TOUCH_DEVICE: boolean = (() => {
    if (typeof window === 'undefined') {
        return false
    } else {
        return ('ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints > 0)
    }
})()