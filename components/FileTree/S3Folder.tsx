import * as React from "react";
import { useState, useEffect } from "react";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { FileTreeElement, FileTreeFolder } from "../../interfaces";
import FileCard from "./S3File";
import EmptyFolderCard from "./EmptyFolder";
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import EmptyFileCard from "./EmptyFile";

const FolderCard = ({ name, FileTreeChildren, url }: FileTreeFolder) => {
  name = name.replace("/", "");
  const [isOpen, setIsOpen] = useState(true);

  const [fileTreeChildren, setFileTreeChildren] =
    useState<FileTreeElement[]>(FileTreeChildren);

  const [isNewEmptyFolderActive, setIsNewEmptyFolderActive] = useState(false);

  useEffect(() => {
    setFileTreeChildren(FileTreeChildren);
  }, [FileTreeChildren]);

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
            }}
          >
            <AiFillFileAdd />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] 
                        hover:bg-[#ffd062] border-[#ffd062]"
            onClick={(e) => {
              e.stopPropagation();
              if (!isNewEmptyFolderActive) {
                setIsNewEmptyFolderActive(true);
                setFileTreeChildren([
                  {
                    type: "new-folder",
                  },
                  ...fileTreeChildren,
                ]);
              }
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
      {isOpen && fileTreeChildren && (
        <div className="ml-4 border-l-[1px] pl-1 border-[#747474]">
          <>
            {fileTreeChildren.map((fileEle, index) => {
              switch (fileEle.type) {
                case "file":
                  return <FileCard key={index} name={fileEle.name} url={url} />;
                case "folder":
                  return (
                    <FolderCard
                      key={index}
                      name={fileEle.name}
                      FileTreeChildren={fileEle.FileTreeChildren}
                      url={url}
                    />
                  );
                case "new-file":
                  return <EmptyFileCard />;
                case "new-folder":
                  return <EmptyFolderCard />;
                default:
                  return <EmptyFileCard />;
              }
            })}
          </>
        </div>
      )}
    </div>
  );
};

export default FolderCard;
