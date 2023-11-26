import * as React from "react";
import { FcFolder } from "react-icons/fc";
import axios from "axios";
import config from "../../config.json";
type EmptyFolderCardProps = {
  url: string;
  removeNewFolder: () => void;
  setIsNewEmptyFolderActive: React.Dispatch<boolean>;
  reloadTreeData: () => void;
};
const EmptyFolderCard = ({
  url,
  removeNewFolder,
  setIsNewEmptyFolderActive,
  reloadTreeData,
}: EmptyFolderCardProps) => {
  const [folderName, setFolderName] = React.useState("");
  return (
    <div className="flex flex-col cursor-pointer select-none">
      <div className="flex cursor-pointer select-none group items-center gap-1 pl-2 min-h-[2.5rem]">
        <FcFolder />
        <input
          className="text-sm max-w-[400px] w-full bg-transparent outline-none bg-[#222224]
           py-[0.2rem] rounded-sm border-[0.2px] pl-2 focus:border-[#62a1ff] border-[#222224]"
          type="text"
          autoFocus={true}
          onChange={(e) => {
            if (e.target.value.includes("/") || e.target.value.includes(".."))
              return;
            setFolderName(e.target.value);
          }}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              const newFolderURL = `${url}/${folderName}`;
              await axios.post("/api/s3-blog-folder/create-empty-folder", {
                bucketName: config.S3_BUCKET,
                folderName: newFolderURL,
              });
              reloadTreeData();
              removeNewFolder();
              setIsNewEmptyFolderActive(false);
            }
          }}
          onBlur={() => {
            setIsNewEmptyFolderActive(false);
            removeNewFolder();
          }}
          value={folderName}
        />
      </div>
    </div>
  );
};

export default EmptyFolderCard;
