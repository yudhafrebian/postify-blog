import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button, Image, Chip, Divider, Link } from "@heroui/react";
import { User } from "@heroui/user";
import * as React from "react";
import { format } from "date-fns";

interface IArticleCardProps {
  firstName: string;
  lastName: string;
  email: string;
  objectId: string;
  title: string;
  description: string;
  category: string;
  thumbnailURL: string;
  createdDate: string;
  profilePic:string
}

const ArticleCard: React.FunctionComponent<IArticleCardProps> = (props) => {
  return (
    <Card className="w-full">
      <CardHeader className="w-full">
        <Image className="object-cover mx-auto" width={320} height={200} isZoomed src={props.thumbnailURL} alt="Gambar" />
      </CardHeader>
      <CardBody>
        <div className="flex justify-between mb-3">
          <p className="font-bold text-black text-md">{props.title}</p>
          <Chip size="sm" color="primary" variant="bordered">
            {props.category}
          </Chip>
        </div>
        <p className="overflow-hidden text-ellipsis line-clamp-3 font-light text-neutral-600 text-sm">
          {props.description}
        </p>
      </CardBody>
        <p className="font-light text-neutral-600 text-xs mr-3 mb-2 text-right">
          {" "}
          Posted at {format(new Date(props.createdDate), "dd MMMM yyy")}
        </p>
      <Divider/>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p className="text-black text-xs font-semibold">Author</p>
        <div className="flex justify-between w-full">
          <User
            className="text-black"
            avatarProps={{src:props.profilePic, name: props.firstName, color: "secondary" }}
            name={`${props.firstName} ${props.lastName}`}
            description={props.email}
          />
          <Button as={Link} href={`/article-blog/${props.objectId}`} color="primary" variant="flat">Read More</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
