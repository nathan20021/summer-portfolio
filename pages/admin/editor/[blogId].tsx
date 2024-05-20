import React, { useRef } from "react";
import { GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { getSession } from "next-auth/react";
import styles from "../../../styles/mdBlogs.module.css";
import { prisma } from "@/db";
import "@uiw/react-textarea-code-editor/dist.css";
import { BlogPost, Tags } from "@prisma/client";
import config from "../../../config.json";
import axios from "axios";
import ReactMarkdownWrapper from "@/components/Markdown/ReactMarkdownWrapper";
import rehypePrismAll from "rehype-prism-plus";
import "katex/dist/katex.min.css";
import { toJpeg } from "html-to-image";
import matter from "gray-matter";
import dynamic from "next/dynamic";
import FileTree from "../../../components/FileTree/S3FileTree";
import TopBar from "@/components/Editor/ControlTopBar";
import MetaDataModal from "@/components/Editor/MetaDataModal";
import Head from "next/head";
import { GoSidebarExpand } from "react-icons/go";

const CodeEditor = dynamic<any>(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
export interface FrontEndBlogPost extends Omit<BlogPost, "updatedAt"> {
  updatedAt: string;
}

type prop = {
  blogData: FrontEndBlogPost;
  content: string;
  blogId: string;
  currentBlogTags: Tags[];
  tags: Tags[];
};

const BlogEditorPage = ({
  blogData,
  content,
  blogId,
  tags,
  currentBlogTags,
}: prop) => {
  const [code, setCode] = React.useState<string>(content);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const [isFileTreeVisible, setIsFileTreeVisible] =
    React.useState<boolean>(false);
  const [editedBlogData, setEditedBlogData] =
    React.useState<FrontEndBlogPost>(blogData);
  const [currentBlogData, setCurrentBlogData] =
    React.useState<FrontEndBlogPost>(blogData);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

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
    if (event.code === "KeyB" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setIsFileTreeVisible((prev) => !prev);
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
      cacheBust: true,
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

    if (res.status === 200) {
      if (blogData?.url) {
        await axios.post("/api/revalidate", {
          path: `/blogs/${currentBlogData.url}`,
        });
      }
      setIsSaving(false);
    }
    try {
      const thumbnailURL = await htmlToImageConvert();
      await axios.post("/api/blog/upload-thumbnail", {
        id: blogData?.id,
        dataURL: thumbnailURL,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Head>
        <title>[Editor] {currentBlogData.title}</title>
      </Head>
      <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
        <div className="w-full">
          <TopBar
            openModal={() => setIsModalOpen(true)}
            updatedAt={blogData?.updatedAt || ""}
            blogType={editedBlogData.type}
            isSaving={isSaving}
            onSave={onSave}
            fileName={currentBlogData.title}
          />
        </div>
        <div className="w-full flex relative">
          <div
            id="file-tree-container"
            className="flex flex-col ease-in-out fixed duration-150 z-[100] h-screen top-0 left-0 
                        overflow-y-scroll bg-[#161616] shadow-xl shadow-black"
            style={{
              transform: isFileTreeVisible
                ? "translateX(0)"
                : "translateX(-520px)",
            }}
          >
            <div className="w-full flex justify-end my-2">
              <button
                className="p-2 mr-3 text-grey-400 text-lg hover:text-white"
                onClick={() => {
                  setIsFileTreeVisible(false);
                }}
              >
                <GoSidebarExpand />
              </button>
            </div>
            <div className="flex flex-col items-center w-[500px] h-full pb-5">
              <div className="w-[95%] pb-10">
                <FileTree
                  rootFolderName={blogId}
                  displayName={currentBlogData.title}
                  publicPrefix="PUBLIC"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-screen">
            <div
              id="preview-editor-container"
              className="flex justify-center w-[95%] min-h-screen"
            >
              <div
                ref={elementRef}
                id="markdown-preview"
                className={
                  isPreview ? "w-[60%] px-4 py-10" : "w-1/2 px-4 py-10"
                }
              >
                <ReactMarkdownWrapper
                  code={code}
                  className={`${styles.post} h-full`}
                />
              </div>
              {!isPreview && (
                <div
                  id="code-editor"
                  className=" w-1/2 wmde-markdown-var border-[#606060] select-none pt-8"
                  aria-readonly="true"
                >
                  <CodeEditor
                    value={code}
                    rehypePlugins={[[rehypePrismAll, { ignoreMissing: true }]]}
                    language="markdown"
                    minHeight={400}
                    placeholder="Paste Markdown here"
                    onChange={(evn: any) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                      height: "100%",
                      fontSize: 16,
                      backgroundColor: "#202020",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <MetaDataModal
          currentTags={currentBlogTags}
          allTags={tags}
          editedBlogData={editedBlogData}
          currentBlogData={currentBlogData}
          setEditedBlogData={setEditedBlogData}
          onSaveMetaData={async (imageURL, selectedTags) => {
            onSave();
            const updatingPostRes = await axios.patch(
              "/api/blog/update-metadata",
              {
                id: currentBlogData.id,
                cover: imageURL,
                title: editedBlogData.title,
                description: editedBlogData.description,
                readTime: editedBlogData.readTime,
                views: editedBlogData.views,
                type: editedBlogData.type,
                url: editedBlogData.url,
                tags: selectedTags,
              }
            );
            await axios.post("/api/revalidate", {
              path: `/blogs`,
            });
            if (updatingPostRes.status === 200) {
              setCurrentBlogData(updatingPostRes.data.body);
              setEditedBlogData(updatingPostRes.data.body);
            }
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
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

  const blogData = await prisma.blogPost.findUnique({
    where: {
      id: blogId,
    },
    include: {
      tags: true,
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

  const [rawMarkdownRes, tags] = await Promise.all([
    axios.get(`${process.env.URL}/api/blog/id/${blogId}`, {
      timeout: 5000,
      headers: {
        Accept: "application/json",
      },
    }),
    prisma.tags.findMany({}),
  ]);

  const parsedMarkdown = matter(rawMarkdownRes.data.data);

  return {
    props: {
      blogId: blogId,
      content: parsedMarkdown.content,
      tags: tags,
      currentBlogTags: blogData.tags,
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
