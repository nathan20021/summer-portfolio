import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkDirectivesHelper } from "../../plugins/remark";
import RemarkMathPlugin from "remark-math";
import remarkDirective from "remark-directive";
import remarkToc from "remark-toc";
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
          remarkToc({
            heading: "Table of Contents",
            ordered: false,
            tight: true,
            prefix: "toc-",
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
