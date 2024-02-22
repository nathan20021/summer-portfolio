import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";

const TestPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <section className="min-h-screen z-50 flex flex-col justify-start items-center">
        <div className="h-full w-full z-50">
          <div className="z-50 h-full w-1/5 min-w-[400px]">
            {/* <FileTree rootFolderName="CI-CD-Blog" displayName="CI-CD-Blog" /> */}
          </div>
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

export default TestPage;
