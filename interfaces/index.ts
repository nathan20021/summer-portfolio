export type User = {
  id: number;
  email: string;
  dateCreated: string;
  dateUpdated: string;
};

export type LinkCardProps = {
  icon: React.ReactNode | null;
  title: string;
  link: string;
};
