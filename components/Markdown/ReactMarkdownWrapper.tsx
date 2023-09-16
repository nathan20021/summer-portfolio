import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkDirectivesHelper, remarkCustomTOC } from "../../plugins/remark";
import RemarkMathPlugin from "remark-math";
import remarkDirective from "remark-directive";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import MarkdownComponents from "./MarkdownComponents";

type ReactMarkdownWrapperProps = {
  code: string | undefined;
  className: string;
};

const ReactMarkdownWrapper = ({
  code,
  className,
}: ReactMarkdownWrapperProps) => {
  return (
    <ReactMarkdown
      className={`${className} post z-10 h-full`}
      remarkPlugins={[
        remarkGfm,
        RemarkMathPlugin,
        remarkDirective,
        remarkDirectivesHelper,
        () =>
          remarkCustomTOC({
            slugify: (str: string) => {
              return str;
            },
            headingTitle: "Table of Contents",
          }),
      ]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={MarkdownComponents}
    >
      {code === undefined ? "" : code}
    </ReactMarkdown>
  );
};

export default ReactMarkdownWrapper;
