// import { Button } from "@mui/material";
import React from "react";
import * as fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/mdBlogs.module.css";
import rehypeHighlight from "rehype-highlight";

type prop = {
  content: string;
  metaData: any;
};

const Post = ({ content, metaData }: prop) => {
  return (
    <div className="z-10">
      <Head>
        <title>{metaData.title}</title>
      </Head>
      <div
        id="Blog Container"
        className=" w-full flex flex-col items-center bg-[#121212] z-10"
      >
        <ReactMarkdown
          className={`${styles.post} w-[70%] mt-10 z-10`}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
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
  const files = fs.readdirSync("md/posts");
  return {
    paths: getParamFromList(files),
    fallback: false,
  };
}

// Fetch the data
// eslint-disable-next-line require-jsdoc
export async function getStaticProps({ params: { slug } }: any) {
  const parsedMDwithMetaData = fs
    .readFileSync(path.join("md/posts", slug, `${slug}.md`))
    .toString();

  const parsedMarkdown = matter(parsedMDwithMetaData);
  return {
    // Passed to the page component as props
    props: {
      content: parsedMarkdown.content,
      metaData: parsedMarkdown.data,
    },
  };
}

const getParamFromList = (data: Array<string>) => {
  const result: Array<{ params: { slug: string } }> = [];
  data.forEach((element) => {
    result.push({
      params: { slug: element },
    });
  });
  return result;
};

export default Post;
