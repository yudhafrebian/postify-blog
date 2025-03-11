"use client";
import { Formik, Form, FormikProps } from "formik";
import { apiCall } from "@/utils/apiHelper";
import { postMessageSchema } from "@/utils/schemas/ValidationSchemas";
import { Textarea } from "@heroui/input";
import { useEffect, useState } from "react";
import Post from "@/components/core/Post";
import { Button } from "@heroui/button";
import { toast } from "react-toastify";
interface IPostValue {
  postMessage: string;
}

const MyPostSection = () => {
  const [myFeeds, setMyFeeds] = useState<any[]>([]);

  const getMyFeed = async () => {
    try {
      const response = await apiCall.get("/post?loadRelations=userData");
      setMyFeeds(response.data);
      console.log("feed relation", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const printFeed = () => {
    const sortedFeed = [...myFeeds].sort((a, b) => b.created - a.created);
    const filterFeed = sortedFeed.filter((feed) => feed.userData.objectId === window.localStorage.getItem("auth"));
    console.log(filterFeed);
    return filterFeed.length > 0 ? (
      filterFeed.map((feed) => (
        <Post
          objectId={feed.objectId}
          key={feed.objectId}
          firstName={feed.userData.firstName}
          lastName={feed.userData.lastName}
          email={feed.userData.email}
          message={feed.message}
          createdDate={feed.created}
          profilePic={feed.userData.profilePic}
        />
      ))
    ) : (
      <p className="text-zinc-600 text-center">No post Yet</p>
    );
  };

  useEffect(() => {
    getMyFeed();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-1/2 mx-auto">
      <div className="flex flex-col gap-4">{printFeed()}</div>
    </div>
  );
};

export default MyPostSection;
