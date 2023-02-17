import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import ParticleBg from "../../components/particleBg";
import { prisma } from "@/db";
import { Tags } from "@prisma/client";
import { useState, useCallback } from "react";

export type metaData = {
  title: string;
  cover: string;
  description: string;
  published_at: string;
  author: string;
  guest: string;
  read_time: number;
  views: number;
  file_name: string;
  tags: Array<Tags>;
};

type prop = {
  metaDataArray: Array<metaData>;
  tags: Array<Tags>;
  tagsMetaData: Array<number>;
};

const blogs = ({ metaDataArray, tags, tagsMetaData }: prop) => {
  const [metaData, setMetaData] = useState<Array<metaData>>(metaDataArray);
  const [currentFilterId, setCurrentFilterId] = useState<number>(-1);

  const filterMetaData = useCallback((id: number) => {
    setMetaData(
      metaDataArray.filter((post) => {
        const temp = post.tags.map((_val) => _val.id);
        return temp.includes(id);
      })
    );
  }, []);
  return (
    <section className="min-h-screen z-10 flex flex-col lg:flex-row lg:items-center justify-center bg-[#111111]">
      <div>
        <ParticleBg />
      </div>
      <aside className="hidden w-full lg:w-[15%] z-10 bg-red my-[20vh] lg:flex flex-col justify-start items-end">
        <ul className="w-[80%] flex flex-col gap-2">
          <li
            className="font-bold w-full ease-out duration-300 hover:bg-[#333333] cursor-pointer indent-2 py-1"
            style={{
              color: currentFilterId === -1 ? "#4bd8ed" : "white",
            }}
            onClick={() => {
              setCurrentFilterId(-1);
              setMetaData(metaDataArray);
            }}
          >
            All Tags ({metaDataArray.length})
          </li>
          {tags
            .sort((a, b) =>
              tagsMetaData[a.id - 1] < tagsMetaData[b.id - 1] ? 1 : -1
            )
            .map((val) => {
              return (
                <li
                  key={val.id}
                  style={{
                    color: currentFilterId === val.id ? "#4bd8ed" : "white",
                  }}
                  className="w-full py-1 indent-6 ease-out duration-300 hover:bg-[#333333] cursor-pointer flex items-center"
                  onClick={() => {
                    setCurrentFilterId(val.id);
                    filterMetaData(val.id);
                  }}
                >
                  ({tagsMetaData[val.id - 1]}) {val.name}
                </li>
              );
            })}
        </ul>
      </aside>
      <div className="lg:w-[85%] w-full z-10 my-[10vh]">
        {/* <div className="h-[10vh] min-h-[7rem] flex justify-center items-center"></div> */}
        <div className="w-full h-full flex flex-wrap gap-3 justify-around">
          {metaData.map((metaData, index) => {
            return (
              <div
                id="blog-container-box"
                key={index}
                className="w-[28%] min-w-[300px] max-w-[351px] h-[40vh] min-h-[500px] rounded-md bg-[#222222] overflow-hidden
                  flex flex-col justify-start items-center"
              >
                <Link href={`/blogs/${metaData.file_name}`} key={index}>
                  <a className="w-full h-full flex justify-center items-start ease-out duration-1000 peer hover:bg-[#323232]">
                    <div id="div-inside-link-tag" className="w-full">
                      <div id="image-container" className="w-full relative">
                        <Image
                          alt={`Cover Image ${index} : ${metaData.title} `}
                          src={metaData.cover}
                          layout="responsive"
                          width={740}
                          height={493}
                          objectFit="cover"
                        />
                      </div>
                      <div
                        id="text-container"
                        className="h-[55%] w-full px-4 flex flex-col gap-2"
                      >
                        <p className="mb-[0.5rem] py-[0.5rem] border-b-[1px] border-[#696969] text-xs text-[#ffffff]">
                          {metaData.published_at} | {metaData.read_time} mins
                          read
                        </p>
                        <h1 className="font-bold text-lg mb-1 text-[#4bd8ed]">
                          {metaData.title}
                        </h1>
                        <p className="text-base md:text-sm text-[#c9c9c9]">
                          {metaData.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
                <div
                  id="tags-container"
                  className="w-full px-4 h-[18%] flex flex-start items-center
                   ease-out duration-1000 gap-6 peer-hover:bg-[#323232]"
                >
                  {metaData.tags.map((tag, index) => {
                    return (
                      <button
                        onClick={() => {
                          setCurrentFilterId(tag.id);
                          filterMetaData(tag.id);
                        }}
                        className="z-[1000] select-none py-1 px-3 rounded-xl text-xs
                         ease-out duration-300 bg-[#404040]"
                        key={index}
                        style={{
                          color:
                            tag.id === currentFilterId ? "#4bd8ed" : "white",
                        }}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  const posts = await prisma.blogPost.findMany({
    include: {
      tags: true,
    },
  });

  const tags = await prisma.tags.findMany();

  const tagsMetaData = Array(tags.length).fill(0);

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsMetaData[tag.id - 1] += 1;
    });
  });

  const metaDataArray: Array<metaData> = [];

  posts.forEach((data, ind) => {
    metaDataArray.push({
      title: data.title,
      cover: data.cover,
      description: data.description,
      published_at: data.publishedAt.toLocaleDateString("en-US"),
      author: "Nathan Luong",
      guest: "None",
      read_time: data.readTime,
      views: data.views,
      file_name: data.url,
      tags: data.tags,
    });
  });

  return {
    props: {
      metaDataArray: metaDataArray,
      tags: tags,
      tagsMetaData: tagsMetaData,
    },
  };
}

export default blogs;
