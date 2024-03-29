import React from "react";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import AnalyticCard from "@/components/Analytics/AnalyticCard";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
// import Image from "next/img"
type SubSerialized = {
  id: number;
  email: string;
  subbedAt: string;
};

type BlogStats = {
  id: number;
  url: string;
  publishedAt: string;
  views: number;
};

const _ISOToReadable = (iso: string) => {
  return iso.split("T")[0];
};

const DashBoard: NextPage = () => {
  const [subs, setSubs] = useState<Array<SubSerialized>>([]);
  const [blogStats, setBlogStats] = useState<Array<BlogStats>>([]);
  const [totalView, setTotalView] = useState<number>(0);
  
  useEffect(() => {
    const fectchUserData = async () => {
      const { data } = await axios.get("/api/users", {
        headers: {
          Accept: "application/json",
        },
      });
      setSubs(data.data);
    };
    const fetchBlogsData = async () => {
      const { data } = await axios.get("/api/blogStats", {
        headers: {
          Accept: "application/json",
        },
      });
      setBlogStats(data.data.stats);
      setTotalView(data.data.totalViews);
    };
    fectchUserData();
    fetchBlogsData();
  }, []);

  const userTablePopUp = (
    <div className="z-50 h-full w-full flex justify-center items-start relative">
      <table className="analytic-table text-lg">
        <thead>
          <tr>
            <th>UID</th>
            <th>Email</th>
            <th>Sub Date</th>
          </tr>
        </thead>
        <tbody className="gap-3">
          {subs.map((val, index) => (
            <tr key={index}>
              <td className="text-center">{val.id}</td>
              <td>{val.email}</td>
              <td>{_ISOToReadable(val.subbedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const BlogTablePopUp = (
    <div className="z-50 h-full w-full flex justify-center items-start">
      <table className="analytic-table">
        <thead>
          <tr>
            <th>Blog Name</th>
            <th>Blog URL</th>
            <th>Publish At</th>
          </tr>
        </thead>
        <tbody className="gap-3">
          {blogStats.map((val, index) => (
            <tr key={index}>
              <td className="text-center">{val.id}</td>
              <td>/{val.url}</td>
              <td>{_ISOToReadable(val.publishedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const BlogViewsTable = (
    <div className="z-50 h-full w-full flex justify-center items-start">
      <table className="analytic-table">
        <thead>
          <tr>
            <th>Blog Name</th>
            <th>Blog URL</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody className="gap-3">
          {blogStats.map((val, index) => (
            <tr key={index}>
              <td className="text-center">{val.id}</td>
              <td>/{val.url}</td>
              <td>{val.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <section className="min-h-screen z-50 flex flex-col justify-start items-center">
        <div className="z-50 w-full text-center text-3xl">
          <h1 className="font-bold my-6 text-white">Admin Dashboard</h1>
        </div>
        <div className="w-[80%] z-50 flex justify-center items-center">
          <div className="w-full flex justify-around flex-wrap my-11">
            <AnalyticCard
              title="Subcribers"
              stats={subs.length}
              popUpComponent={userTablePopUp}
            />
            <AnalyticCard
              title="Articles"
              stats={blogStats.length}
              popUpComponent={BlogTablePopUp}
            />
            <AnalyticCard
              title="Blog Views"
              stats={totalView}
              popUpComponent={BlogViewsTable}
            />
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
export default DashBoard;
