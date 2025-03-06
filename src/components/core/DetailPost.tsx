import { format } from "date-fns";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import * as React from "react";

interface IFeedProps {
  objectId: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdDate: string;
}

const Feed: React.FunctionComponent<IFeedProps> = (props) => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center gap-3 text-black">
          <User
            avatarProps={{ name: props.firstName }}
            name={`${props.firstName} ${props.lastName}`}
            description={props.email}
          />
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-black">{props.message}</p>
      </CardBody>
      <CardFooter>
        <p className="text-zinc-500/50 text-xs text-right">
          Posted at
          {format(new Date(props.createdDate), "dd MMMM yyy HH:mm:ss")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default Feed;
