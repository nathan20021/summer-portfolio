import * as fs from "fs";
import React from "react";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

type metaData = {
  title: string;
  cover: string;
  description: string;
  published_at: string;
  author: string;
  guest: string;
  read_time: string;
  views: string;
  file_name: string;
};

type prop = {
  metaDataArray: Array<metaData>;
};

const blogs = ({ metaDataArray }: prop) => {
  return (
    <section className="min-h-screen z-10 flex justify-center">
      <div className="w-[80%] z-10">
        <div className="h-10"></div>
        <div className="w-full h-full flex justify-around">
          {metaDataArray.map((metaData, index) => {
            return (
              <div
                id="blog-container-box"
                key={index}
                className="w-[30%] h-[45%] rounded-md bg-[#282828] shadow-sm shadow-zinc-600
                  flex flex-col justify-around items-center ease-out duration-300 hover:scale-110"
              >
                <Link href={`/blogs/${metaData.file_name}`} key={index}>
                  <a className="w-full h-full flex justify-center items-center">
                    <div id="div-inside-a-tag" className="w-[90%] h-[90%] ">
                      <div id="image-container" className="h-[40%] relative">
                        <Image
                          alt={`Cover Image ${index} : ${metaData.title} `}
                          src={metaData.cover}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <div id="text-container" className="h-[50%] w-full">
                        <h1 className="font-bold text-lg mb-1 text-teal-400">
                          {metaData.title}
                        </h1>
                        <p className="mb-[0.5rem] pb-[0.5rem] border-b-2 text-xs">
                          {metaData.published_at} | {metaData.read_time} read
                        </p>
                        <p className="text-sm">{metaData.description}</p>
                      </div>
                    </div>
                  </a>
                </Link>
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
  const postsName = fs.readdirSync(path.join("md/posts"));

  const metaDataArray: Array<metaData> = [];

  postsName.forEach((value, index) => {
    const parsedMDwithMetaData = fs
      .readFileSync(path.join("md/posts", value, `${value}.md`))
      .toString();
    const parsedMarkdown = matter(parsedMDwithMetaData);

    metaDataArray.push({
      title: parsedMarkdown.data.title,
      cover: parsedMarkdown.data.cover,
      description: parsedMarkdown.data.description,
      published_at: parsedMarkdown.data.published_at,
      author: parsedMarkdown.data.author,
      guest: parsedMarkdown.data.guest,
      read_time: parsedMarkdown.data.read_time,
      views: parsedMarkdown.data.views,
      file_name: parsedMarkdown.data.file_name,
    });
  });

  return {
    // Passed to the page component as props
    props: {
      metaDataArray: metaDataArray,
    },
  };
}
export default blogs;
