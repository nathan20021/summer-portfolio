import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogMetaData } from "../../interfaces/index";

type BlogCardProps = {
  metaData: BlogMetaData;
  index: number;
  setCurrentFilterId: React.Dispatch<React.SetStateAction<number>>;
  filterMetaData: (id: number) => void;
  currentFilterId: number;
};
const BlogCard = ({
  metaData,
  index,
  setCurrentFilterId,
  filterMetaData,
  currentFilterId,
}: BlogCardProps) => {
  return (
    <div
      id="blog-container-box"
      key={index}
      className="group my-5 w-[28%] sm:w-[90%] min-w-[300px] max-w-[351px] sm:max-w-none h-[40vh] min-h-[500px] sm:min-h-max sm:h-auto rounded-md bg-[#222222] overflow-hidden
                  flex flex-col sm:flex-row justify-start items-center ease-out duration-500 peer hover:bg-[#262626]"
    >
      <Link href={`/blogs/${metaData.file_name}`} key={index}>
        <a id="image-container" className="w-full sm:w-2/5 relative">
          <Image
            alt={`Cover Image ${index} : ${metaData.title} `}
            src={metaData.cover || "/gradient.png"}
            layout="responsive"
            width={740}
            height={493}
            objectFit="cover"
          />
        </a>
      </Link>
      <div
        id="text-container"
        className="my-0 sm:my-3 h-[55%] sm:h-full w-full px-4 flex flex-col justify-around gap-5"
      >
        <div className="w-full flex flex-col gap-2 sm:gap-0">
          <p className="pb-2 sm:pb-0 border-b-[1px] border-[#696969] sm:border-none text-xs text-white sm:text-[#c9c9c9]">
            {metaData.published_at} | {metaData.read_time} mins read
          </p>
          <h1
            className="font-bold text-lg text-[#4bd8ed] hover:text-[#51e8ff] mb-0 sm:mb-2 
            hover:underline-offset-2 hover:underline group-hover:underline-offset-2 group-hover:underline"
          >
            <Link href={`/blogs/${metaData.file_name}`}>
              <a>{metaData.title}</a>
            </Link>
          </h1>

          <p className="text-base sm:text-sm sm:text-[#c9c9c9] text-white">
            {metaData.description}
          </p>
        </div>
        <div
          id="tags-container"
          className=" z-50 w-full h-[18%] flex flex-start items-center
                   ease-out duration-500 gap-6 peer-hover:bg-[#262626]"
        >
          {metaData?.tags &&
            metaData?.tags.map((tag, index) => {
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
                    color: tag.id === currentFilterId ? "#4bd8ed" : "white",
                  }}
                >
                  {tag.name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
