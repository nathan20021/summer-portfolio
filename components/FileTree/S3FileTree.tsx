import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FileTreeElement } from "../../interfaces";
import { recursiveFile } from "../../interfaces/backend";
import FolderCard from "./S3Folder";
import { FileTree as FileTreeProps } from "../../interfaces";
import FileDropZone from "./DragDropFileSelector";

const FileTree = ({
  rootFolderName,
  displayName,
  publicPrefix,
}: FileTreeProps) => {
  const [data, setData] = useState<FileTreeElement[]>([]);

  const parseData = (
    data: recursiveFile[] | null | undefined,
    currentUrl: string = `${publicPrefix}/${rootFolderName}`
  ): FileTreeElement[] | null => {
    if (!data) return null;

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
    const getData = async () => {
      const { data }: { data: recursiveFile[] | null } = await axios.get(
        `/api/s3-blog-folder?folderName=${rootFolderName}&publicPrefix=${publicPrefix}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      return data;
    };
    const s3data = getData();

    s3data.then((data) => {
      if (!data) {
        setData([]);
        return;
      }
      const parsedData = data[0] ? parseData(data[0].children) : [];
      setData(parsedData || []);
    });
  };

  useEffect(() => {
    loadTreeData();
  }, []);

  return (
    <div className="flex flex-col w-full pt-5">
      <FolderCard
        isRoot={true}
        name={displayName}
        FileTreeChildren={data}
        url={`${publicPrefix}/${rootFolderName}`}
        isParentOpen={true}
        reloadTreeData={loadTreeData}
      />
      <div
        className="h-12 w-full relative flex justify-center items-center  
                  after:border-[#787878] after:w-full after:absolute 
                    after:top-1/2 after:border-b-2 after:content-['']"
      >
        <h1 className="bg-[#161616] z-[101] inline-block px-2 text-[#ffffff]">
          Bulk Upload
        </h1>
      </div>
      <div className="px-[4%]">
        <FileDropZone
          url={`${publicPrefix}/${rootFolderName}`}
          reloadTreeData={loadTreeData}
        />
      </div>
    </div>
  );
};

export default FileTree;
