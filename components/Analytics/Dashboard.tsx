import React, { useEffect, useState } from "react";
import axios from "axios";
import AnalyticCard from "./AnalyticCard";

type SubSerialized = {
  id: string;
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

const DashBoard = () => {
  const [subs, setSubs] = useState<Array<SubSerialized>>([]);
  const [blogStats, setBlogStats] = useState<Array<BlogStats>>([]);
  const [totalView, setTotalView] = useState<number>(0);

  const blogsPublishedLastMonth: Array<BlogStats> = blogStats.filter((val) => {
    const publishedAtDate = new Date(val.publishedAt);
    const now = new Date();
    // return true if the blog was published anytime from start of last month till now
    return (
      publishedAtDate.getMonth() >= now.getMonth() - 1 &&
      publishedAtDate.getFullYear() === now.getFullYear()
    );
  });

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

  const BlogViewsTable = (
    <div className="z-50 h-full w-full flex justify-center items-start">
      <table className="analytic-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody className="gap-3">
          {blogStats.map((val, index) => (
            <tr key={index}>
              <td className="text-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`/admin/editor/${val.id}`}
                >
                  {val.id}
                </a>
              </td>
              <td>
                <a target="_blank" rel="noreferrer" href={`/blogs/${val.url}`}>
                  /{val.url}
                </a>
              </td>
              <td>{val.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GenericBlogTablePopUp = ({ blogData }: { blogData: BlogStats[] }) => {
    return (
      <div className="z-50 h-full w-full flex justify-center items-start">
        <table className="analytic-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Publish At</th>
            </tr>
          </thead>
          <tbody className="gap-3">
            {blogData.map((val, index) => (
              <tr key={index}>
                <td className="text-center">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`/admin/editor/${val.id}`}
                  >
                    {val.id}
                  </a>
                </td>
                <td>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`/blogs/${val.url}`}
                  >
                    /{val.url}
                  </a>
                </td>
                <td>{_ISOToReadable(val.publishedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="w-full z-50 flex flex-col justify-start items-center">
      <div className="w-[90%] md:w-full z-50 flex justify-center items-center">
        <div className="w-full flex justify-between flex-wrap my-11">
          <AnalyticCard
            title="Subscribers"
            stats={subs.length}
            popUpComponent={userTablePopUp}
          />
          <AnalyticCard
            title="Articles"
            stats={blogStats.length}
            popUpComponent={<GenericBlogTablePopUp blogData={blogStats} />}
          />
          <AnalyticCard
            title="Blog Views"
            stats={totalView}
            popUpComponent={BlogViewsTable}
          />
          <AnalyticCard
            title="Since last month"
            stats={blogsPublishedLastMonth.length}
            popUpComponent={
              <GenericBlogTablePopUp blogData={blogsPublishedLastMonth} />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
