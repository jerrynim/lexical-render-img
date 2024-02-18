import { DOMConversionMap, ElementNode } from "lexical";

export class ImageNode extends ElementNode {
    private __src: any;
    constructor(src: string, key?: `${number}`) {
        super(key);
        this.__src = src;
    }
    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__key as `${number}`);
    }
    createDOM(): HTMLElement {
        // Define the DOM element here
        const dom = document.createElement("img");
        dom.src = this.__src;
        return dom;
    }

    static importDOM(): DOMConversionMap<HTMLImageElement> | null {
        return {
            img: () => ({
                conversion: (element: HTMLImageElement) => {
                    const src = element?.getAttribute("src");
                    if (!src) {
                        return { node: null };
                    }
                    const node = $createImageNode(src);
                    return { node };
                },
                priority: 3,
            }),
        };
    }

    exportDOM() {
        const img = document.createElement("img");
        img.src = this.__src;

        return { element: img };
    }
    updateDOM(prevNode: ImageNode, dom: HTMLElement): boolean {
        // Returning false tells Lexical that this node does not need its
        // DOM element replacing with a new copy from createDOM.
        return false;
    }
}
export const $createImageNode = (url: string) => new ImageNode(url);
