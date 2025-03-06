import * as React from "react";
import { Card, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { User } from "@heroui/user";
interface IUserListProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
}

const UserList: React.FunctionComponent<IUserListProps> = (props) => {
  return(
    <Card className="w-60" isBlurred>
          <CardHeader className="px-5 text-black">
            <User avatarProps={{src:props.profilePic, name:props.firstName, color:"secondary"}} name={`${props.firstName} ${props.lastName }`} description={props.email} />
          </CardHeader>
        </Card>
  )
};

export default UserList;
