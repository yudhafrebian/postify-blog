import * as React from "react";
import { apiCall } from "@/utils/apiHelper";
import parse from "html-react-parser";
import { format } from "date-fns";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import Link from "next/link";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";

interface IDetailPostProps {
  params: { id: string };
}

// note : interface untuk detail harus sama dengan interface di database
interface IPost {
  objectId: string;
  message: string;
  created: string;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const getDetailPost = async (id: string) => {
  try {
    const query = encodeURIComponent(`objectId='${id}'`);
    const response = await apiCall.get(
      `/post?where=${query}&loadRelations=userData`
    );
    console.log(response.data[0]);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

const DetailPost = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const post: IPost = await getDetailPost(id);
  return (
    <div className="p-5">
      <Button as={Link} href="/blog" className="w-16 mt-5 ml-4" variant="ghost" color="primary" size="sm" >Back</Button>
      <Card className="md:w-1/2 m-auto mt-4 md:mt-10">
        <CardHeader>
          <div className="flex items-center gap-3 text-black">
            <User
              avatarProps={{
                name: post.userData.firstName,
                color: "secondary",
              }}
              name={`${post.userData.firstName} ${post.userData.lastName}`}
              description={post.userData.email}
            />
          </div>
        </CardHeader>
        <CardBody>
          <div>{parse(post.message)}</div>
        </CardBody>
        <CardFooter className="flex justify-between">
          <p className="text-zinc-500/50 text-xs text-right">
            Posted at {format(new Date(post.created), "dd MMMM yyy HH:mm:ss")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailPost;
