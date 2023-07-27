import * as React from "react";
import { FcImageFile } from "react-icons/fc";
import { FileTreeFile } from "../../interfaces";
import { MdDelete, MdFileCopy } from "react-icons/md";
import { FiFileText } from "react-icons/fi";

const validateImageFileName = (name: string) => {
  return (
    name.endsWith(".jpg") ||
    name.endsWith(".png") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp") ||
    name.endsWith(".gif")
  );
};

const FileCard = ({ name, url }: FileTreeFile) => {
  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div className="flex cursor-pointer select-none hover:bg-[#414148] group items-center gap-3 pl-2 min-h-[2.5rem]">
        {validateImageFileName(name) ? <FcImageFile /> : <FiFileText />}
        <p className="text-lg">{name}</p>
        <div
          id="file-actions-container"
          className="hidden group-hover:flex gap-3 h-full"
        >
          <p>|</p>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#62a1ff] border-[#62a1ff]"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          >
            <MdFileCopy />
          </button>
          <button
            className="border-[1px] rounded-md p-[.3rem] text-white
                        hover:bg-[#ff7d7d] border-[#ff7d7d]"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
