import React from "react";
// import { useEffect } from "react";
import * as fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/mdBlogs.module.css";
import rehypeHighlight from "rehype-highlight";
import { BsFillEyeFill } from "react-icons/bs";
import { BlogPost } from "@prisma/client";
import { prisma } from "@/db";
import MarkdownComponents from "@/components/Markdown/MarkdownComponents";
import { remarkDirectivesHelper } from "@/plugins/remark";

import { ParsedUrlQuery } from "querystring";
import config from "../../config.json";
import { GetStaticPropsContext } from "next";
import RemarkMathPlugin from "remark-math";
import "katex/dist/katex.min.css";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkToc from "remark-toc";
// import { useTheme } from "next-themes";

type prop = {
  content: string;
  metaData: any;
};
interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Post = ({ content, metaData }: prop) => {
  // const { theme, setTheme } = useTheme();
  // useEffect(() => {
  //   setTheme("dark");
  // }, []);
  return (
    <div className="bg-light dark:bg-primary z-10 w-full flex justify-center items-center">
      <Head>
        <title>{metaData.title}</title>
      </Head>
      <div
        id="Blog Container"
        className="w-[90%] lg:w-[60%] flex flex-col items-center bg-light dark:bg-primary z-10"
      >
        <div
          id="metadata-container"
          className="z-10 w-full text-center text-darktext dark:text-lighttext"
        >
          <h1 className="sm:font-medium text-center text-3xl sm:text-5xl mt-12 tracking-wide">
            {metaData.title}
          </h1>
          <p className="text-sm sm:text-base opacity-75 mt-2 flex flex-col sm:flex-row justify-center gap-1">
            Nathan Luong | {metaData.publishedAt}{" "}
            <span className="hidden sm:inline-block">|</span>
            <span className="flex justify-center items-center gap-1">
              <BsFillEyeFill />
              {metaData.views}
            </span>
          </p>
        </div>

        <ReactMarkdown
          // className={
          //   theme === "dark"
          //     ? `${styles.postDark} ${styles.post} w-full z-10 text-lighttext`
          //     : `${styles.postLight} ${styles.post} w-full z-10 text-darktext`
          // }
          className={`${styles.postDark} ${styles.post} w-full z-10 text-lighttext`}
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
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// Generating the Paths that the page need
// eslint-disable-next-line require-jsdoc
export async function getStaticPaths() {
  const files = await prisma.blogPost.findMany();
  return {
    paths: getParamFromList(files),
    fallback: false,
  };
}

// Fetch the data
// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params as IParams;
  const metaData: BlogPost | null = await prisma.blogPost.findFirst({
    where: {
      url: slug,
    },
  });
  const parsedMDwithMetaData = fs
    .readFileSync(path.join("md/posts", slug, `${slug}.md`))
    .toString();

  const parsedMarkdown = matter(parsedMDwithMetaData);
  return {
    // Passed to the page component as props
    props: {
      content: parsedMarkdown.content,
      metaData: {
        ...metaData,
        publishedAt: metaData?.publishedAt.toLocaleString(
          config.DATE_TIME_FORMAT,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
      },
    },
  };
}

const getParamFromList = (data: Array<BlogPost>) => {
  const result: Array<{ params: { slug: string } }> = [];
  data.forEach((element) => {
    result.push({
      params: { slug: element.url },
    });
  });
  return result;
};

export default Post;
