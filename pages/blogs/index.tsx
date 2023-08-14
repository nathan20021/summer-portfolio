import * as React from "react";
import ParticleBg from "../../components/particleBg";
import BlogCard from "../../components/Blog/BlogCard";
import TagFilterDropdown from "@/components/Blog/BlogTagFilterDropdown";
import { prisma } from "@/db";
import { Tags } from "@prisma/client";
import { useState, useCallback } from "react";
import { BlogMetaData } from "@/interfaces";
import config from "../../config.json";
import useClickOutside from "@/hooks/useClickOutside";

type prop = {
  featuredPostMetaData: BlogMetaData;
  metaDataArray: Array<BlogMetaData>;
  tags: Array<Tags>;
  tagsMetaData: Array<number>;
};

const blogs = ({
  featuredPostMetaData,
  metaDataArray,
  tags,
  tagsMetaData,
}: prop) => {
  const [metaData, setMetaData] = useState<Array<BlogMetaData>>(metaDataArray);
  const [currentFilterId, setCurrentFilterId] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popUpRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const filterMetaData = useCallback((id: number) => {
    setMetaData(
      metaDataArray.filter((post) => {
        const temp = post.tags.map((_val) => _val.id);
        return temp.includes(id);
      })
    );
  }, []);
  return (
    <section className="min-h-screen z-10 relative">
      <div className="w-full flex flex-col justify-center items-center bg-[#111111] pt-8 z-50">
        <div>
          <ParticleBg />
        </div>
        <div className="w-[70%] h-[10vh] flex justify-center items-center">
          <h1 className="z-50 text-4xl font-bold pb-2 border-b-[#3BB5DB] border-b-4">
            Blog Posts
          </h1>
        </div>
      </div>
      <div className="w-full min-h-screen z-10 flex flex-col lg:flex-row lg:items-start justify-center bg-[#111111]">
        <div className="lg:w-[70%] w-full z-10 my-[5vh] flex flex-col flex-wrap gap-3 justify-around items-center">
          <BlogCard
            metaData={featuredPostMetaData}
            index={0}
            setCurrentFilterId={setCurrentFilterId}
            filterMetaData={filterMetaData}
            currentFilterId={currentFilterId}
          />

          <div className="w-full flex justify-end">
            <div className="w-[70%] sm:w-[90%]">
              <div className="flex gap-3 justify-center items-center w-1/3 sm:w-1/5">
                <h1 className="font-bold ">Tags: </h1>
                <TagFilterDropdown
                  popUpRef={popUpRef}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
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
            </div>
          </div>
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
      tagsMetaData: tagsMetaData,
    },
  };
}

export default blogs;
