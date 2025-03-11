"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider, Select, SelectItem } from "@heroui/react";

const SettingPage = () => {
  const mode = [
    { key: "Light", label: "Light" },
    { key: "Dark", label: "Dark" },
  ];

  const lang = [
    {key: "eng", label: "English"},
    {key: "id", label: "Indonesia"}
  ]

  return (
    <div className="p-5">
      <Card className="md:w-1/3 m-auto mt-16">
        <CardHeader>
          <h1 className="font-bold text-xl">Setting</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3">
          <div>
            <Select defaultSelectedKeys={["Light"]} label="Theme" variant="bordered">
              {mode.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div>
          <Select defaultSelectedKeys={["eng"]} label="Theme" variant="bordered">
              {lang.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default SettingPage;
