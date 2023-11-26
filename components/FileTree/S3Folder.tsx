import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { FileTreeElement, FileTreeFolder } from "../../interfaces";
import FileCard from "./S3File";
import EmptyFolderCard from "./EmptyFolder";
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import EmptyFileCard from "./EmptyFile";
import axios from "axios";
import config from "../../config.json";

const FolderCard = ({
  name,
  FileTreeChildren,
  url,
  isParentOpen,
  reloadTreeData,
}: FileTreeFolder) => {
  name = name.replace("/", "");
  const [isOpen, setIsOpen] = useState(true);
  const [isNewEmptyFolderActive, setIsNewEmptyFolderActive] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [fileTreeChildren, setFileTreeChildren] =
    useState<FileTreeElement[]>(FileTreeChildren);

  const removeNewFolder = () => {
    if (fileTreeChildren[0] && fileTreeChildren[0].type === "new-folder") {
      setFileTreeChildren(fileTreeChildren.slice(1));
    }
  };

  useEffect(() => {
    setFileTreeChildren(FileTreeChildren);
  }, [FileTreeChildren]);

  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div
        className="flex justify-between cursor-pointer select-none hover:bg-[#414148] 
                    items-center pl-1 group min-h-[2.2rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          id="icon-and-folder-name-container"
          className="flex justify-center items-center truncate gap-1.5"
        >
          <p>
            {!isOpen ? (
              <FcFolder style={{ opacity: 0.5 }} />
            ) : (
              <FcOpenedFolder />
            )}
          </p>
          <p className="text-md truncate">{name}</p>
        </div>
        <div
          id="folder-actions-container"
          className="hidden group-hover:flex gap-2 h-full pr-1.5 text-sm"
        >
          <p className="text-lg">|</p>

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
            className="text-white border-[1px] rounded-md p-[.3rem] 
                        hover:bg-[#62a1ff] border-[#62a1ff]"
            onClick={async (e) => {
              e.stopPropagation();
              filePickerRef.current?.click();
            }}
          >
            <input
              type="file"
              id="file"
              ref={filePickerRef}
              style={{ display: "none" }}
              onChange={async (e) => {
                const selectedFile = e.target.files[0];
                if (!selectedFile) return;
                console.log(selectedFile);
                const uri = `${url}/${encodeURI(selectedFile.name)}`;
                const presignedURL = await axios.get(
                  `/api/s3-blog-file/presigned-url?bucketName=${config.S3_BUCKET}&fileName=${uri}`
                );
                console.log(presignedURL);
                const s3Upload = await axios.put(
                  presignedURL.data.s3Response,
                  selectedFile,
                  {
                    headers: {
                      "Content-Type": selectedFile.type,
                      "Allow-Cross-Origin-Access": "*",
                    },
                  }
                );
                console.log(s3Upload);
                reloadTreeData();
              }}
            />
            <AiFillFileAdd />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#ff7d7d] border-[#ff7d7d]"
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await axios.delete("/api/s3-blog-folder/delete-empty-folder", {
                  data: {
                    bucketName: config.S3_BUCKET,
                    folderName: url,
                  },
                });
                reloadTreeData();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      {fileTreeChildren && (
        <div
          className="ml-2 border-l-[1px] pl-1 border-[#434343]"
          style={{
            display: isParentOpen && isOpen ? "block" : "none",
          }}
        >
          <>
            {fileTreeChildren.map((fileEle, index) => {
              switch (fileEle.type) {
                case "file":
                  return (
                    <FileCard
                      key={index}
                      name={fileEle.name}
                      url={fileEle.url}
                      reloadTreeData={reloadTreeData}
                    />
                  );
                case "folder":
                  return (
                    <FolderCard
                      key={index}
                      name={fileEle.name}
                      FileTreeChildren={fileEle.FileTreeChildren}
                      url={fileEle.url}
                      isParentOpen={isOpen}
                      reloadTreeData={reloadTreeData}
                    />
                  );
                case "new-file":
                  return <EmptyFileCard key={index} />;
                case "new-folder":
                  return (
                    <EmptyFolderCard
                      key={index}
                      url={url}
                      setIsNewEmptyFolderActive={setIsNewEmptyFolderActive}
                      removeNewFolder={removeNewFolder}
                      reloadTreeData={reloadTreeData}
                    />
                  );
                default:
                  return <EmptyFileCard key={index} />;
              }
            })}
          </>
        </div>
      )}
    </div>
  );
};

export default FolderCard;
