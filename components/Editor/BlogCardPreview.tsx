import * as React from "react";
import { BlogMetaData } from "../../interfaces/index";
import { BsThreeDots } from "react-icons/bs";
const BlogCard = ({ metaData }: { metaData: BlogMetaData }) => {
  return (
    <div
      id="blog-container-box"
      className="group w-full max-w-none min-h-max h-auto rounded-md bg-[#222222] overflow-hidden
                  flex justify-start items-center ease-out duration-500 peer hover:bg-[#262626]"
    >
      <div id="image-container" className="w-2/5 relative ml-3">
        <img
          className="rounded"
          onError={(e) => (e.currentTarget.src = "/gradient.png")}
          src={metaData.cover || "/gradient.png"}
          width={740}
          height={493}
        />
      </div>
      <div
        id="text-container"
        className="py-2 h-full w-full px-4 flex flex-col justify-around gap-2"
      >
        <div className="w-full flex flex-col gap-2 sm:gap-0">
          <p className="pb-0 border-b-[1px] border-none text-xs text-[#b9b9b9]">
            {metaData.published_at} | {metaData.read_time} mins read
          </p>
          <h1
            className="font-bold text-lg text-[#4bd8ed] hover:text-[#51e8ff] line-clamp-1 overflow-ellipsis
            hover:underline-offset-2 hover:underline group-hover:underline-offset-2 group-hover:underline"
          >
            {metaData.title || "Untitled"}
          </h1>

          <p className="text-sm text-[#b9b9b9] line-clamp-2">
            {metaData.description}
          </p>
        </div>
        <div
          id="tags-container"
          className=" w-full flex flex-start items-center min-h-[24px]
                   ease-out duration-500 gap-3 peer-hover:bg-[#262626]"
        >
          {metaData?.tags && metaData?.tags.length > 0 ? (
            metaData.tags.map((tag, index) => {
              return (
                <div
                  className="z-[1000] select-none py-1 px-3 rounded-xl text-xs 
                  ease-out duration-300 bg-[#404040] text-white"
                  key={index}
                >
                  {tag.name}
                </div>
              );
            })
          ) : (
            <div
              className="z-[1000] select-none py-1 px-3 rounded-xl text-xs 
                  ease-out duration-300 bg-[#404040] text-white"
            >
              <BsThreeDots />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
