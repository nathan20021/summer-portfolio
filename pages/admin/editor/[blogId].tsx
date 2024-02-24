import React, { useRef } from "react";
import { GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { getSession } from "next-auth/react";
import styles from "../../../styles/mdBlogs.module.css";
import { prisma } from "@/db";
import "@uiw/react-textarea-code-editor/dist.css";
import { BlogPost, BlogType } from "@prisma/client";
import config from "../../../config.json";
import axios from "axios";
import ReactMarkdownWrapper from "@/components/Markdown/ReactMarkdownWrapper";
import rehypePrismAll from "rehype-prism-plus";
import "katex/dist/katex.min.css";
import { toJpeg } from "html-to-image";
import matter from "gray-matter";
import dynamic from "next/dynamic";
import { MdArrowBackIosNew } from "react-icons/md";
import FileTree from "../../../components/FileTree/S3FileTree";
import TopBar from "@/components/Editor/ControlTopBar";
import MetaDataModal from "@/components/Editor/MetaDataModal";

const CodeEditor = dynamic<any>(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
interface FrontEndBlogPost extends Omit<BlogPost, "updatedAt"> {
  updatedAt: string;
}

type prop = {
  blogData: FrontEndBlogPost;
  content: string;
  blogId: string;
};

const BlogEditorPage = ({ blogData, content, blogId }: prop) => {
  const [code, setCode] = React.useState<string>(content);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isPreview, setIsPreview] = React.useState<boolean>(true);
  const [isFileTreeVisible, setIsFileTreeVisible] =
    React.useState<boolean>(true);
  const [editedBlogType, setEditedBlogType] = React.useState<BlogType>(
    blogData?.type || "DRAFT"
  );
  const [fileName, setFileName] = React.useState<string>(blogData?.title || "");
  const [editedBlogData, setEditedBlogData] =
    React.useState<FrontEndBlogPost>(blogData);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);

  const elementRef = useRef(null);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.code === "KeyE" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setIsPreview((prev) => !prev);
    }
    if (event.code === "KeyS" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSave();
    }
  };

  const htmlToImageConvert = async () => {
    if (!elementRef.current) return;
    const dataURL = await toJpeg(elementRef.current, {
      backgroundColor: "#1f1f1f",
      skipFonts: true,
      filter: (node: HTMLElement) => {
        const exclusionClasses = ["toc-div", "link-img"];
        return !exclusionClasses.some((htmlClassName) =>
          node.classList?.contains(htmlClassName)
        );
      },
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

  React.useEffect(() => {
    const handleWindowClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSave = async () => {
    setIsSaving(true);
    const res = await axios.post("/api/blog/update", {
      id: blogData?.id,
      content: code,
    });

    const metaDataRes = await axios.patch("/api/blog/update-metadata", {
      id: blogData?.id,
      title: fileName,
      type: editedBlogType,
    });

    if (res.status === 200 && metaDataRes.status === 200) {
      setIsSaving(false);
    }
    const thumbnailURL = await htmlToImageConvert();
    await axios.post("/api/blog/upload-thumbnail", {
      id: blogData?.id,
      dataURL: thumbnailURL,
    });
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="w-full">
        <TopBar
          setBlogType={setEditedBlogType}
          updatedAt={blogData?.updatedAt || ""}
          blogType={editedBlogType}
          isSaving={isSaving}
          onSave={onSave}
          fileName={fileName}
          setFileName={setFileName}
        />
      </div>
      <div className="w-full flex">
        <div
          id="file-tree-container"
          className="w-[15%] flex ease-in-out duration-150"
          style={{
            transform: isFileTreeVisible
              ? "translateX(0)"
              : "translateX(-100%)",
          }}
        >
          <FileTree
            rootFolderName={blogId}
            displayName="Untitled"
            publicPrefix="PUBLIC"
          />
          <div className="h-full flex justify-center items-center">
            <button
              className="bg-[#aaaaaa] hover:bg-[#ffffff] text-[#333333] 
              p-1 rounded-full cursor-pointer flex justify-center items-center
              ease-in-out duration-150
              "
              onClick={() => setIsFileTreeVisible((prev) => !prev)}
              style={{
                transform: isFileTreeVisible
                  ? "rotate(0deg)"
                  : "rotate(180deg)",
              }}
            >
              <MdArrowBackIosNew />
            </button>
          </div>
        </div>
        <div
          id="preview-editor-container"
          className="flex justify-center w-[85%] min-h-screen"
        >
          {!isPreview && (
            <div
              id="code-editor"
              className=" w-1/2 wmde-markdown-var border-r-2 border-[#ffffff] select-none"
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
                ? ` w-[90%] lg:w-[60%]`
                : ` w-1/2 px-4 pb-10 bg-[#1f1f1f]`
            }
          >
            <ReactMarkdownWrapper
              code={code}
              className={`${styles.post}  h-full`}
            />
          </div>
        </div>
      </div>
      <MetaDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
      blogId: blogId,
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

export default BlogEditorPage;
