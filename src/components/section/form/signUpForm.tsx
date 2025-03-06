import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useState, useRef } from "react";
import { apiCall } from "@/utils/apiHelper";
import { Formik, Form, FormikProps } from "formik";
import { SignUpSchema } from "../../../utils/schemas/ValidationSchemas";
import { addToast } from "@heroui/react";
import { useAppDispatch } from "@/app/hook";
import { setFormType } from "@/utils/redux/feature/formSlice";

interface IFormValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const dispatch = useAppDispatch();
  const togglePassVisibility = () => setIsPassVisible(!isPassVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const onBtnSignUp = async (values: IFormValue) => {
    try {
      const response = await apiCall.post("/user", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

     values.firstName = "";
     values.lastName = "";
     values.email = "";
     values.password = "";
     values.confirmPassword = "";

      addToast({
        title: "Success",
        description: `Sign Up Success, Check Your Email ${values.email}`,
        color: "success",
        radius: "md",
        timeout: 5000,
      });

      dispatch(setFormType("signup-success"));

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CardHeader>
        <p className="text-slate-800 font-bold">Sign Up Now</p>
      </CardHeader>

      <CardBody>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            console.log(values);
            onBtnSignUp(values);
          }}
        >
          {(props: FormikProps<IFormValue>) => {
            const { errors, touched, values, handleChange, handleBlur } = props;
            console.log(errors.lastName);
            return (
              <Form>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    <Input
                      name="firstName"
                      isRequired
                      size="sm"
                      label="First Name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.firstName && !!errors.firstName}
                      errorMessage={touched.firstName && errors.firstName ? errors.firstName : ""}
                    />
                    <Input
                      name="lastName"
                      isRequired
                      size="sm"
                      label="Last Name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.lastName && !!errors.lastName}
                      errorMessage={touched.lastName && errors.lastName ? errors.lastName : ""}
                    />
                  </div>
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
                        className="cursor-pointer my-auto mr-4"
                      >
                        {isPassVisible ? (
                          <IoEyeSharp color="black" size={24} />
                        ) : (
                          <IoEyeOffSharp color="black" size={24} />
                        )}
                      </div>
                    }
                  />
                  <Input
                    name="confirmPassword"
                    isRequired
                    size="sm"
                    label="Confirmation Password"
                    type={isConfirmVisible ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
                    endContent={
                      <div
                        onClick={toggleConfirmVisibility}
                        className="cursor-pointer my-auto mr-4"
                      >
                        {isConfirmVisible ? (
                          <IoEyeSharp color="black" size={24} />
                        ) : (
                          <IoEyeOffSharp color="black" size={24} />
                        )}
                      </div>
                    }
                  />
                  <Button
                    className="w-1/4 mx-auto"
                    color="primary"
                    type="submit"
                    radius="sm"
                  >
                    SUBMIT
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

export default SignUpForm;
