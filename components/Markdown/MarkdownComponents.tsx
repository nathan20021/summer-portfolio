import * as React from "react";
import { useState } from "react";

import { MdOutlineContentCopy } from "react-icons/md";
import { BsCaretDownFill, BsCheck } from "react-icons/bs";

import { BlockMath, InlineMath } from "react-katex";

import Image from "next/image";

import { flattenDeep } from "lodash";
import { slugifyHeading } from "../../utils/functions";
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

type headingProps = {
  level: number;
  children: Array<string>;
  node: object;
};

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
  h2: (element: headingProps) => {
    return (
      <h2
        id={
          Array.isArray(element.children) &&
          typeof element.children[0] === "string"
            ? slugifyHeading(element.children[0])
            : ""
        }
      >
        {element.children}
      </h2>
    );
  },

  h3: (element: headingProps) => {
    return <h3 id={slugifyHeading(element.children[0])}>{element.children}</h3>;
  },

  h4: (element: headingProps) => {
    return <h4 id={slugifyHeading(element.children[0])}>{element.children}</h4>;
  },

  h5: (element: headingProps) => {
    return <h5 id={slugifyHeading(element.children[0])}>{element.children}</h5>;
  },

  h6: (element: headingProps) => {
    return <h6 id={slugifyHeading(element.children[0])}>{element.children}</h6>;
  },

  p: (paragraph: { children?: any; node?: any; className?: string }) => {
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
    return <p className={paragraph.className}>{paragraph.children}</p>;
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
    if (element.className === "toc-a") {
      // generate a regex that removes all "%" and capital letters
      return (
        <a className="cursor-pointer toc-a" href={element.href}>
          {element.children}
        </a>
      );
    }
    const invertable: string[] = ["github.com", "okta.com"];
    const url = element.href.startsWith("/")
      ? new URL(`https://nathanluong.me/${element.href}`)
      : new URL(element.href);
    return (
      <a
        className="cursor-pointer inline max-h-[23px] break-words align-middle
                 bg-[#272727] rounded-sm shadow-lg shadow-[#1b1b1b]"
        href={element.href}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${url.protocol}//${url.hostname}/favicon.ico`}
          alt="favicon"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/url.ico";
            currentTarget.className =
              "max-h-[23px] h-full aspect-square invert inline align-middle mr-2";
          }}
          className={
            invertable.includes(url.hostname)
              ? "max-h-[23px] h-full aspect-square inline invert align-middle mr-2"
              : "max-h-[23px] h-full aspect-square inline align-middle mr-2"
          }
        />

        {element.children}
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
      const [checked, setChecked] = useState(element.checked);
      return (
        <input
          onChange={() => {
            setChecked(!checked);
          }}
          checked={checked}
          className="w-4 h-4 text-blue-600 rounded ring-offset-grey-800 bg-grey-700 border-grey-600"
          type="checkbox"
        />
      );
    }
    return <input type={element.type} />;
  },

  ul: (element: { className: string; children: any; node: any }) => {
    if (element.className === "contains-task-list") {
      return <ul className="list-none">{element.children}</ul>;
    }
    if (element.className === "toc-ul") {
      return <ul className="list-none">{element.children}</ul>;
    }
    return <ul className="list-disc">{element.children}</ul>;
  },

  li: (element: { className: string; children: any; node: any }) => {
    if (element.className === "toc-li") {
      return <li>{element.children}</li>;
    }
    return <li className={element.className}>{element.children}</li>;
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
        <pre className="code-block">{element.children}</pre>
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
    if (element.className === "toc-div") {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={
              isOpen
                ? "rounded-t-md toc-button w-full bg-[#3f3f3f] max-h-min flex items-center hover:bg-[#464646]"
                : "rounded-t-md toc-button w-full bg-[#303030] max-h-min flex items-center hover:bg-[#464646]"
            }
          >
            <div>
              <BsCaretDownFill
                className={isOpen ? "text-2xl" : "text-2xl -rotate-90"}
              />
            </div>

            <h1>Table of Contents</h1>
          </button>
          {isOpen && (
            <div className="toc-div bg-[#2c2c2c] rounded-b-md">
              {element.children}
            </div>
          )}
        </div>
      );
    }
    return <div className={element.className}>{element.children}</div>;
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
