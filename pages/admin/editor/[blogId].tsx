import React, { useRef } from "react";
import { GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { getSession } from "next-auth/react";
import styles from "../../../styles/mdBlogs.module.css";
import { prisma } from "@/db";
import "@uiw/react-textarea-code-editor/dist.css";
import { BlogPost } from "@prisma/client";
import config from "../../../config.json";
import axios from "axios";
import ReactMarkdownWrapper from "@/components/Markdown/ReactMarkdownWrapper";
import rehypePrismAll from "rehype-prism-plus";
import "katex/dist/katex.min.css";
import { toJpeg } from "html-to-image";

import matter from "gray-matter";
import dynamic from "next/dynamic";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
const CodeEditor = dynamic<any>(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

type prop = {
  blogData: BlogPost | null;
  content: string;
};
const filter = (node: HTMLElement) => {
  const exclusionClasses = ["toc-div", "link-img"];
  return !exclusionClasses.some((htmlClassName) =>
    node.classList?.contains(htmlClassName)
  );
};

const Post = ({ blogData, content }: prop) => {
  const [code, setCode] = React.useState<string>(content);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const elementRef = useRef(null);

  const htmlToImageConvert = async () => {
    if (!elementRef.current) return;
    const dataURL = await toJpeg(elementRef.current, {
      backgroundColor: "#1f1f1f",
      skipFonts: true,
      filter: filter,
      cacheBust: false,
      quality: 0.1,
      width: 900,
      height: 1300,
      fetchRequestInit: {
        headers: {
          "Content-Type": "image/png",
          "Access-Control-Allow-Origin": "*",
          Accept: "image/png",
        },
      },
    });
    return dataURL;
  };

  return (
    <div className="min-w-screen min-h-screen z-10 flex flex-col justify-center items-center">
      <div id="top-button-container" className="w-1/2 z-20 sticky top-20">
        <div className="z-10 my-5 flex gap-10 w-full">
          <Link href="/admin/editor">
            <a className="font-semibold px-6 py-3 hover:cursor-pointer">
              <span className="flex gap-2 items-center">
                <AiOutlineArrowLeft /> Back
              </span>
            </a>
          </Link>
          <button
            className="bg-[#9a3f3f] px-3 py-1 rounded-sm z-10"
            onClick={() => {
              setIsPreview(!isPreview);
            }}
          >
            {isPreview ? "Show Code" : "Hide Code"}
          </button>
          <button
            className="bg-[#5798da] px-3 py-1 rounded-sm z-10"
            onClick={async () => {
              setIsSaving(true);
              const res = await axios.post("/api/blog/update", {
                id: blogData?.id,
                content: code,
              });
              if (res.status === 200) {
                setIsSaving(false);
              }
              const thumbnailURL = await htmlToImageConvert();
              await axios.post("/api/blog/upload-thumbnail", {
                id: blogData?.id,
                dataURL: thumbnailURL,
              });
            }}
          >
            {isSaving ? "Saving" : "Save Changes"}
          </button>
        </div>
      </div>
      <div
        id="preview-editor-container"
        className="flex justify-center w-[98%] min-h-screen"
      >
        {!isPreview && (
          <div
            id="code-editor"
            className="z-10 w-1/2 wmde-markdown-var border-r-2 border-[#ffffff] select-none"
            aria-readonly="true"
          >
            <CodeEditor
              value={code}
              rehypePlugins={[
                [
                  rehypePrismAll,
                  { ignoreMissing: true, showLineNumbers: true },
                ],
              ]}
              language="markdown"
              minHeight={400}
              placeholder="Paste Markdown here"
              onChange={(evn: any) => setCode(evn.target.value)}
              padding={15}
              style={{
                height: "100%",
                fontSize: 16,
                backgroundColor: "#1f1f1f",
              }}
            />
          </div>
        )}
        <div
          ref={elementRef}
          id="markdown-preview"
          className={
            isPreview
              ? `z-10 w-[90%] lg:w-[60%]`
              : `z-10 w-1/2 px-4 pb-10 bg-[#1f1f1f]`
          }
        >
          <ReactMarkdownWrapper
            code={code}
            className={`${styles.post} z-10 h-full`}
          />
        </div>
      </div>
    </div>
  );
};

interface IParams extends ParsedUrlQuery {
  blogId: string;
}
// eslint-disable-next-line require-jsdoc
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { blogId } = context.params as IParams;
  const blogData: BlogPost | null = await prisma.blogPost.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!blogData) {
    return {
      redirect: {
        destination: "/admin/editor",
        permanent: false,
      },
    };
  }
  const res = await axios.get(`${process.env.URL}/api/blog/id/${blogId}`, {
    timeout: 5000,
    headers: {
      Accept: "application/json",
    },
  });
  const parsedMarkdown = matter(res.data.data);

  return {
    props: {
      content: parsedMarkdown.content,
      blogData: {
        ...blogData,
        publishedAt: blogData?.publishedAt.toLocaleString(
          config.DATE_TIME_FORMAT,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
        updatedAt: blogData?.updatedAt.toLocaleString(config.DATE_TIME_FORMAT, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    },
  };
}

export default Post;
