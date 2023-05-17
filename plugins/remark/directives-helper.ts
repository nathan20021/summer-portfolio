import { visit } from "unist-util-visit";
import { h } from "hastscript";
import { Node } from "unist";

interface divTreeNode extends Node {
  name: string;
  attributes: {
    [key: string]: string;
  };
}

/**
 *
 * @return {void}
 */
export function remarkDirectivesHelper() {
  return (tree: divTreeNode) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);
        // @ts-ignore
        data.hName = hast.tagName;
        // @ts-ignore
        data.hProperties = hast.properties;
      }
    });
  };
}
