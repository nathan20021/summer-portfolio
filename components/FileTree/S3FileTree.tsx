import * as React from "react";
import FolderCard from "./S3Folder";
import { FileTree } from "../../interfaces";

const FileTree = ({ rootFolderName, FileTreeChildren, url }: FileTree) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <div
          className="w-1/2 border-[1px] py-2 flex justify-center mb-2
                        cursor-pointer rounded-lg select-none hover:bg-[#414148]"
        >
          <h1>Add file to root</h1>
        </div>
      </div>
      <FolderCard
        name={rootFolderName}
        FileTreeChildren={FileTreeChildren}
        url={url}
      />
    </div>
  );
};

export default FileTree;
