import * as React from "react";
import ParticleBg from "../../components/particleBg";
import BlogCard from "../../components/Blog/BlogCard";
import TagFilterDropdown from "@/components/Blog/BlogTagFilterDropdown";
import Dropdown from "@/components/Blog/DropDown";
import { prisma } from "@/db";
import { Tags } from "@prisma/client";
import { useState, useCallback, useEffect } from "react";
import { BlogMetaData } from "@/interfaces";
import config from "../../config.json";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";

type prop = {
  featuredPostMetaData: BlogMetaData;
  metaDataArray: Array<BlogMetaData>;
  tags: Array<Tags>;
};

type sortOrderType = "Descending" | "Ascending";
type sortFieldType = "Views" | "Date Created" | "Read Time";

const blogs = ({ featuredPostMetaData, metaDataArray, tags }: prop) => {
  const [metaData, setMetaData] = useState<BlogMetaData[]>(metaDataArray);
  const [currentFilterId, setCurrentFilterId] = useState<number>(-1);
  const [isTagDropDownOpen, setIsTagDropDownOpen] = useState<boolean>(false);
  const [isSortFieldDropDownOpen, setIsSortFieldDropDownOpen] =
    useState<boolean>(false);
  const [isSortOrderDropDownOpen, setIsSortOrderDropDownOpen] =
    useState<boolean>(false);

  const [sortOrder, setSortOrder] = useState<sortOrderType>("Descending");
  const [sortField, setSortField] = useState<sortFieldType>("Date Created");

  const tagDropDownPopupRef = useClickOutside(() => {
    setIsTagDropDownOpen(false);
  });
  const sortFieldDropDownPopupRef = useClickOutside(() => {
    setIsSortFieldDropDownOpen(false);
  });
  const sortOrderDropDownPopupRef = useClickOutside(() => {
    setIsSortOrderDropDownOpen(false);
  });

  const filterMetaData = useCallback((id: number) => {
    setMetaData(
      [...metaData].filter((post) => {
        const temp = post.tags.map((_val) => _val.id);
        return temp.includes(id);
      })
    );
  }, []);

  useEffect(() => {
    if (sortField === "Date Created") {
      setMetaData(() =>
        [...metaData].sort((a, b) =>
          sortOrder === "Descending"
            ? new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
            : new Date(a.published_at).getTime() -
              new Date(b.published_at).getTime()
        )
      );
    } else if (sortField === "Views") {
      setMetaData(() =>
        [...metaData].sort((a, b) =>
          sortOrder === "Descending" ? b.views - a.views : a.views - b.views
        )
      );
    } else if (sortField === "Read Time") {
      setMetaData(() =>
        [...metaData].sort((a, b) =>
          sortOrder === "Descending"
            ? b.read_time - a.read_time
            : a.read_time - b.read_time
        )
      );
    }
  }, [sortOrder, sortField]);

  return (
    <section className="min-h-screen z-10 relative">
      <div className="w-full flex flex-col justify-center items-center bg-blogBg pt-8 z-50">
        <div>
          <ParticleBg />
        </div>
        <div className="w-[70%] h-[10vh] flex justify-center items-center">
          <h1 className="z-50 text-4xl font-bold pb-2 border-b-[#3BB5DB] border-b-4">
            Blog Posts
          </h1>
        </div>
      </div>
      <div className="w-full min-h-screen z-10 flex flex-col lg:flex-row lg:items-start justify-center bg-blogBg">
        <div className="lg:w-[70%] w-full z-10 my-[5vh] flex flex-col flex-wrap gap-3 justify-around items-center">
          <BlogCard
            metaData={featuredPostMetaData}
            index={0}
            setCurrentFilterId={setCurrentFilterId}
            filterMetaData={filterMetaData}
            currentFilterId={currentFilterId}
          />

          <div className="w-full flex justify-center items-center">
            <div className="w-[70%] sm:w-[90%] flex justify-center gap-12 bg-[#191919] py-5">
              <div className="flex gap-3 justify-center items-center w-1/3 sm:w-1/5">
                <h1 className="font-bold ">Tags: </h1>
                <TagFilterDropdown
                  popUpRef={tagDropDownPopupRef}
                  isOpen={isTagDropDownOpen}
                  setIsOpen={setIsTagDropDownOpen}
                  defaultVal="All Tags"
                  currentFilterId={currentFilterId}
                  onChooseDefault={() => {
                    setCurrentFilterId(-1);
                    setMetaData(metaDataArray);
                  }}
                  onChooseTag={(id) => {
                    filterMetaData(id);
                    setCurrentFilterId(id);
                  }}
                  tags={tags}
                />
              </div>
              <div className="flex gap-3 justify-center items-center w-1/3 sm:w-1/5">
                <h1 className="font-bold ">Sort: </h1>
                <Dropdown
                  popUpRef={sortFieldDropDownPopupRef}
                  isOpen={isSortFieldDropDownOpen}
                  setIsOpen={setIsSortFieldDropDownOpen}
                  defaultVal={sortField}
                  items={["Date Created", "Views", "Read Time"]}
                  onChooseItem={(item) => setSortField(item as sortFieldType)}
                />
              </div>
              <div className="flex gap-3 justify-center items-center w-1/3 sm:w-1/5">
                <h1 className="font-bold ">Order: </h1>
                <Dropdown
                  popUpRef={sortOrderDropDownPopupRef}
                  isOpen={isSortOrderDropDownOpen}
                  setIsOpen={setIsSortOrderDropDownOpen}
                  defaultVal={sortOrder}
                  items={["Descending", "Ascending"]}
                  onChooseItem={(item) => setSortOrder(item as sortOrderType)}
                />
              </div>
              <div className="flex gap-3 justify-center items-center w-1/3 sm:w-1/5">
                <button
                  className=" bg-[#42465f] hover:bg-[#525675] px-4 h-full rounded-sm"
                  onClick={() => {
                    setSortField("Date Created");
                    setSortOrder("Descending");
                    setCurrentFilterId(-1);
                    setMetaData(metaDataArray);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          {metaData.length === 0 && (
            <div className="w-full flex justify-center items-center">
              <div className="w-[90%] min-h-[400px] flex flex-col justify-center items-center bg-[#191919] gap-4">
                <Image
                  src="/no_result.png"
                  alt="No result Found"
                  width={100}
                  height={100}
                />
                <h1 className="text-2xl font-bold text-white">Coming Soon</h1>
                <p className="text-lg text-[#eeeeee]">
                  No posts found with the current tag filter
                </p>
              </div>
            </div>
          )}
          {metaData.map((metaData, index) => (
            <BlogCard
              key={index}
              metaData={metaData}
              index={index}
              setCurrentFilterId={setCurrentFilterId}
              filterMetaData={filterMetaData}
              currentFilterId={currentFilterId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  const posts = await prisma.blogPost.findMany({
    where: {
      type: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      tags: true,
    },
  });

  const tags = await prisma.tags.findMany();

  const tagsMetaData = Array(tags.length).fill(0);

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsMetaData[tag.id - 1] += 1;
    });
  });

  const metaDataArray: Array<BlogMetaData> = [];
  let featuredPostMetaData;

  posts.forEach((data) => {
    data.featured
      ? (featuredPostMetaData = {
          title: data.title,
          cover: data.cover,
          description: data.description,
          published_at: data.publishedAt.toLocaleDateString(
            config.DATE_TIME_FORMAT,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
          author: "Nathan Luong",
          guest: "None",
          read_time: data.readTime,
          views: data.views,
          file_name: data.url,
          tags: data.tags,
          featured: data.featured,
        })
      : metaDataArray.push({
          title: data.title,
          cover: data.cover,
          description: data.description,
          published_at: data.publishedAt.toLocaleDateString(
            config.DATE_TIME_FORMAT,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
          author: "Nathan Luong",
          guest: "None",
          read_time: data.readTime,
          views: data.views,
          file_name: data.url,
          tags: data.tags,
          featured: data.featured,
        });
  });

  return {
    props: {
      metaDataArray: metaDataArray,
      featuredPostMetaData: featuredPostMetaData,
      tags: tags.sort(
        (a, b) =>
          tagsMetaData[b.id - 1] - tagsMetaData[a.id - 1] ||
          a.name.localeCompare(b.name)
      ),
    },
  };
}

export default blogs;
