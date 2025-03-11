"use client";
import { Formik, Form, FormikProps } from "formik";
import { apiCall } from "@/utils/apiHelper";
import { postMessageSchema } from "@/utils/schemas/ValidationSchemas";
import { useEffect, useState } from "react";
import Post from "@/components/core/Post";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/react";
import { toast } from "react-toastify";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/card";
import EditorComponent from "@/components/core/editor";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
interface IPostValue {
  postMessage: string;
}

const HomeSection = () => {
  const [feeds, setFeeds] = useState<any[]>([]);

  const getFeed = async () => {
    try {
      const response = await apiCall.get("/post?loadRelations=userData");
      setFeeds(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const OnBtPost = async (values: IPostValue) => {
    try {
      const response = await apiCall.post("/post", {
        message: values.postMessage,
      });
      console.log("cek penambahan data post", response.data);
      const userId = window.localStorage.getItem("auth");
      const postId = response.data.objectId;

      const resUserToPost = await apiCall.put(`/user/${userId}/postList`, {
        objectIds: postId,
      });

      const resPostToUser = await apiCall.put(`post/${postId}/userData`, {
        objectIds: userId,
      });

      addToast({
        title: "Success",
        description: "Your Post Is Uploaded",
        color: "success",
        radius: "md",
        timeout: 5000,
      })
      getFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const printFeed = () => {
    const sortedFeed = [...feeds].sort((a, b) => b.created - a.created);
    return sortedFeed.length > 0 ? (
      sortedFeed.map((feed) => (
        <Post
          key={feed.objectId}
          profilePic={feed.userData.profilePic}
          objectId={feed.objectId}
          firstName={feed.userData.firstName}
          lastName={feed.userData.lastName}
          email={feed.userData.email}
          message={feed.message}
          createdDate={feed.created}
        />
      ))
    ) : (
      <p className="text-zinc-600 text-center">No post Yet</p>
    );
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col gap-5 md:w-1/2 mx-auto">
      <div className=" gap-3 w-full">
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                postMessage: "",
              }}
              validationSchema={postMessageSchema}
              onSubmit={(values, {resetForm}) => {
                console.log(values);
                OnBtPost(values);
                resetForm()
              }}
            >
              {(props: FormikProps<IPostValue>) => {
                const { errors, values, handleChange, setFieldValue } = props;
                return (
                  <Form>
                    <EditorComponent
                      name="postMessage"
                      onChange={(postMessage) =>
                        setFieldValue("postMessage", postMessage)
                      }
                    />
                    <p className="text-red-500 mt-3 text-xs">{errors.postMessage}</p>
                    <Button
                      color="primary"
                      className="w-fit mt-5 text-right"
                      type="submit"
                    >
                      Post
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </div>
      <Divider className="my-5" />
      <div>
        <h1 className="text-xl  font-bold text-black">Recent Post</h1>
      </div>
      <div className="flex flex-col gap-4">{printFeed()}</div>
    </div>
  );
};

export default HomeSection;
