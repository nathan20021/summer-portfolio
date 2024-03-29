import React, { ReactNode, useEffect } from "react";
import { Tags } from "@prisma/client";
import { useState } from "react";
import { prisma } from "@/db";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import rehypePrismAll from "rehype-prism-plus";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import styles from "../../../styles/mdBlogs.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AiFillTags, AiOutlineArrowLeft } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { BsFolderPlus } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import "katex/dist/katex.min.css";
const CodeEditor = dynamic<any>(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
import ReactMarkdownWrapper from "@/components/Markdown/ReactMarkdownWrapper";
import axios from "axios";

type props = {
  tags: Tags[];
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
type InitialScreenButtonsProps = {
  name: string;
  icon: ReactNode;
  onClickFunc: React.MouseEventHandler;
};

// eslint-disable-next-line require-jsdoc
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const InitialScreenButtons = ({
  name,
  icon,
  onClickFunc,
}: InitialScreenButtonsProps) => {
  return (
    <button
      onClick={(e) => {
        onClickFunc(e);
      }}
      className="flex justify-start items-center gap-10 bg-[#565584] 
                  hover:bg-[#67668e] py-5 px-6 min-w-max rounded-md"
    >
      <h1 className="font-bold text-lg">{icon}</h1>
      <span>{name}</span>
    </button>
  );
};

const AdminEditor = ({ tags }: props) => {
  const [tagsState, setTagsState] = useState<boolean[]>(
    new Array(tags.length).fill(false)
  );
  const [showPopUp, setShowPopUp] = useState<boolean>(true);
  const [code, setCode] = useLocalStorage("parsedMarkdown", "");
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<formProps>({
    title: "Untitled",
    url: "",
    coverImageUrl: "",
    readMins: 0,
    description: "",
    initialViews: 0,
  });

  const fetchData = async () => {
    const result = await axios("/posts/templates/template.md");
    setCode(result.data);
  };

  // TODO: Submit either update database or create new blog post
  const submitFunc = async () => {
    setSubmitting(true);
    for (let i = 0; i < 3; i++) {
      await sleep(i * 1000);
    }
    setFormState({
      title: "Untitled",
      url: "",
      coverImageUrl: "",
      readMins: 0,
      description: "",
      initialViews: 0,
    });
    setSubmitting(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const InitialPopUp = () => {
    return (
      <div
        className="flex flex-col items-center justify-center
                    gap-3 w-1/2 z-50 h-full"
      >
        <div className="flex flex-col gap-6 w-1/2 z-50">
          <InitialScreenButtons
            name="Create New Blog"
            icon={<BsFolderPlus />}
            onClickFunc={() => {
              localStorage.removeItem("parsedMarkdown");
              fetchData();
              setShowPopUp(false);
            }}
          />
          <InitialScreenButtons
            name="Edit Blogs"
            icon={<MdEditNote />}
            onClickFunc={() => {
              alert("TODO");
              setShowPopUp(false);
            }}
          />
          <InitialScreenButtons
            name="Edit Draft"
            icon={<RiDraftLine />}
            onClickFunc={() => {
              alert("TODO");
              setShowPopUp(false);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Admin Editor</title>
      </Head>
      <section className="mt-10 min-h-screen z-50 flex flex-col justify-start items-center">
        {showPopUp ? (
          <InitialPopUp />
        ) : (
          <>
            <div
              id="top-button-container"
              className="z-50 my-10 flex gap-10 w-1/2"
            >
              <button
                className="font-semibold px-6 py-3"
                onClick={() => {
                  setShowPopUp(!showPopUp);
                }}
              >
                <span className="flex gap-2 items-center">
                  <AiOutlineArrowLeft /> Back
                </span>
              </button>
              <button
                className="bg-[#9a3f3f] px-3 py-1 rounded-sm"
                onClick={() => {
                  setIsPreview(!isPreview);
                }}
              >
                {isPreview ? "Show Code" : "Hide Code"}
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
                    rehypePlugins={[rehypePrismAll]}
                    language="markdown"
                    minHeight={400}
                    placeholder="Paste Markdown here"
                    onChange={(evn: any) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                      height: "100%",
                      fontSize: 16,
                      backgroundColor: "#272727",
                    }}
                  />
                </div>
              )}
              <div
                id="markdown-preview"
                className={
                  isPreview
                    ? `z-50 w-[90%] lg:w-[60%]`
                    : `z-50 w-1/2 px-4 pb-10 bg-[#272727]  border-l-2 border-[#ffffff]`
                }
              >
                <ReactMarkdownWrapper
                  code={code}
                  className={`${styles.post} z-10 h-full`}
                />
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
                                <label
                                  htmlFor="blog-title"
                                  className="font-bold"
                                >
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
                                <label
                                  htmlFor="description"
                                  className="font-bold"
                                >
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

                              <div
                                id="read-min-selector"
                                className="md:col-span-3"
                              >
                                <label
                                  htmlFor="read-mins"
                                  className="font-bold"
                                >
                                  Average minutes [{readTimeRange.minAmount},{" "}
                                  {readTimeRange.maxAmount}]
                                </label>
                                <div className="h-10 w-40 bg-[#bebec0] flex border border-[#e5e7eb] rounded items-center mt-1">
                                  <button
                                    tabIndex={-1}
                                    className="cursor-pointer outline-none focus:outline-none border-r border-[#606060] transition-all text-[#323232] hover:text-[#2563eb]"
                                    onClick={() => {
                                      formState.readMins >
                                      readTimeRange.minAmount
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
                                      formState.readMins <
                                      readTimeRange.maxAmount
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
                                      formState.initialViews >
                                      viewRange.minAmount
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
                                      formState.initialViews <
                                      viewRange.maxAmount
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
                                {tags.map((val, ind) => {
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
                                })}
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
          </>
        )}
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

  const tags = await prisma.tags.findMany();
  return {
    props: {
      tags: tags,
    },
  };
}

export default AdminEditor;
