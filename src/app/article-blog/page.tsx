"use client";
import ArticleCard from "@/components/core/ArticleCard";
import "react-responsive-modal/styles.css";
import { apiCall } from "@/utils/apiHelper";
import { Divider, Link, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
} from "@heroui/react";
import { Modal } from "react-responsive-modal";
import { IoSearchOutline } from "react-icons/io5";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@heroui/modal";
import CreateArticle from "./create-article/page";

interface IArticle {
  firstName: string;
  lastName: string;
  email: string;
  objectId: string;
  title: string;
  description: string;
  thumbnailURL: string;
  createdDate: string;
}

const ArticlePage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const getArticles = async () => {
    try {
      const response = await apiCall.get("/article?loadRelations=authorData");
      console.log(response.data);
      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printArticles = () => {
    const sortedArticles = [...articles].sort((a, b) => b.created - a.created);
    let filteredArticles = sortedArticles;
    if (filter === "Technology") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Technology"
      );
    }
    if (filter === "Lifestyle") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Lifestyle"
      );
    }
    if (filter === "Culinary") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Culinary"
      );
    }
    if (filter === "Entertainment") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Entertainment"
      );
    }
    if (filter === "Health") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Health"
      );
    }
    if (filter === "Hobbies") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Hobbies"
      );
    }
    if (filter === "Science") {
      filteredArticles = sortedArticles.filter(
        (article) => article.category === "Science"
      );
    }
    if (searchQuery.trim() !== "") {
      filteredArticles = filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredArticles.length > 0 ? (
      filteredArticles.map((article) => (
        <ArticleCard
          key={article.objectId}
          category={article.category}
          objectId={article.objectId}
          thumbnailURL={article.thumbnailURL}
          title={article.title}
          description={article.description}
          createdDate={article.created}
          firstName={article.authorData.firstName}
          lastName={article.authorData.lastName}
          email={article.authorData.email}
          profilePic={article.authorData.profilePic}
        />
      ))
    ) : (
      <p className="text-zinc-600 text-center">No Article Yet</p>
    );
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="flex flex-col items-center h-full min-h-screen bg-slate-50 gap-10 p-10">
      <Card className="flex flex-col gap-5 p-10">
        <CardHeader className="flex md:flex-row flex-col-reverse gap-8 justify-between">
          <div className="md:w-1/2 text-black">
            <h1 className="text-xl md:text-4xl font-bold">
              Discover Nice Article Here
            </h1>
            <p className="text-sm md:text-base text-neutral-500 font-light mt-6">
              Discover inspiration and valuable insights here! Explore
              high-quality articles covering various topics, from technology and
              business to lifestyle. Start writing and share your creative ideas
              with the world!
            </p>
          </div>
          <div className="">
            <Image
              isZoomed
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={200}
              radius="sm"
            />
          </div>
        </CardHeader>
        <CardBody className="flex flex-col-reverse md:flex-row items-start gap-4 justify-between">
          <Input
            className="md:w-1/2"
            classNames={{
              input: [
                "text-black",
                "placeholder:text-default-700/50",
                "group-data-[focus=true]:bg-default-200/50",
              ],
            }}
            placeholder="Search your favorite article..."
            variant="bordered"
            startContent={<IoSearchOutline color="black" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            <p className="md:text-sm text-xs text-neutral-500">
              Start writing your own articles and inspire others with your ideas
              today!
            </p>
            <Button
              onPress={onOpenModal}
              variant="ghost"
              color="primary"
              radius="full"
              className="md:w-1/2 mx-auto"
            >
              Create An Article
            </Button>
            <Modal
              open={open}
              onClose={onCloseModal}
              center
              classNames={{ modal: "rounded-lg w-full" }}
            >
              <CreateArticle />
            </Modal>
          </div>
        </CardBody>
      </Card>
      <div className="md:flex grid grid-cols-2 gap-5 text-neutral-700">
        {[
          "All",
          "Technology",
          "Lifestyle",
          "Culinary",
          "Entertainment",
          "Health",
          "Hobbies",
          "Science",
        ].map((type) => (
          <Button
            className={
              type === filter ? "bg-primary text-white" : "text-neutral-600 "
            }
            key={type}
            variant={type === filter ? "solid" : "light"}
            radius="full"
            color="primary"
            onPress={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {printArticles()}
      </div>
    </div>
  );
};

export default ArticlePage;
