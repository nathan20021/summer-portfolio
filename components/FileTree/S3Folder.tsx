import * as React from "react";
import { useState } from "react";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { FileTreeFolder } from "../../interfaces";
import FileCard from "./S3File";
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const FolderCard = ({ name, FileTreeChildren, url }: FileTreeFolder) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div
        className="flex cursor-pointer select-none hover:bg-[#414148] items-center gap-3 pl-2 group min-h-[2.5rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? <FcFolder /> : <FcOpenedFolder />}
        <p className="text-lg">{name}</p>
        <div
          id="file-actions-container"
          className="hidden group-hover:flex gap-3 h-full"
        >
          <p>|</p>
          <button
            className="text-white border-[1px] rounded-md p-[.3rem] 
                        hover:bg-[#62a1ff] border-[#62a1ff]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add File");
            }}
          >
            <AiFillFileAdd />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] 
                        hover:bg-[#ffd062] border-[#ffd062]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add Folder");
            }}
          >
            <AiFillFolderAdd />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#ff7d7d] border-[#ff7d7d]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add Folder");
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      {isOpen && FileTreeChildren && (
        <div className="ml-4 border-l-[1px] pl-1">
          <>
            {FileTreeChildren.map((fileEle, index) => {
              return fileEle.type === "folder" ? (
                <FolderCard
                  key={index}
                  url={fileEle.url}
                  name={fileEle.name}
                  FileTreeChildren={fileEle.FileTreeChildren}
                />
              ) : (
                <FileCard key={index} name={fileEle.name} url={fileEle.url} />
              );
            })}
          </>
        </div>
      )}
    </div>
  );
};

export default FolderCard;
