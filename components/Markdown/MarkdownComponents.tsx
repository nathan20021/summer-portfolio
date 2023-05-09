import * as React from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import { flattenDeep } from "lodash";
import { BlockMath, InlineMath } from "react-katex";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

type DeepArray<T> = T | Array<DeepArray<T>>;

type dataProps = {
  props: {
    children: dataProps[];
  };
};

type preProcessProps = string | dataProps;

type CallOutProps = {
  icon?: string | null;
  title?: string | null;
  className: string;
  children: Array<string>;
  node: object;
};

// eslint-disable-next-line require-jsdoc
export function myRemarkPlugin() {
  return (tree: any) => {
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

const preProcess = (data: preProcessProps[]) => {
  const result: DeepArray<String> = [];
  data.forEach((item) => {
    if (typeof item === "object") {
      result.push(preProcess(item.props.children));
    } else {
      result.push(item);
    }
  });
  return result;
};

const calloutCommonStyles = "mx-2 my-4";
const MarkdownComponents: object = {
  p: (paragraph: { children?: any; node?: any }) => {
    const { node } = paragraph;

    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
      const metaWidth = metastring.match(/{([^}]+)x/);
      const metaHeight = metastring.match(/x([^}]+)}/);
      const width = metaWidth ? metaWidth[1] : "700";
      const height = metaHeight ? metaHeight[1] : "432";
      const isPriority = metastring?.toLowerCase().match("{priority}");
      const hasCaption = metastring?.toLowerCase().includes("{caption:");
      const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

      return (
        <div className="mt-4 flex justify-center">
          <Image
            src={image.properties.src}
            width={width}
            height={height}
            className="postImg"
            alt={alt}
            priority={isPriority}
            layout="intrinsic"
          />
          {hasCaption ? (
            <div className="caption" aria-label={caption}>
              {caption}
            </div>
          ) : null}
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },

  span: (element: {
    className: string;
    children: Array<string>;
    node: object;
  }) => {
    if (element.className === "math math-inline") {
      return <InlineMath>{element.children[0]}</InlineMath>;
    }
    return <span className={element?.className}>{element.children}</span>;
  },

  a: (element: {
    className: string;
    children: Array<string>;
    href: string;
    node: object;
  }) => {
    return (
      <a
        className="cursor-pointer"
        href={element.href}
        target="_blank"
        rel="noreferrer"
      >
        {element.children[0]}
      </a>
    );
  },

  input: (element: {
    type: string;
    checked: boolean;
    disabled: boolean;
    node: object;
  }) => {
    if (element.type === "checkbox") {
      return (
        <input
          readOnly
          checked={element.checked ? true : false}
          className="w-4 h-4 text-blue-600 bg-grey-100 border-grey-300 rounded dark:ring-offset-grey-800 dark:bg-grey-700 dark:border-grey-600"
          type="checkbox"
        />
      );
    }
    return <input type={element.type} />;
  },

  ul: (element: { className: string; children: any; node: any }) => {
    if (element.className === "contains-task-list") {
      return (
        <ul className={`list-none placeholder:${element.className}`}>
          {element.children}
        </ul>
      );
    }
    return (
      <ul className={`list-disc ${element.className}`}>{element.children}</ul>
    );
  },

  pre: (element: { children: any; node: any }) => {
    const [copied, setCopied] = useState(false);
    return (
      <div className="group relative my-3 cursor-text">
        <div className="absolute right-5 top-5">
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
              navigator.clipboard.writeText(
                flattenDeep(
                  preProcess(element.children[0].props.children)
                ).join("")
              );
            }}
            className="
              text-md bg-[#484e5b] hover:bg-[#5f6676] p-2 group-hover:visible invisible
              rounded-md flex justify-start items-center gap-1 text-2xl"
          >
            {copied ? (
              <>
                <BsCheck />
                <span className="text-sm padding-0">Copied</span>
              </>
            ) : (
              <>
                <MdOutlineContentCopy />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="rounded-md code-block">{element.children}</pre>
      </div>
    );
  },
  code: (element: {
    className: string;
    children: Array<string>;
    node: object;
  }) => {
    return <code className={`${element.className}`}>{element.children}</code>;
  },

  div: (element: {
    className: string;
    children: Array<string>;
    node: object;
  }) => {
    if (element.className === "math math-display") {
      return <BlockMath>{element.children[0]}</BlockMath>;
    }
    return <div>{element.children}</div>;
  },

  call: ({
    node,
    className,
    children,
    title = "Callout",
    icon = "📢",
  }: CallOutProps) => {
    return (
      <div
        className={`${calloutCommonStyles} call border-l-[#d9d9d9] bg-[#d9d9d933] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#ffffff]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },

  success: ({
    node,
    className,
    children,
    title = "Success",
    icon = "🎉",
  }: CallOutProps) => {
    return (
      <div
        className={`${calloutCommonStyles} success border-l-[#90f693] bg-[#90f69333] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#e5ffb9]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },

  notes: ({
    node,
    className,
    children,
    title = "Notes",
    icon = "📝",
  }: CallOutProps) => {
    return (
      <div
        className={`${calloutCommonStyles} notes border-l-[#8d81ff] bg-[#8d81ff33] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#cdcfff]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },

  warn: ({
    node,
    className,
    children,
    title = "Warning",
    icon = "⚠️",
  }: CallOutProps) => {
    return (
      <div
        className={`${calloutCommonStyles} warn border-l-[#ffe45d] bg-[#ffe45d33] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#f5cb90]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },

  fail: ({
    node,
    className,
    children,
    title = "Failure",
    icon = "❌",
  }: CallOutProps) => {
    return (
      <div
        className={`${calloutCommonStyles} fail border-l-[#ff7758] bg-[#ff775833] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#ffacac]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },

  info: ({
    node,
    className,
    children,
    title = "Info",
    icon = "ℹ️",
  }: CallOutProps) => {
    return (
      <div
        className={`${calloutCommonStyles} info border-l-[#5d74f9] bg-[#5d74f933] ${className} border-l-[5px]`}
      >
        <div className="flex w-full">
          <h1 className="text-white text-xl">{icon}</h1>
          <h1 className="text-xl text-[#addaff]">{title}</h1>
        </div>
        <div className="indent-5">{children}</div>
      </div>
    );
  },
};
export default MarkdownComponents;
