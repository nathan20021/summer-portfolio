import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FileTreeElement } from "../../interfaces";
import { recursiveFile } from "../../interfaces/backend";
import FolderCard from "./S3Folder";
import { FileTree as FileTreeProps } from "../../interfaces";

const FileTree = ({ rootFolderName }: FileTreeProps) => {
  const [data, setData] = useState<FileTreeElement[]>([]);

  const getData = async () => {
    const { data }: { data: recursiveFile[] | null } = await axios.get(
      `/api/s3-blog-folder?folderName=${rootFolderName}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  };

  const parseData = (
    data: recursiveFile[] | null,
    currentUrl: string = rootFolderName
  ): FileTreeElement[] | null => {
    if (data === null) return null;

    return data.map((recFile: recursiveFile) => {
      if (recFile.itemType == "file") {
        return {
          type: "file",
          name: recFile.key,
          url: `${currentUrl}/${recFile.key}`,
          reloadTreeData: loadTreeData,
        };
      }
      return {
        type: "folder",
        name: recFile.key,
        url: `${currentUrl}/${recFile.key}`,
        FileTreeChildren: parseData(
          recFile.children,
          `${currentUrl}/${recFile.key}`
        ),
        reloadTreeData: loadTreeData,
      };
    });
  };

  const loadTreeData = () => {
    const s3data = getData();

    s3data.then((data) => {
      console.log(data);
      setData(data[0] ? parseData(data[0].children) : []);
    });
  };
  useEffect(() => {
    loadTreeData();
  }, []);

  return (
    <div className="w-full">
      <div id="file-tree-bar-container" className="w-full flex gap-3">
        <div
          className="w-1/2 border-[1px] py-2 flex justify-center mb-2 text-sm
                        cursor-pointer rounded-lg select-none hover:bg-[#414148]"
        >
          <button onClick={() => loadTreeData()}>Reload</button>
        </div>
        <div
          className="w-1/2 border-[1px] py-2 flex justify-center mb-2 text-sm
                        cursor-pointer rounded-lg select-none hover:bg-[#414148]"
        >
          <button onClick={() => console.log(data)}>Collapse</button>
        </div>
      </div>
      <FolderCard
        name={rootFolderName}
        FileTreeChildren={data}
        url={rootFolderName}
        isParentOpen={true}
        reloadTreeData={loadTreeData}
      />
    </div>
  );
};

export default FileTree;
