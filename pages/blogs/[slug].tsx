import React from "react";
import * as fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/mdBlogs.module.css";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { BsFillEyeFill } from "react-icons/bs";

type prop = {
  content: string;
  metaData: any;
};

const Post = ({ content, metaData }: prop) => {
  const MarkdownComponents: object = {
    p: (paragraph: { children?: boolean; node?: any }) => {
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
      return <p>{paragraph.children}</p>;
    },
  };
  return (
    <div className="z-10">
      <Head>
        <title>{metaData.title}</title>
      </Head>
      <div
        id="Blog Container"
        className=" w-full flex flex-col items-center bg-primary z-10"
      >
        <div id="metadata-container" className="z-10 w-[60%] text-center">
          <h1 className="font-medium text-center text-5xl mt-12 tracking-wide">
            {metaData.title}
          </h1>
          <p className="text-base opacity-75 mt-2 flex justify-center gap-1">
            {metaData.author} | {metaData.published_at} |
            <span className="flex justify-center items-center gap-1">
              <BsFillEyeFill />
              {metaData.views}
            </span>
          </p>
        </div>

        <ReactMarkdown
          className={`${styles.post} w-[60%] z-10`}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
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
