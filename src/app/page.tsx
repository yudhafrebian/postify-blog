"use client";
import { Card } from "@heroui/card";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import SignInForm from "@/components/section/form/signInForm";
import SignUpForm from "@/components/section/form/signUpForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUpSuccess from "@/components/section/form/SignUpSuccess";
import { Image } from "@heroui/react";

export default function Home() {
  // const [formData, setFormData] = useState<IForm[]>([])
  const formType = useSelector((state: RootState) => state.formState.formtype);
  
  const router = useRouter();
  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth) {
      router.replace("/blog");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col h-screen md:justify-evenly justify-center items-center bg-gradient-to-r from-secondary-300 to-primary-500 p-5">
        <div className="flex flex-col items-center md:w-1/2">
          <h1 className="text-center text-white text-lg md:text-2xl font-bold mb-8 md:w-3/4">
          Welcome to POSTIFY – Your Space to Share, Connect, and Inspire.
          </h1>
          <Image
          className="mx-auto md:block hidden"
            width={400}
            src="https://plus.unsplash.com/premium_photo-1661481518168-fe8dba18120b?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <Card className="md:w-2/5 p-4">
          {formType === "signup" && <SignUpForm />}
          {formType === "signin" && <SignInForm />}
          {formType === "signup-success" && <SignUpSuccess />}
        </Card>
      </div>
    </>
  );
}
