export type s3Element = {
  Key: string | undefined;
  LastModified: Date | string | undefined;
  Size: number | undefined;
};

export type itemType = "file" | "folder";

export type recursiveFile = {
  key: string;
  itemType: itemType;
  lastModified?: Date | string | undefined;
  size?: number | undefined;
  children?: recursiveFile[];
};
