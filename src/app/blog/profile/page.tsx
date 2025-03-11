"use client";
import { setLogin, setLogout } from "@/utils/redux/feature/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { apiCall } from "@/utils/apiHelper";
import {
  Avatar,
  Button,
  AvatarGroup,
  AvatarIcon,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
  Divider,
} from "@heroui/react";
import { Formik, Form, FormikProps } from "formik";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const profile = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch()
  console.log(profile);
  const router = useRouter();

const saveAuth = async () => {
    try {
      const auth = window.localStorage.getItem("auth");

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

  const onUpdateBtn = async (values: any) => {
    try {
      const auth = window.localStorage.getItem("auth");
      const response = await apiCall.put(`/user/${auth}`, {
        profilePic: values.profilePic,
      });
      saveAuth()
      addToast({
        title: "Success",
        description: "Profile Picture Updated",
        color: "success",
        radius: "md",
        timeout: 5000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="w-1/2 m-auto mt-16">
        <CardHeader>
        <h1 className="font-bold text-xl">Profile</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3">
          <Avatar
            onClick={onOpen}
            src={profile.profilePic}
            className="m-auto w-32 h-32 cursor-pointer"
          />
          <Input
            variant="bordered"
            label="First Name"
            isReadOnly
            value={profile.firstName}
          />
          <Input
            variant="bordered"
            label="Last Name"
            isReadOnly
            value={profile.lastName}
          />
          <Input
            variant="bordered"
            label="Email"
            isReadOnly
            value={profile.email}
          />
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Update Profile Picture</ModalHeader>
          <Formik
            initialValues={{
              profilePic: `${profile.profilePic}`,
            }}
            onSubmit={(values) => {
              onUpdateBtn(values);
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <ModalBody>
                  <Input
                    variant="bordered"
                    label="Profile Picture"
                    name="profilePic"
                    value={values.profilePic}
                    onChange={handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onPress={onOpenChange}>Cancel</Button>
                  <Button color="primary" type="submit" onPress={onUpdateBtn} onPressEnd={onOpenChange}>
                    Update
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfilePage;
