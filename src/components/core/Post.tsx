import { format } from "date-fns";
import { IoIosMore } from "react-icons/io";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import * as React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import parse from "html-react-parser";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useAppSelector } from "@/app/hook";
import { apiCall } from "@/utils/apiHelper";
import { addToast } from "@heroui/react";

interface IFeedProps {
  objectId: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdDate: string;
  profilePic: string;
}



const Feed: React.FunctionComponent<IFeedProps> = (props) => {
  const auth = useAppSelector((state) => {
    return state.authState;
  });

  const onBtDelete = async() => {
    try {
      const response = await apiCall.delete(`/post/${props.objectId}`);
      addToast({
        title: "Success",
        description: "Post has been deleted",
        color: "success",
        radius: "md",
        timeout: 5000,
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Card className="">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-3 text-black">
          <User
            avatarProps={{
              src: props.profilePic,
              name: props.firstName,
              color: "secondary",
            }}
            name={`${props.firstName} ${props.lastName}`}
            description={props.email}
          />
        </div>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" size="sm">
                <IoIosMore size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {auth.email === props.email ? (
                <DropdownItem onPress={onBtDelete} key={"delete"}>
                  <p className="text-red-500">Delete Post</p>
                </DropdownItem>
              ) : (
                <DropdownItem  key={"report"}>
                  <p className="text-red-500">Report Post</p>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <CardBody>
        <div>{parse(props.message)}</div>
      </CardBody>
      <CardFooter className="flex justify-between">
        <p className="text-zinc-500/50 text-xs text-right">
          Posted at{" "}
          {format(new Date(props.createdDate), "dd MMMM yyy HH:mm:ss")}
        </p>
        <Link href={`/blog/${props.objectId}`}>
          <Button variant="bordered" color="primary">
            Detail
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Feed;
