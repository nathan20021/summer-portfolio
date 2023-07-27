import * as React from "react";
import { useEffect, useState } from "react";
import FileTree from "./S3FileTree";
import axios from "axios";
import { FileTreeElement } from "../../interfaces";

type FileTreeWrapperProps = {
  url: string;
};

const FileTreeWrapper = ({ url }: FileTreeWrapperProps) => {
  const folderName = url.split("/")[url.split("/").length - 2];

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
    console.log(
      `------------| START: ${rootFolderName}  |--------------------------`
    );
    if (!data) return [];
    const parsedData: FileTreeElement[] = data
      .map((i: s3Response) => {
        return {
          ...i,
          Key: i.Key.replace(`${rootFolderName}/`, ""),
        };
      })
      .filter((j: s3Response) => {
        const splitData = j.Key.split("/");
        const thingy =
          splitData.length === 1 ||
          (splitData.length === 2 && splitData[1] === "");
        return j.Key !== "" && thingy;
      })
      .map((item: s3Response) => {
        console.log(
          `------------| ITEM: ${item.Key}   |--------------------------`
        );
        return item.Key.endsWith("/")
          ? {
              type: "folder",
              name: item.Key,
              url: "hahaa", // !TODO
              FileTreeChildren: parseData2(
                data
                  .map((i: s3Response) => {
                    return {
                      ...i,
                      Key: i.Key.replace(`${item.Key}`, ""),
                    };
                  })
                  .filter((j: s3Response) => {
                    const splitData = j.Key.split("/");
                    const thingy =
                      splitData.length === 1 ||
                      (splitData.length === 2 && splitData[1] === "");
                    return j.Key !== "" && thingy;
                  })
                  .filter((s3Item: s3Response) => {
                    console.log(`FILTER KEY: ${s3Item.Key}`);
                    console.log(`FILTER KEY STARTS WITH: ${item.Key}`);
                    return s3Item.Key.startsWith(item.Key);
                  }),
                item.Key
              ),
            }
          : {
              type: "file",
              name: item.Key,
              url: "haha",
            };
      });

    console.log(
      `------------| FINISH: ${rootFolderName}  |--------------------------`
    );
    return parsedData;
  };

  const getData = async () => {
    // const { data } = await axios.get(`/api/s3-blog-folder/${folderName}`, {
    //   headers: {
    //     Accept: "application/json",
    //   },
    // });
    return s3Data;
  };

  useEffect(() => {
    const s3data = getData();

    s3data.then((data) => {
      console.log(parseData2(data, folderName + "/"));
      setData(parseData2(data, folderName));
    });
  }, []);

  return (
    <FileTree url={url} rootFolderName={folderName} FileTreeChildren={data} />
  );
};

const fakeData: FileTreeElement[] = [
  {
    type: "file",
    name: "random.jpg",
    url: "s3://porfolio-blogs/CI-CD-Blog/random.jpg",
  },
  {
    type: "file",
    name: "rocketry-landing.png",
    url: "s3://porfolio-blogs/CI-CD-Blog/rocketry-landing.png",
  },
  {
    type: "file",
    name: "SRED.png",
    url: "s3://porfolio-blogs/CI-CD-Blog/SRED.png",
  },
  {
    type: "folder",
    name: "test-folder",
    url: "s3://porfolio-blogs/CI-CD-Blog/test-folder/",
    FileTreeChildren: [
      {
        type: "file",
        name: "blogDiagram.webp",
        url: "s3://porfolio-blogs/CI-CD-Blog/test-folder/blogDiagram.webp",
      },
      {
        type: "file",
        name: "flight-profile.png",
        url: "s3://porfolio-blogs/CI-CD-Blog/test-folder/flight-profile.png",
      },
      {
        type: "file",
        name: "HBO-Misconfiguration-Detection.jpeg",
        url: "s3://porfolio-blogs/CI-CD-Blog/test-folder/HBO-Misconfiguration-Detection.jpeg",
      },
    ],
  },
];

const s3Data = [
  {
    Key: "CI-CD-Blog/",
    LastModified: "2023-07-15T02:43:19.000Z",
    Size: 0,
  },
  {
    Key: "CI-CD-Blog/SRED.png",
    LastModified: "2023-07-15T02:45:28.000Z",
    Size: 148411,
  },
  {
    Key: "CI-CD-Blog/random.jpg",
    LastModified: "2023-07-15T02:45:28.000Z",
    Size: 1062231,
  },
  {
    Key: "CI-CD-Blog/rocketry-landing.png",
    LastModified: "2023-07-15T02:45:27.000Z",
    Size: 5830810,
  },
  {
    Key: "CI-CD-Blog/test-folder/",
    LastModified: "2023-07-15T02:43:41.000Z",
    Size: 0,
  },
  {
    Key: "CI-CD-Blog/test-folder/HBO-Misconfiguration-Detection.jpeg",
    LastModified: "2023-07-15T02:45:47.000Z",
    Size: 229481,
  },
  {
    Key: "CI-CD-Blog/test-folder/blogDiagram.webp",
    LastModified: "2023-07-15T02:45:46.000Z",
    Size: 28998,
  },
  {
    Key: "CI-CD-Blog/test-folder/flight-profile.png",
    LastModified: "2023-07-15T02:45:46.000Z",
    Size: 847880,
  },
  {
    Key: "CI-CD-Blog/test-folder/inside-test/",
    LastModified: "2023-07-16T18:17:52.000Z",
    Size: 0,
  },
  {
    Key: "CI-CD-Blog/test-folder/inside-test/Pasted image 20230628161235.png",
    LastModified: "2023-07-16T18:18:06.000Z",
    Size: 663235,
  },
  {
    Key: "CI-CD-Blog/test-folder/inside-test/Pasted image 20230628161438.png",
    LastModified: "2023-07-16T18:18:07.000Z",
    Size: 1280191,
  },
];

export default FileTreeWrapper;
