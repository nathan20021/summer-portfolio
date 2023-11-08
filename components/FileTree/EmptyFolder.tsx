import * as React from "react";
import { FcFolder } from "react-icons/fc";

const EmptyFolderCard = () => {
  const [folderName, setFolderName] = React.useState("");
  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div className="flex cursor-pointer select-none group items-center gap-1 pl-2 min-h-[2.5rem]">
        <FcFolder />
        <input
          className="text-lg max-w-[400px] w-full bg-transparent outline-none bg-[#222224]
           py-[0.2rem] rounded-md border-[0.2px] pl-2 focus:border-[#62a1ff] border-[#222224]"
          type="text"
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
        />
      </div>
    </div>
  );
};

export default EmptyFolderCard;
