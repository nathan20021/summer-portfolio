import React, { ReactNode } from "react";
import { prisma } from "@/db";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import { BsFolderPlus } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import "katex/dist/katex.min.css";
import axios from "axios";
import config from "../../../config.json";
import { BlogMetaData } from "@/interfaces";
import { BlogPost } from "@prisma/client";

type InitialScreenButtonsProps = {
  name: string;
  icon: ReactNode;
  onClickFunc: React.MouseEventHandler;
};

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

type AdminBlogCardProps = {
  blogMetaData: BlogMetaData;
};
const AdminBlogCard = ({ blogMetaData }: AdminBlogCardProps) => {
  return (
    <div className="z-50">
      <h1>{blogMetaData.title}</h1>
    </div>
  );
};

const createNewBlogAndRedirect = async () => {
  const newBlog = await axios.post("/api/blog/create");
  console.log(newBlog);
  window.location.href = `/admin/editor/${newBlog.data.body.id}`;
};

type props = {
  metaDataArray: Array<BlogMetaData>;
};
const AdminEditor = ({ metaDataArray }: props) => {
  return (
    <>
      <Head>
        <title>Admin Editor</title>
      </Head>
      <section className="mt-10 min-h-screen z-50 flex flex-col justify-start items-center">
        <div
          className="flex flex-col items-center justify-center
                    gap-3 w-1/2 z-50 h-full"
        >
          <div className="flex flex-col gap-6 w-1/2 z-50">
            <InitialScreenButtons
              name="Create New Blog"
              icon={<BsFolderPlus />}
              onClickFunc={createNewBlogAndRedirect}
            />
            <InitialScreenButtons
              name="Edit Blogs"
              icon={<MdEditNote />}
              onClickFunc={() => {}}
            />
            <InitialScreenButtons
              name="Edit Draft"
              icon={<RiDraftLine />}
              onClickFunc={() => {}}
            />
          </div>
        </div>
        <div className="w-full">
          {metaDataArray.map((data, index) => (
            <AdminBlogCard blogMetaData={data} key={index} />
          ))}
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
    title: data.title,
    cover: data.cover,
    description: data.description,
    published_at: data.publishedAt.toLocaleDateString(config.DATE_TIME_FORMAT, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    updated_at: data.updatedAt.toLocaleDateString(config.DATE_TIME_FORMAT, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: "Nathan Luong",
    guest: "None",
    read_time: data.readTime,
    views: data.views,
    file_name: data.url,
    featured: data.featured,
  }));

  return {
    props: {
      metaDataArray,
    },
  };
}

export default AdminEditor;
