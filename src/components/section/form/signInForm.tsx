import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useState, useRef } from "react";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { SignInSchema } from "@/utils/schemas/ValidationSchemas";
import { useRouter } from "next/navigation";
import { setLogin, setLogout } from "@/utils/redux/feature/authSlice";
import { addToast } from "@heroui/react";
import { useAppDispatch } from "@/app/hook";

interface IFormValue {
  email: string;
  password: string;
}

const SignInForm = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const dispatch = useAppDispatch()
  const router = useRouter();

  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);

  const onBtnSignIn = async (values: IFormValue) => {
    try {
      const query = encodeURIComponent(
        `email='${values.email}' AND password='${values.password}'`
      );
      const response = await apiCall.get(`/user?where=${query}`);
      console.log(response);

      if (response.data.length === 1) {
        addToast({
          title: "Success",
          description: `Welcome back ${response.data[0].firstName}!`,
          color: "success",
          radius: "md",
          timeout: 5000,
        })
        dispatch(
          setLogin({
            id: response.data[0].objectId,
            firstName: response.data[0].firstName,
            lastName: response.data[0].lastName,
            email: response.data[0].email,
          })
        );

        localStorage.setItem("auth", response.data[0].objectId);
        router.replace("/blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CardHeader>
        <p className="text-slate-800 font-bold">Login Now</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            console.log(values);
            onBtnSignIn(values);
          }}
        >
          {(props: FormikProps<IFormValue>) => {
            const { errors, values, touched, handleBlur, handleChange } = props;
            return (
              <Form>
                <div className="flex flex-col gap-6">
                  <Input
                    name="email"
                    isRequired
                    size="sm"
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    errorMessage={touched.email && errors.email ? errors.email : ""}
                  />
                  <Input
                    name="password"
                    isRequired
                    size="sm"
                    label="Password"
                    type={isPassVisible ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    errorMessage={touched.password && errors.password ? errors.password : ""}
                    endContent={
                      <div
                        onClick={togglePassVisibility}
                        className="cursor-pointer my-auto"
                      >
                        {isPassVisible ? (
                          <IoEyeSharp color="black" size={24} />
                        ) : (
                          <IoEyeOffSharp color="black" size={24} />
                        )}
                      </div>
                    }
                  />
                  <Button
                    radius="sm"
                    color="primary"
                    className="mx-auto"
                    type="submit"
                  >
                    LOGIN
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </CardBody>
    </>
  );
};

export default SignInForm;
