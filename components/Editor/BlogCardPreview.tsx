import * as React from "react";
import Image from "next/image";
import { BlogMetaData } from "../../interfaces/index";

const BlogCard = ({ metaData }: { metaData: BlogMetaData }) => {
  return (
    <div
      id="blog-container-box"
      className="group w-full max-w-none min-h-max h-auto rounded-md bg-[#222222] overflow-hidden
                  flex justify-start items-center ease-out duration-500 peer hover:bg-[#262626]"
    >
      <div id="image-container" className="w-2/5 relative">
        <Image
          src={metaData.cover}
          layout="responsive"
          width={740}
          height={493}
          objectFit="cover"
        />
      </div>
      <div
        id="text-container"
        className="my-3 h-full w-full px-4 flex flex-col justify-around gap-2"
      >
        <div className="w-full flex flex-col gap-2 sm:gap-0">
          <p className="pb-0 border-b-[1px] border-none text-xs text-[#c9c9c9]">
            {metaData.published_at} | {metaData.read_time} mins read
          </p>
          <h1
            className="font-bold text-lg text-[#4bd8ed] hover:text-[#51e8ff]
            hover:underline-offset-2 hover:underline group-hover:underline-offset-2 group-hover:underline"
          >
            {metaData.title || "Untitled"}
          </h1>

          <p className="text-sm text-[#c9c9c9]">{metaData.description}</p>
        </div>
        <div
          id="tags-container"
          className=" w-full flex flex-start items-center
                   ease-out duration-500 gap-3 peer-hover:bg-[#262626]"
        >
          {metaData.tags.map((tag, index) => {
            return (
              <div
                className="z-[1000] select-none py-1 px-3 rounded-xl text-xs 
                  ease-out duration-300 bg-[#404040] text-white"
                key={index}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
