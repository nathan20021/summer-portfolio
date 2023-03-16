import Image from "next/image";
import * as React from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { flattenDeep } from "lodash";
import { BlockMath, InlineMath } from "react-katex";

type DeepArray<T> = T | Array<DeepArray<T>>;

type dataProps = {
  props: {
    children: dataProps[];
  };
};

type preProcessProps = string | dataProps;

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
    className?: string;
    children?: Array<string>;
    node?: object;
  }) => {
    if (element.className === "math math-inline") {
      return <InlineMath>{element.children[0]}</InlineMath>;
    }
    return <span className={element.className}>{element.children}</span>;
  },

  a: (element: {
    className?: string;
    children?: Array<string>;
    href?: string;
    node?: object;
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
    type?: string;
    checked?: boolean;
    disabled?: boolean;
    node?: object;
  }) => {
    if (element.type === "checkbox") {
      console.log(element);

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

  pre: (element: { children?: any; node?: any }) => {
    const [copied, setCopied] = useState(false);
    return (
      <div className="relative my-3 cursor-text">
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
              text-md bg-[#484e5b] hover:bg-[#5f6676] p-2
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

  div: (element: {
    className?: string;
    children?: Array<string>;
    node?: object;
  }) => {
    if (element.className === "math math-display") {
      return <BlockMath>{element.children[0]}</BlockMath>;
    }
    return <div>{element.children}</div>;
  },
};

export default MarkdownComponents;
