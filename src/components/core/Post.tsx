import { format } from "date-fns";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import * as React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import parse from "html-react-parser";

interface IFeedProps {
  objectId: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdDate: string;
  profilePic: string
}

const Feed: React.FunctionComponent<IFeedProps> = (props) => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center gap-3 text-black">
          <User
            avatarProps={{ src: props.profilePic, name: props.firstName, color: "secondary" }}
            name={`${props.firstName} ${props.lastName}`}
            description={props.email}
          />
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
