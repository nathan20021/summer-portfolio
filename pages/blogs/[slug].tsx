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
import { BlogPost } from "@prisma/client";
import { prisma } from "@/db";
import { ParsedUrlQuery } from "querystring";
import config from "../../config.json";
type prop = {
  content: string;
  metaData: any;
};
interface IParams extends ParsedUrlQuery {
  slug: string;
}

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
    <div className="z-10 w-full flex justify-center items-center">
      <Head>
        <title>{metaData.title}</title>
      </Head>
      <div
        id="Blog Container"
        className="w-[90%] lg:w-[60%] flex flex-col items-center bg-primary z-10"
      >
        <div id="metadata-container" className="z-10 w-full text-center">
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
          className={`${styles.post} w-full z-10`}
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
  const files = await prisma.blogPost.findMany();
  return {
    paths: getParamFromList(files),
    fallback: false,
  };
}

// Fetch the data
// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context: any) {
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
