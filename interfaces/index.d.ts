export type User = {
  id: number;
  email: string;
  dateCreated: string;
  dateUpdated: string;
};

export type LinkCardProps = {
  icon: React.ReactNode | null;
  title: JSX.Element | null;
  link: string;
};

export type FileTreeElement =
  | FileTreeFolder
  | FileTreeFile
  | FileTreeNewFile
  | FileTreeNewFolder;

export type FileTreeFile = {
  type?: "file";
  name: string;
  url: string;
  reloadTreeData: () => void;
};

export type FileTreeFolder = {
  type?: "folder";
  name: string;
  url: string;
  FileTreeChildren: FileTreeElement[] | null;
  isParentOpen?: boolean;
  reloadTreeData: () => void;
};

export type FileTree = {
  displayName: string;
  rootFolderName: string;
  publicPrefix: string;
};

export type FileTreeNewFile = {
  type?: "new-file";
};
export type FileTreeNewFolder = {
  type?: "new-folder";
};

export type BlogMetaData = {
  id?: string;
  title: string;
  cover: string;
  description: string;
  published_at?: string | number;
  updated_at?: string | number;
  author?: string;
  guest?: string;
  read_time?: number;
  views?: number;
  file_name: string;
  tags?: Array<Tags>;
  featured: boolean;
  type: "PUBLISHED" | "DRAFT" | "PRIVATE";
};
