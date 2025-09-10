import React from "react";
import Head from "next/head";
import matter from "gray-matter";
import styles from "../../styles/mdBlogs.module.css";
import { BsFillEyeFill } from "react-icons/bs";
import { BlogPost } from "@prisma/client";
import { prisma } from "@/db";

import { ParsedUrlQuery } from "querystring";
import config from "../../config.json";
import { GetStaticPropsContext } from "next";
import "katex/dist/katex.min.css";
import ReactMarkdownWrapper from "@/components/Markdown/ReactMarkdownWrapper";
import axios from "axios";

type prop = {
  content: string;
  metaData: any;
};
interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Post = ({ content, metaData }: prop) => {
  return (
    <div className="bg-primary z-10 w-full flex justify-center items-center">
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        Open Graph tags
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.cover} />
        <meta
          property="og:url"
          content={`https://nathanluong.me/blog/${metaData.url}`}
        />
        <meta property="og:type" content="article" />
        Twitter Card tags
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.cover} />
      </Head>
      <div
        id="Blog Container"
        className="w-[90%] lg:w-[60%] flex flex-col items-center bg-primary z-10"
      >
        <div
          id="metadata-container"
          className="z-10 w-full text-center text-lighttext"
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
        <ReactMarkdownWrapper
          code={content}
          className={`${styles.postDark} ${styles.post} w-full z-10 text-lighttext`}
        />
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
    fallback: "blocking",
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

  if (!metaData || metaData.type !== "PUBLISHED") {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }
  const res = await axios.get(`${process.env.URL}/api/blog/${slug}`, {
    timeout: 5000,
    headers: {
      Accept: "application/json",
    },
  });
  const parsedMarkdown = matter(res.data.data);

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
        updatedAt: metaData?.updatedAt.toLocaleString(config.DATE_TIME_FORMAT, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    },
  };
}

const getParamFromList = (data: Array<BlogPost>) => {
  const result: Array<{ params: { slug: string } }> = [];
  data.forEach((blogPost: BlogPost) => {
    if (!blogPost.url || blogPost.type !== "PUBLISHED") return;
    result.push({
      params: { slug: blogPost.url },
    });
  });
  return result;
};

export default Post;
