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

export type FileTreeElement = FileTreeFolder | FileTreeFile;

export type FileTreeFile = {
  type?: "file";
  name: string;
  url: string;
};

export type FileTreeFolder = {
  type?: "folder";
  name: string;
  url: string;
  FileTreeChildren: FileTreeElement[] | null;
};

export type FileTree = {
  url: string;
  rootFolderName: string;
  FileTreeChildren: FileTreeElement[] | null;
};

export type BlogMetaData = {
  title: string;
  cover: string;
  description: string;
  published_at: string;
  updated_at: string;
  author: string;
  guest: string;
  read_time: number;
  views: number;
  file_name: string;
  tags?: Array<Tags>;
  featured: boolean;
};
