import React from "react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import AnalyticCard from "@/components/Analytics/AnalyticCard";
import Head from "next/head";
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
  return (
    <section className="min-h-screen z-50 flex flex-col justify-start items-center">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="w-[80%] z-50 flex justify-center items-center">
        <div className="w-full flex justify-around flex-wrap my-11">
          <AnalyticCard stats={subs.length} title="Subcribers" />
          <AnalyticCard stats={blogStats.length} title="Articles" />
          <AnalyticCard stats={totalView} title="Blog Views" />
        </div>
      </div>
      <div className="z-50">
        <div>
          
        </div>
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
    </section>
  );
};
export default DashBoard;
