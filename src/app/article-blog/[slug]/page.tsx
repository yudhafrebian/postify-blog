import { apiCall } from "@/utils/apiHelper";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image, Chip, Divider, User, Button } from "@heroui/react";
import * as React from "react";
import parse from "html-react-parser";
import { format } from "date-fns";
import Link from "next/link";

interface IDetailArticleProps {
  params: Promise<{ slug: string }>;
}

// note : interface untuk detail harus sama dengan interface di database
interface IArticle {
  objectId: string;
  title: string;
  description: string;
  content: string;
  thumbnailURL: string;
  category: string;
  created: string;
  authorData: {
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string;
  };
}
const getArticleDetail = async (slug: string) => {
  try {
    const query = encodeURIComponent(`objectId='${slug}'`);
    const response = await apiCall.get(
      `/article?where=${query}&loadRelations=authorData`
    );
    console.log("res", response.data);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

const DetailArticle = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const article: IArticle = await getArticleDetail(slug);
  console.log(article);
  return (
    <div className="h-screen bg-slate-50 p-5 md:p-10">
      <Card className="md:py-10 md:px-20">
        <Button
          as={Link}
          href="/article-blog"
          className="w-16 ml-3 mt-5"
          variant="ghost"
          color="primary"
          size="sm"
        >
          Back
        </Button>
        <CardHeader className="flex flex-col gap-5">
          <h1 className="text-lg md:text-3xl font-bold text-black">{article.title}</h1>
          <p className="text-sm md:text-base font-medium text-center text-neutral-500 w-[90%] md:w-3/4">
            {article.description}
          </p>
          <div className="flex gap-3 items-center">
            <p className="text-sm md:text-base italic font-light">Article ~ </p>
            <Chip variant="bordered" color="primary" size="sm">
              {article.category}
            </Chip>
          </div>
          <Divider />
          <div className="md:w-1/2 mt-6">
            <Image
              className="object-cover"
              width={1000}
              height={300}
              src={article.thumbnailURL}
            />
          </div>
        </CardHeader>
        <CardBody className="text-sm md:text-base">
          {parse(article.content)}
          <p className="text-sm text-zinc-500/50 mt-10 text-right">
            Posted at {format(new Date(article.created), "dd MMMM yyy")}
          </p>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col gap-5">
          <div>
            <h1 className="text-black md:text-lg font-semibold">Blog History</h1>
            <p className="text-xs md:text-sm font-light">
              Our culinary blog began as a simple space to share recipes and
              cooking tips, driven by a passion for food and storytelling. Over
              time, it evolved into a platform for restaurant reviews, food
              trends, cultural culinary insights, and chef interviews. As our
              audience grew, we introduced video tutorials, behind-the-scenes
              features, and deep dives into dish histories, making the blog a
              hub for food lovers. Today, it’s more than just recipes—it's a
              community celebrating flavors, traditions, and the joy of cooking.
            </p>
          </div>
          <p className="text-black font-semibold">Author</p>
          <div className="flex flex-col items-center gap-3">
            <User
              avatarProps={{
                src: article.authorData.profilePic,
                name: article.authorData.firstName,
                color: "secondary",
              }}
              name={`${article.authorData.firstName} ${article.authorData.lastName}`}
              description={article.authorData.email}
            />
            <p className="text-sm font-light italic md:w-1/2">
              "I am a passionate writer and creative thinker with a deep
              interest in storytelling and digital media. With a background in
              content creation and journalism, I enjoy exploring new ideas,
              sharing insights, and connecting with like-minded individuals.
              When not writing, I love traveling, photography, and experimenting
              with new recipes in the kitchen."
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailArticle;
