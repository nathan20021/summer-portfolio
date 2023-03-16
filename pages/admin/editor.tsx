import React from "react";
import { useState } from "react";
import * as fs from "fs";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import MarkdownComponents from "@/components/Markdown/MarkdownComponents";
import rehypeHighlight from "rehype-highlight";
import rehypePrismAll from "rehype-prism-plus";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import styles from "../../styles/mdBlogs.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import useLocalStorage from "@/hooks/useLocalStorage";
// import { prisma } from "@/db";
import { TiTick } from "react-icons/ti";
import path from "path";
import RemarkMathPlugin from "remark-math";
import "katex/dist/katex.min.css";
import rehypeRaw from "rehype-raw";
const CodeEditor = dynamic<any>(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

type props = {
  mdTemplate: string;
};

type formProps = {
  title: string;
  url: string;
  coverImageUrl: string;
  readMins: number;
  description: string;
  initialViews: number;
};

type rangeType = {
  minAmount: number;
  maxAmount: number;
};

const viewRange: rangeType = {
  minAmount: 0,
  maxAmount: 40,
};
const readTimeRange: rangeType = {
  minAmount: 0,
  maxAmount: 20,
};

// eslint-disable-next-line require-jsdoc
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AdminEditor = ({ mdTemplate }: props) => {
  const submitFunc = async () => {
    setSubmitting(true);
    for (let i = 0; i < 3; i++) {
      await sleep(i * 1000);
    }
    setSubmitting(false);
    setFormState({
      title: "Untitled",
      url: "",
      coverImageUrl: "",
      readMins: 0,
      description: "",
      initialViews: 0,
    });
  };

  const [code, setCode] = useLocalStorage("parsedMarkdown", mdTemplate);
  const [highLightMD, setHighLightMD] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [formState, setFormState] = useState<formProps>({
    title: "Untitled",
    url: "",
    coverImageUrl: "",
    readMins: 0,
    description: "",
    initialViews: 0,
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Admin Editor</title>
      </Head>
      <section className="mt-10 min-h-screen z-50 flex flex-col justify-start items-center">
        <div id="top-button-container" className="z-50 my-10 flex gap-10">
          <button
            className=" bg-[#9a3f3f] px-3 py-1 rounded-sm"
            onClick={() => {
              setHighLightMD(!highLightMD);
            }}
          >
            {!highLightMD ? "Highlight MD" : "Unhighlight MD"}
          </button>
          <button
            className="bg-[#2e7c9e] hover:bg-[#47849f] px-3 py-1 rounded-sm"
            onClick={() => {
              setIsPreview(!isPreview);
            }}
          >
            {isPreview ? "Show Code" : "Hide Code"}
          </button>
          <button
            className="bg-[#2e7c9e] hover:bg-[#47849f] px-3 py-1 rounded-sm"
            onClick={() => {
              if (code !== mdTemplate) {
                localStorage.removeItem("parsedMarkdown");
                setCode(mdTemplate);
              }
            }}
          >
            Reset Template
          </button>
        </div>
        <div
          id="preview-editor-container"
          className={
            isPreview
              ? `flex justify-center w-full min-h-screen`
              : `flex justify-center w-[90%] min-h-screen`
          }
        >
          {!isPreview && (
            <div
              id="code-editor"
              className="z-50 w-1/2 wmde-markdown-var border-r-2 border-[#ffffff] select-none"
              aria-readonly="true"
            >
              <CodeEditor
                value={code}
                rehypePlugins={
                  highLightMD ? [rehypeHighlight] : [rehypePrismAll]
                }
                language="markdown"
                minHeight={400}
                placeholder="Paste Markdown here"
                onChange={(evn: any) => setCode(evn.target.value)}
                padding={15}
                style={{
                  height: "100%",
                  fontSize: 16,
                  backgroundColor: "#282c34",
                }}
              />
            </div>
          )}
          <div
            id="markdown-preview"
            className={
              isPreview
                ? `z-50 w-[90%] lg:w-[60%] py-4`
                : `z-50 w-1/2 pl-4 pb-10 bg-[#282c34]  border-l-2 border-[#ffffff]`
            }
          >
            <ReactMarkdown
              className={`${styles.post} z-10 h-full`}
              remarkPlugins={[remarkGfm, RemarkMathPlugin]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={MarkdownComponents}
            >
              {code === undefined ? "" : code}
            </ReactMarkdown>
          </div>
        </div>
        <div className="w-full z-50 my-20 flex flex-col justify-center items-center">
          <div className="border-t-4 h-5 w-[80%] border-[#ffffff]" />
          <div id="form-container" className="flex gap-4 justify-center">
            <div className="min-h-screen w-[70%] p-6 flex items-center justify-center ">
              <div className="container max-w-screen-lg mx-auto">
                <div>
                  <h2 className="font-semibold text-xl text-[#ffffff] mb-5">
                    Create a new post
                  </h2>

                  <div className="bg-[#2b2b2b] w-full rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className=" lg:col-span-3">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-5 flex justify-center items-center">
                            <h2 className="text-xl">Metadata</h2>
                          </div>
                          <div className="md:col-span-5">
                            <label htmlFor="blog-title" className="font-bold">
                              Title
                            </label>
                            <input
                              type="text"
                              name="blog-title"
                              id="blog-title"
                              className="text-[#333333] h-10 border mt-1 rounded px-4 w-full bg-[#bebec0] focus:bg-[#f9fafb]"
                              value={formState.title}
                              onChange={(evn) => {
                                setFormState({
                                  ...formState,
                                  title: evn.target.value,
                                });
                              }}
                            />
                          </div>

                          <div className="md:col-span-5">
                            <label htmlFor="blog-url" className="font-bold">
                              Slug/ URL
                            </label>
                            <div className="flex gap-2 h-full">
                              <input
                                type="text"
                                name="blog-url"
                                id="blog-url"
                                className="text-[#333333] h-10 border mt-1 rounded px-4 w-full bg-[#bebec0] focus:bg-[#f9fafb]"
                                value={formState.url}
                                placeholder={formState.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                                onChange={(evn) => {
                                  setFormState({
                                    ...formState,
                                    url: evn.target.value,
                                  });
                                }}
                              />
                              <button
                                onClick={() => {
                                  setFormState({
                                    ...formState,
                                    url: formState.title
                                      .toLowerCase()
                                      .replace(/\s+/g, "-"),
                                  });
                                }}
                                className="hover:bg-[#4b4bc6] bg-[#6060ff] rounded-lg h-10 mt-1 aspect-square font-normal flex justify-center text-xl items-center"
                              >
                                <TiTick />
                              </button>
                            </div>
                          </div>

                          <div className="md:col-span-5">
                            <label htmlFor="description" className="font-bold">
                              Blog Description
                            </label>
                            <textarea
                              name="description"
                              id="description"
                              className="text-[#333333] min-h-[2rem] max-h-36 h-20 border mt-1 rounded py-1 px-4 w-full focus:bg-[#f9fafb] bg-[#bebec0]"
                              value={formState.description}
                              placeholder="Description please"
                              onChange={(evn) => {
                                setFormState({
                                  ...formState,
                                  description: evn.target.value,
                                });
                              }}
                              aria-valuetext={formState.description}
                            />
                          </div>

                          <div id="read-min-selector" className="md:col-span-3">
                            <label htmlFor="read-mins" className="font-bold">
                              Average minutes [{readTimeRange.minAmount},{" "}
                              {readTimeRange.maxAmount}]
                            </label>
                            <div className="h-10 w-40 bg-[#bebec0] flex border border-[#e5e7eb] rounded items-center mt-1">
                              <button
                                tabIndex={-1}
                                className="cursor-pointer outline-none focus:outline-none border-r border-[#606060] transition-all text-[#323232] hover:text-[#2563eb]"
                                onClick={() => {
                                  formState.readMins > readTimeRange.minAmount
                                    ? setFormState({
                                        ...formState,
                                        readMins: formState.readMins - 1,
                                      })
                                    : void 0;
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mx-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <input
                                name="read-mins"
                                id="read-mins"
                                placeholder="0"
                                onChange={(evn) => {
                                  setFormState({
                                    ...formState,
                                    readMins:
                                      isNaN(parseInt(evn.target.value)) ||
                                      parseInt(evn.target.value) >
                                        readTimeRange.maxAmount
                                        ? readTimeRange.minAmount
                                        : parseInt(evn.target.value),
                                  });
                                }}
                                className="px-2 text-center appearance-none outline-none text-[#1f2937] w-full bg-transparent"
                                value={formState.readMins}
                              />
                              <button
                                tabIndex={-1}
                                className="cursor-pointer outline-none focus:outline-none border-l border-[#606060] transition-all text-[#323232] hover:text-[#2563eb]"
                                onClick={() => {
                                  formState.readMins < readTimeRange.maxAmount
                                    ? setFormState({
                                        ...formState,
                                        readMins: formState.readMins + 1,
                                      })
                                    : void 0;
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mx-2 fill-current"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div
                            id="initial-views-selector"
                            className="md:col-span-2"
                          >
                            <label
                              htmlFor="initial-views"
                              className="font-bold"
                            >
                              Initial Views [{viewRange.minAmount},{" "}
                              {viewRange.maxAmount}]
                            </label>
                            <div className="h-10 w-40 bg-[#bebec0] focus:bg-[#f9fafb] flex border border-[#e5e7eb] rounded items-center mt-1">
                              <button
                                tabIndex={-1}
                                className="cursor-pointer outline-none focus:outline-none border-r border-[#606060] transition-all text-[#323232] hover:text-[#2563eb]"
                                onClick={() => {
                                  formState.initialViews > viewRange.minAmount
                                    ? setFormState({
                                        ...formState,
                                        initialViews:
                                          formState.initialViews - 1,
                                      })
                                    : void 0;
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mx-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <input
                                onChange={(evn) => {
                                  setFormState({
                                    ...formState,
                                    initialViews:
                                      isNaN(parseInt(evn.target.value)) ||
                                      parseInt(evn.target.value) >
                                        viewRange.maxAmount
                                        ? viewRange.minAmount
                                        : parseInt(evn.target.value),
                                  });
                                }}
                                name="initial-views"
                                id="initial-views"
                                placeholder="0"
                                className="px-2 text-center appearance-none outline-none text-[#1f2937] w-full bg-transparent"
                                value={formState.initialViews}
                              />
                              <button
                                tabIndex={-1}
                                className="cursor-pointer outline-none focus:outline-none border-l border-[#606060] transition-all text-[#323232] hover:text-[#2563eb]"
                                onClick={() => {
                                  formState.initialViews < viewRange.maxAmount
                                    ? setFormState({
                                        ...formState,
                                        initialViews:
                                          formState.initialViews + 1,
                                      })
                                    : void 0;
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mx-2 fill-current"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="md:col-span-5 flex justify-center items-center">
                            <h2 className="text-xl mt-6">Tags</h2>
                          </div>
                          <div
                            id="tags-container"
                            className="flex-wrap md:col-span-5 flex justify-center gap-2"
                          >
                            {/* {tags.map((val, ind) => {
                              return (
                                <div
                                  key={ind}
                                  className={
                                    tagsState[val.id - 1]
                                      ? `w-1/4 select-none flex justify-start bg-[#6060ff] hover:bg-[#7575fd] gap-3 items-end py-2 px-3 cursor-pointer rounded-md text-[#ffffff]`
                                      : `w-1/4 select-none flex justify-start bg-[#bebec0] hover:bg-[#7575fd] gap-3 items-end py-2 px-3 cursor-pointer rounded-md text-[#000000]`
                                  }
                                  onClick={() => {
                                    const newTagsState = [...tagsState];
                                    newTagsState[val.id - 1] =
                                      !newTagsState[val.id - 1];
                                    setTagsState(newTagsState);
                                  }}
                                >
                                  <AiFillTags />
                                  {val.name}
                                </div>
                              );
                            })} */}
                          </div>

                          <div className="md:col-span-5 text-center">
                            <button
                              className={
                                submitting
                                  ? "w-2/3 hover:bg-[#2b63b7] bg-[#367de7] text-white font-bold py-3 px-4 rounded mt-6"
                                  : "w-2/3 hover:bg-[#4b4bc6] bg-[#6060ff] text-white font-bold py-3 px-4 rounded mt-6"
                              }
                              onClick={submitFunc}
                            >
                              {submitting ? ". . ." : "Done"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

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

  // const tags = await prisma.tags.findMany();

  const sth = path.resolve(process.cwd(), "md/templates");
  const parsedMDwithMetaData = fs
    .readFileSync(path.join(sth, "template.md"))
    .toString();
  return {
    props: {
      // tags: tags,
      mdTemplate: matter(parsedMDwithMetaData).content,
    },
  };
}
export default AdminEditor;
