import React, { useState } from "react";
import { validateImageFileName } from "../../utils/functions";
import { FcImageFile } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";

import config from "../../config.json";
import axios from "axios";

type FileDropZoneProps = {
  reloadTreeData: () => void;
  url: string;
};

const FileDropZone = ({ reloadTreeData, url }: FileDropZoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const removeFileFromList = (fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== fileName)
    );
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prevFiles) => [
      ...prevFiles.filter(
        (prevFile) => !droppedFiles.some((file) => file.name === prevFile.name)
      ),
      ...droppedFiles,
    ]);
  };

  const uploadFile = async (file: File) => {
    if (!file) return;
    const uri = `${url}/${encodeURI(file.name)}`;
    const presignedURL = await axios.get(
      `/api/s3-blog-file/presigned-url?bucketName=${config.S3_BUCKET}&fileName=${uri}`
    );
    await axios.put(presignedURL.data.s3Response, file, {
      headers: {
        "Content-Type": file.type,
        "Allow-Cross-Origin-Access": "*",
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDraggedOver(true);
        }}
        onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDraggedOver(false);
        }}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
          handleDrop(e);
          setIsDraggedOver(false);
        }}
        className={
          isDraggedOver
            ? "flex justify-center items-center border-[1px] border-dashed w-full bg-[#54a4ff] h-20 rounded border-white bg-opacity-20 text-grey-100"
            : "flex justify-center items-center border-[1px] border-dashed w-full bg-black h-20 rounded border-grey-700 bg-opacity-40 text-grey-400 cursor-not-allowed select-none"
        }
      >
        <p>Drag and drop images</p>
      </div>
      <div id="staging-files">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex justify-between cursor-pointer select-none 
            hover:bg-[#414148] min-h-[2.2rem] group items-center"
          >
            <div
              id="icon-and-file-name-container"
              className="flex items-center truncate gap-1.5"
            >
              <p>
                {validateImageFileName(file.name) ? (
                  <FcImageFile className="grayscale-[80%]" />
                ) : (
                  <FiFileText />
                )}
              </p>
              <p className="text-md truncate">{file.name}</p>
            </div>
            <div
              id="file-actions-container"
              className="hidden group-hover:flex gap-2 h-full pr-1.5 text-sm"
            >
              <p className="text-lg">|</p>
              <button
                className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#a3a3a3] border-[#b5b5b5]"
                onClick={() => window.open(URL.createObjectURL(file), "_blank")}
              >
                <FaEye />
              </button>
              <button
                className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#62a1ff] border-[#62a1ff]"
                onClick={async () => {
                  await uploadFile(file);
                  reloadTreeData();
                  removeFileFromList(file.name);
                }}
              >
                <IoMdAdd />
              </button>
              <button
                className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#ff7d7d] border-[#ff7d7d]"
                onClick={() => removeFileFromList(file.name)}
              >
                <FaXmark />
              </button>
            </div>
          </div>
        ))}
        {files.length !== 0 && (
          <div className="flex gap-3 justify-end mt-5">
            <button
              className="text-sm px-4 py-1 border-[0.5px] rounded-sm border-grey-600 hover:border-grey-500 hover:bg-grey-900"
              onClick={() => {
                reloadTreeData();
                setFiles([]);
              }}
            >
              Discard All
            </button>
            <button
              className="text-sm px-4 py-1 border-[0.5px] rounded-sm border-[#007bff] bg-[#007bff] hover:bg-[#3793f0] hover:border-[#3793f0]"
              onClick={async () => {
                await Promise.all(files.map((file) => uploadFile(file)));
                reloadTreeData();
                setFiles([]);
              }}
            >
              Upload All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropZone;
