import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
import FileTreeWrapper from "../../components/FileTree/FileTreeWrapper";

const TesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <section className="min-h-screen z-50 flex flex-col justify-start items-center">
        <div className="z-50 h-full w-1/2">
          <FileTreeWrapper rootFolderName="CI-CD-Blog" />
        </div>
      </section>
    </>
  );
};

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default TesPage;
