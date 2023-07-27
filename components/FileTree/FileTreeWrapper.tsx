import * as React from "react";
import { useEffect, useState } from "react";
import FileTree from "./S3FileTree";
import axios from "axios";
import { FileTreeElement } from "../../interfaces";

type FileTreeWrapperProps = {
  rootFolderName: string;
};

const FileTreeWrapper = ({ rootFolderName }: FileTreeWrapperProps) => {
  const folderName = rootFolderName + "/";
  const [data, setData] = useState<FileTreeElement[]>([]);

  type s3Response = {
    Key: string;
    LastModified: string;
    Size: number;
  };

  const parseData2 = (
    data: s3Response[] | null,
    rootFolderName: string
  ): FileTreeElement[] => {
    if (!data) return [];
    const parsedData: FileTreeElement[] = data
      .filter((a: s3Response) => {
        // Filter out the files/folder that are not inside the root folder
        return a.Key.startsWith(rootFolderName);
      })
      .map((i: s3Response) => {
        return {
          ...i,
          Key: i.Key.replace(`${rootFolderName}`, ""),
        };
      })
      .filter((j: s3Response) => {
        // Only return the files/folder name inside the root folder
        const splitData = j.Key.split("/");
        const thingy =
          splitData.length === 1 ||
          (splitData.length === 2 && splitData[1] === "");
        return j.Key !== "" && thingy;
      })
      .map((item: s3Response) => {
        return item.Key.endsWith("/")
          ? {
              type: "folder",
              name: item.Key,
              url: "hahaa", // !TODO
              FileTreeChildren: parseData2(
                data,
                `${rootFolderName}${item.Key}`
              ),
            }
          : {
              type: "file",
              name: item.Key,
              url: "haha",
            };
      });
    return parsedData;
  };

  const getData = async () => {
    const { data } = await axios.get(`/api/s3-blog-folder/${rootFolderName}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  };

  useEffect(() => {
    const s3data = getData();

    s3data.then((data) => {
      setData(parseData2(data, folderName));
    });
  }, []);

  return (
    <FileTree
      url={folderName}
      rootFolderName={folderName}
      FileTreeChildren={data}
    />
  );
};

export default FileTreeWrapper;
