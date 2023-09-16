import { visit } from "unist-util-visit";
import { Node, Parent } from "unist";
import { findAfter } from "unist-util-find-after";

interface TOCItem {
  depth: number;
  text: string;
  id: string;
  children: TOCItem[];
}

interface HeadingNode extends Node {
  depth: number;
  children: Node[];
}

export type tocOptions = {
  slugify: (text: string) => string;
  headingTitle: string;
};

/**
 * @param {tocOptions} options
 * @return {void}
 */
export function remarkCustomTOC(options: tocOptions) {
  return (tree: Parent) => {
    const toc: TOCItem[] = [
      {
        depth: 1,
        text: "",
        id: "",
        children: [],
      },
    ];
    let currentDepth = 2;
    let parentItem = toc[0];

    const createTocItem = (
      depth: number,
      text: string,
      id: string
    ): TOCItem => {
      return {
        depth,
        text,
        id,
        children: [],
      };
    };

    const addToToc = (depth: number, text: string, id: string) => {
      const item: TOCItem = createTocItem(depth, text, id);
      if (text === options.headingTitle) return;
      if (depth === 1) return;

      if (depth === currentDepth) {
        // Add the item as a child of the last item at the same depth
        parentItem.children.push(item);
      } else if (depth > currentDepth) {
        // Increase the depth, add the item as a child of the last item at the previous depth
        currentDepth = depth;
        parentItem = parentItem.children[parentItem.children.length - 1];
        parentItem.children.push(item);
      } else {
        currentDepth = depth;
        // Search for the parent item at depth - 1
        const parentDepth = depth - 1;
        let tempParentItem = toc[0];
        let currentTempDepth = 1;
        while (currentTempDepth < parentDepth) {
          tempParentItem =
            tempParentItem.children[tempParentItem.children.length - 1];
          currentTempDepth++;
        }
        parentItem = tempParentItem;
        parentItem.children.push(item);
      }
    };

    visit(tree, "heading", (node: HeadingNode) => {
      const { depth } = node;
      // @ts-ignore
      const text = node.children[0] ? node.children[0].value : "";
      if (text === "Table of contents") {
        console.log(findAfter(tree, 5, node));
      }
      const id = options.slugify(text);
      addToToc(depth, text, id);
    });
    const tocMarkup = generateTocMarkup(toc);
    const tocNode = {
      type: "html",
      value: tocMarkup,
    };
    (tree.children as Node[]).unshift(tocNode);
  };
}
/**
 * @param {TOCItem[]} toc
 * @return {JSX.Element}
 *
 * */
function generateTocMarkup(toc: TOCItem[]): string {
  const secondLevelTOC = toc[0].children;
  const generateItemMarkup = (item: TOCItem): string => {
    const listItem = `
      <li class="toc-li">
        <a class="toc-a" href="#${item.id}">${item.text}</a>
      </li>`;
    if (item.children.length > 0) {
      const childrenList = `
        <ul class="toc-ul">
        ${item.children.map(generateItemMarkup).join("")}
        </ul>
      `;
      return `${listItem}${childrenList}`;
    }
    return listItem;
  };

  return `
    <div class="toc-div">
      <ul class="toc-ul">
        ${secondLevelTOC.map(generateItemMarkup).join("")}
      </ul>
    </div>`;
}
