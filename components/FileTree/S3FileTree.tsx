import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FileTreeElement } from "../../interfaces";
import { recursiveFile } from "../../interfaces/backend";
import FolderCard from "./S3Folder";
import { FileTree as FileTreeProps } from "../../interfaces";

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
    <div className="w-full bg-[#131313] pt-5">
      <FolderCard
        isRoot={true}
        name={displayName}
        FileTreeChildren={data}
        url={`${publicPrefix}/${rootFolderName}`}
        isParentOpen={true}
        reloadTreeData={loadTreeData}
      />
    </div>
  );
};

export default FileTree;
