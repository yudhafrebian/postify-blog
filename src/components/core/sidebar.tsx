"use client";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BiUserPin } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/app/hook";
import { setSectionType } from "@/utils/redux/feature/sectionSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <Card className="w-60 left-6 fixed font-bold text-black md:block hidden">
      <CardBody className="px-5 flex flex-col gap-2">
        <Button
          variant="light"
          color="primary"
          className="w-full flex gap-3 justify-start font-semibold text-md text-neutral-600"
          onPress={() => dispatch(setSectionType("home"))}
        >
          <IoHome size={22} /> Home
        </Button>

        <Button
          variant="light"
          color="primary"
          className="w-full flex gap-3 justify-start font-semibold text-md text-neutral-600"
          onPress={() => dispatch(setSectionType("my-post"))}
        >
          <BiUserPin size={22} /> My Post
        </Button>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
