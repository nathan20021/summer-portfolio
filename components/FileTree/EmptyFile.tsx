import * as React from "react";
import { FcImageFile } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";
import { validateImageFileName } from "../../utils/functions";

const EmptyFileCard = () => {
  const [fileName, setFileName] = React.useState("");
  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div className="flex cursor-pointer select-none hover:bg-[#414148] group items-center gap-3 pl-2 min-h-[2.5rem]">
        {validateImageFileName(fileName) ? <FcImageFile /> : <FiFileText />}
        <input
          className="text-lg w-full bg-transparent outline-none"
          type="text"
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
        />
      </div>
    </div>
  );
};

export default EmptyFileCard;
