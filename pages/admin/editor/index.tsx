import React from "react";
import { prisma } from "@/db";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import { HiOutlinePlus } from "react-icons/hi";
import "katex/dist/katex.min.css";
import axios from "axios";
import config from "../../../config.json";
import { BlogMetaData } from "@/interfaces";
import { MdPublishedWithChanges } from "react-icons/md";
import { RiGitRepositoryPrivateFill, RiDraftFill } from "react-icons/ri";

import { BlogPost } from "@prisma/client";
import Link from "next/link";

type AdminBlogCardProps = {
  blogMetaData: BlogMetaData;
  currentTime: number;
};
const AdminBlogCard = ({ blogMetaData, currentTime }: AdminBlogCardProps) => {
  const daysNum =
    typeof blogMetaData.updated_at === "number"
      ? Math.floor((currentTime - blogMetaData.updated_at) / (1000 * 3600 * 24))
      : null;

  return (
    <Link href={`/admin/editor/${blogMetaData.id}`}>
      <a className="flex flex-col rounded-md border-2 border-[#909090] ease-in-out duration-300 overflow-hidden group">
        <div
          id="thumbnail-container"
          className="z-50 w-[12rem] h-[14rem] justify-center items-center overflow-hidden p-3 hover:p-[0.7rem] bg-[#1f1f1f] ease-in-out duration-300"
        >
          <img
            src={`https://${config.S3_THUMBNAIL_BUCKET_ENDPOINT}/${blogMetaData.id}.png`}
            alt={`Thumbnail of ${blogMetaData.title}`}
            className="object-cover w-full grayscale-[0.7] group-hover:grayscale-0 opacity-40 group-hover:opacity-100 ease-in-out duration-300"
          />
        </div>
        <div className="w-full h-[5rem] bg-[#2b2b2b] group-hover:bg-[#2d2d2d] pt-2 border-t-[1px] border-[#ffffff]">
          <h1 className="text-md font-medium text-[#93a6d5] pl-3 ease-in-out duration-300">
            {blogMetaData.title.length >= 19
              ? blogMetaData.title.slice(0, 19) + "..."
              : blogMetaData.title}
          </h1>
          <div id="icon-day-counts-container" className="flex gap-1 pl-3">
            {blogMetaData.type === "PUBLISHED" && (
              <p className="text-lg flex justify-center items-center text-[#cfcfcf]">
                <MdPublishedWithChanges />
              </p>
            )}
            {blogMetaData.type === "PRIVATE" && (
              <p className="text-lg flex justify-center items-center text-[#cfcfcf]">
                <RiGitRepositoryPrivateFill />
              </p>
            )}
            {blogMetaData.type === "DRAFT" && (
              <p className="text-lg flex justify-center items-center text-[#cfcfcf]">
                <RiDraftFill />
              </p>
            )}
            {daysNum !== null ? (
              daysNum == 0 ? (
                <p className="text-sm text-[#aaaaaa]">edited today</p>
              ) : (
                <p className="text-sm text-[#aaaaaa]">{daysNum} days ago</p>
              )
            ) : (
              void 0
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

const CreateNewBlogCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="z-50 w-[9rem] h-[12rem] border-2 shadow-sm ease-in-out duration-150
              hover:shadow-[#373e4f] hover:border-[#b7b7b7] hover:bg-[#1f2943] bg-[#25272e] border-[#d5d5d5] rounded-md flex 
                justify-center items-center group"
        onClick={async () => {
          const newBlog = await axios.post("/api/blog/create");
          console.log(newBlog);
          window.location.href = `/admin/editor/${newBlog.data.body.id}`;
        }}
      >
        <h1 className="text-3xl font-bold group-hover:text-4xl group-hover:text-[#fff] text-[#a0b7f2] ease-in-out duration-150">
          <HiOutlinePlus style={{ strokeWidth: "3" }} />
        </h1>
      </button>
      <h1 className="text-xl ml-1">Blank</h1>
    </div>
  );
};

type props = {
  metaDataArray: Array<BlogMetaData>;
  currentTime: number;
};
const AdminEditor = ({ metaDataArray, currentTime }: props) => {
  return (
    <>
      <Head>
        <title>Admin Editor</title>
      </Head>
      <section className="mt-10 min-h-screen z-50 flex flex-col justify-start items-center">
        <div
          className="flex flex-col items-center justify-center
                    gap-10 z-50 h-full"
        >
          <div className="flex flex-row flex-wrap gap-20 w-[65%] z-50">
            <CreateNewBlogCard />
          </div>
          <div className="flex flex-row flex-wrap gap-20 w-[65%] z-50">
            {metaDataArray.map((data, index) => (
              <AdminBlogCard
                blogMetaData={data}
                key={index}
                currentTime={currentTime}
              />
            ))}
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

  const posts = await prisma.blogPost.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  const metaDataArray: Array<BlogMetaData> = posts.map((data: BlogPost) => ({
    id: data.id,
    title: data.title,
    cover: data.cover,
    description: data.description,
    published_at: data.publishedAt.getTime(),
    updated_at: data.updatedAt.getTime(),
    author: "Nathan Luong",
    guest: "None",
    read_time: data.readTime,
    views: data.views,
    file_name: data.url,
    featured: data.featured,
    type: data.type,
  }));

  return {
    props: {
      metaDataArray,
      currentTime: new Date().getTime(),
    },
  };
}

export default AdminEditor;
