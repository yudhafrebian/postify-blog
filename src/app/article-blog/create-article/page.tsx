"use client";
import EditorComponent from "@/components/core/editor";
import { apiCall } from "@/utils/apiHelper";
import { articleSchema } from "@/utils/schemas/ValidationSchemas";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { addToast, Divider } from "@heroui/react";
import { Formik, Form, FormikProps } from "formik";
import { Select, SelectItem } from "@heroui/react";
import parse from "html-react-parser";

interface IArticle {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
}

const CreateArticle = () => {
  const categories = [
    { key: "Technology", label: "Technology" },
    { key: "Lifestyle", label: "Lifestyle" },
    { key: "Culinary", label: "Culinary" },
    { key: "Entertainment", label: "Entertainment" },
    { key: "Health", label: "Health" },
    { key: "Hobbies", label: "Hobbies" },
    { key: "Science", label: "Science" },
  ];

  const onBtnSubmit = async (values: IArticle) => {
    try {
      const response = await apiCall.post("/article", {
        title: values.title,
        description: values.description,
        content: values.content,
        thumbnailURL: values.thumbnail,
        category: values.category,
      });
      console.log("cek penambahan data article", response.data);

      const authorId = window.localStorage.getItem("auth");
      const articleId = response.data.objectId;

      await apiCall.put(`/user/${authorId}/articleList`, {
        objectIds: articleId,
      });

      await apiCall.put(`article/${articleId}/authorData`, {
        objectIds: authorId,
      });

      addToast({
        title: "Success",
        description: "Article has been created",
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
      <Formik
        initialValues={{
          title: "",
          description: "",
          content: "",
          thumbnail: "",
          category: "",
        }}
        validationSchema={articleSchema}
        onSubmit={(values) => {
          console.log(values);
          onBtnSubmit(values);
        }}
      >
        {(props: FormikProps<IArticle>) => {
          const { errors, values, handleChange, setFieldValue, touched } =
            props;
          return (
            <Form>
              <div>
                <h1 className="text-xl font-bold">Create Article</h1>
              </div>
              <Divider className="my-4" />
              <div className="flex flex-col justify-between gap-4">
                  <Input
                    variant="bordered"
                    name="title"
                    label="Title"
                    onChange={handleChange}
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-xs">{errors.title}</p>
                  )}
                  <Input
                    variant="bordered"
                    name="description"
                    label="Description"
                    onChange={handleChange}
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-xs">{errors.description}</p>
                  )}
                <div className="flex gap-4">
                <Input
                  variant="bordered"
                  name="thumbnail"
                  label="Thumbnail Image"
                  onChange={handleChange}
                />
                {errors.thumbnail && touched.thumbnail && (
                  <p className="text-red-500 text-xs">{errors.thumbnail}</p>
                )}
                <Select
                  variant="bordered"
                  name="category"
                  label="Category"
                  selectedKeys={new Set([values.category])}
                  onSelectionChange={(selectedKey) => {
                    const categoryValue = Array.from(selectedKey)[0] as string;
                    setFieldValue("category", categoryValue);
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem key={category.key} textValue={category.label}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
                </div>
                <EditorComponent
                  name="content"
                  onChange={(content) => {
                    setFieldValue("content", content);
                  }}
                />
                {errors.content && touched.content && (
                  <p className="text-red-500 text-xs">{errors.content}</p>
                )}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateArticle;
