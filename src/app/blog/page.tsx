"use client";
import { apiCall } from "@/utils/apiHelper";
import { postMessageSchema } from "@/utils/schemas/ValidationSchemas";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import Post from "@/components/core/Post";
import UserList from "@/components/core/UserList";
import { useRouter } from "next/navigation";
import SideBar from "@/components/core/sidebar";
import Editor from "@/components/core/editor";
import TipTap from "@/components/core/editor";
import HomeSection from "@/components/section/blog/home";
import MyPostPage from "@/components/section/blog/myPost";

const BlogPage = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const sectionType = useAppSelector((state) => state.sectionState.sectionType);

  const getUserList = async () => {
    try {
      const response = await apiCall.get("/user");
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printUserList = () => {
    const filterUser = userList.filter(
      (user) => user.objectId !== window.localStorage.getItem("auth")
    );

    if (filterUser.length > 0) {
      return filterUser.map((user) => (
        <UserList
          key={user.objectId}
          profilePic={user.profilePic}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
        />
      ));
    } else {
      <p>No User Found</p>;
    }
  };

  console.log("Data User List", userList);

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="h-full min-h-screen bg-slate-50 flex md:flex-row flex-col gap-10 p-5 md:p-10">
      <SideBar />
      {sectionType === "home" && <HomeSection />}
      {sectionType === "my-post" && <MyPostPage />}

      <div className="md:flex flex-col gap-3 fixed right-10 hidden">
        <h1 className="text-md text-neutral-500">User List</h1>
        {printUserList()}
      </div>
    </div>
  );
};

export default BlogPage;
