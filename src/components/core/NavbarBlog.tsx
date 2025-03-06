"use client";

import { User } from "@heroui/user";
import { setFormType } from "@/utils/redux/feature/formSlice";
import { Button } from "@heroui/button";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { setLogin, setLogout } from "@/utils/redux/feature/authSlice";
import { apiCall } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@heroui/react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { FiBookOpen } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

const NavbarBlog = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => {
    return state.authState;
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const saveAuth = async () => {
    try {
      const auth = localStorage.getItem("auth");

      if (auth) {
        const query = encodeURIComponent(`objectId='${auth}'`);
        const response = await apiCall.get(`/user?where=${query}`);
        if (response.data.length === 1) {
          dispatch(
            setLogin({
              id: response.data[0].objectId,
              firstName: response.data[0].firstName,
              lastName: response.data[0].lastName,
              email: response.data[0].email,
              profilePic: response.data[0].profilePic,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("auth");
    router.replace("/");
    onclose;
  };

  useEffect(() => {
    saveAuth();
  }, []);

  return (
    <>
      <Navbar
        maxWidth="2xl"
        isBordered
        isBlurred
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-[-3px]",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:text-primary",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <Image width={70} src="https://api.logo.com/api/v2/images?design=lg_lRJBrVIhCSMxCzwiOa&u=278c25607d045a8f1fe787401d74e74917fd9eebf61b2e62d8a2725a6940e389&width=500&height=400&margins=100&fit=contain&format=webp&quality=60&tightBounds=true" />
        </NavbarBrand>
        <NavbarContent justify="center">
          {auth.email ? (
            <div className="flex items-center gap-3 text-gray-500">
              <Dropdown>
                <NavbarItem
                  isActive={
                    pathname === "/blog" || pathname === "/article-blog"
                  }
                >
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                      radius="sm"
                      variant="light"
                      endContent={<FaChevronDown />}
                    >
                      Blog
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  <DropdownItem
                    onPress={() => router.push("/blog")}
                    key="social"
                    description="Lets share your story with other Author!"
                    startContent={<CiEdit size={36} color="#006FEE" />}
                  >
                    Social Blog
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => router.push("/article-blog")}
                    key="article"
                    description="Explore ideas, learn, and share knowledge!"
                    startContent={<FiBookOpen size={36} color="#006FEE" />}
                  >
                    Article Blog
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavbarItem isActive={pathname === "/about"}>
                <Button
                  as={Link}
                  href="/about"
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold"
                  radius="sm"
                  variant="light"
                >
                  About
                </Button>
              </NavbarItem>
            </div>
          ) : (
            ""
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {auth.email ? (
            <div className="flex  items-center gap-3">
              <Dropdown>
                <DropdownTrigger>
                  <User
                    className="flex flex-row-reverse text-black cursor-pointer"
                    avatarProps={{
                      src: auth.profilePic,
                      name: auth.firstName,
                      color: "secondary",
                    }}
                    isFocusable
                    name={`${auth.firstName} ${auth.lastName}`}
                    description={auth.email}
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    className="text-slate-700"
                    key="profile"
                    onPress={() => router.push("/blog/profile")}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => router.push("/blog/setting")}
                    className="text-slate-700"
                    key="my-post"
                  >
                    Setting
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    onPress={onOpen}
                    className="text-danger-400"
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody className="text-black">
                        <p>Are you sure you want to logout?</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="default"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="danger"
                          onPress={handleLogout}
                          onPressEnd={onClose}
                        >
                          Logout
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                radius="sm"
                type="button"
                variant="solid"
                color="primary"
                onPress={() => dispatch(setFormType("signup"))}
              >
                Sign Up
              </Button>
              <Button
                type="button"
                variant="light"
                color="secondary"
                onPress={() => dispatch(setFormType("signin"))}
              >
                Sign In
              </Button>
            </div>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default NavbarBlog;
