import * as React from "react";
import { FcImageFile } from "react-icons/fc";
import { FileTreeFile } from "../../interfaces";
import { MdDelete, MdFileCopy } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import config from "../../config.json";
import axios from "axios";
import { validateImageFileName } from "../../utils/functions";
import { FaEye } from "react-icons/fa";

const FileCard = ({ name, url, reloadTreeData }: FileTreeFile) => {
  const S3_OBJECT_URL = `https://${
    config.S3_BUCKET_ENDPOINT
  }/${encodeURIComponent(url)}`;
  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div
        className="flex justify-between cursor-pointer select-none hover:bg-[#414148]
                  pl-1 min-h-[2.2rem] group items-center"
      >
        <div
          id="icon-and-file-name-container"
          className="flex justify-center items-center truncate gap-1.5"
        >
          <p>
            {validateImageFileName(name) ? <FcImageFile /> : <FiFileText />}
          </p>
          <p className="text-md truncate">{name}</p>
        </div>
        <div
          id="file-actions-container"
          className="hidden group-hover:flex gap-2 h-full pr-1.5 text-sm"
        >
          <p className="text-lg">|</p>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#a3a3a3] border-[#b5b5b5]"
            onClick={() => window.open(S3_OBJECT_URL, "_blank")}
          >
            <FaEye />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#62a1ff] border-[#62a1ff]"
            onClick={() => {
              const markdownText = `![Untitled](${S3_OBJECT_URL})`;
              navigator.clipboard.writeText(markdownText);
            }}
          >
            <MdFileCopy />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#ff7d7d] border-[#ff7d7d]"
            onClick={async () => {
              try {
                await axios.delete(`/api/s3-blog-file/delete-file`, {
                  data: {
                    bucketName: config.S3_BUCKET,
                    fileName: url,
                  },
                });
                reloadTreeData();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
