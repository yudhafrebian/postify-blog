import { Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import * as React from "react";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-12 p-10">
      <Card className="py-4">
        <CardHeader className="flex flex-col items-center ">
          <h1 className="text-4xl font-bold underline">About Us</h1>
          <p className="text-md italic font-light mt-6">
            "Writing, Sharing, and Inspiring"
          </p>
        </CardHeader>
        <CardBody className="flex flex-row justify-center items-center gap-8 mt-16">
          <Image
            width={300}
            src="https://plus.unsplash.com/premium_photo-1677529496297-fd0174d65941?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Image
            width={180}
            src="https://images.unsplash.com/photo-1664574654700-75f1c1fad74e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Image
            width={300}
            src="https://plus.unsplash.com/premium_photo-1664372145543-d60ba2756a7e?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Image
            width={180}
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </CardBody>
      </Card>

      <div className="flex flex-col gap-10 items-center">
        <h1 className="text-4xl font-bold  underline">Who Are We</h1>
        <div className="flex justify-center gap-5 font-light w-3/4">
          <p>
            Welcome to Postify, a place where ideas, stories, and insights come
            together. We believe that sharing knowledge is a small step toward
            making a big difference. Through this blog, we aim to provide
            valuable, informative, and inspiring content for our readers.
          </p>
          <p>
            Our goal is to build a space where writers, thinkers, and curious
            minds can connect and engage in meaningful discussions. With a
            diverse range of topics and expert contributions, we strive to
            create content that is not only informative but also
            thought-provoking and inspiring.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-14 mt-12">
        <div>
          <Image
            width={300}
            src="https://plus.unsplash.com/premium_photo-1668383207188-f5474588d674?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold underline mb-11">Our Mission</h1>
          <p className="w-3/4 text-lg mb-5">
            On our blog, you'll find content across various categories,
            including:
          </p>
          <ul className="font-light list-disc">
            <li>
              Technology & Startups – Stay updated with the latest tech and
              digital business trends.
            </li>
            <li>
              Writing & Blogging Tips – Guides and tricks to become a successful
              blogger.
            </li>
            <li>
              Business & Finance – Strategies for business, investing, and
              financial management.
            </li>
            <li>
              Creativity & Design – Inspiration and tips on graphic design and
              digital art.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly items-center mt-12">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-11 underline">
            Meet The Creator
          </h1>
          <p className="font-light indent-10">
            Hi, I’m Yudha, the creator of Postify. Writing has always been a
            passion of mine, and I started this blog as a space to share my
            thoughts, insights, and experiences with the world. With a
            background in Web Developer, I wanted to create a platform where
            ideas could be explored, knowledge could be shared, and
            conversations could be sparked.
          </p>
          <p className="mt-5 font-light indent-10">
            Every article I write comes from personal experiences, research, and
            a desire to bring value to my readers. Whether it’s a deep dive into
            a complex topic, a reflection on personal growth, or practical
            advice, my goal is to create content that is engaging, informative,
            and inspiring. I believe that storytelling has the power to connect
            people, and through this blog, I hope to foster a community of
            curious minds who love to learn and share ideas.
          </p>
        </div>
        <Image
          width={400}
          src="https://images.unsplash.com/photo-1650903063280-12f52e6257a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="mx-auto mt-12">
        <h1 className="text-4xl font-bold mb-8 underline text-center" >Connect With Us</h1>
        <p>We love interacting with our readers! Feel free to reach out:</p>
        <div className="flex gap-3 items-center justify-center mt-2">
          <MdEmail size={24} />
          <p className="font-light">Email us at : yudha@postify.com</p>
        </div>
        <div className="flex gap-3 items-center justify-center mt-5">
        <p>Follow us on social media:</p>
        <FaInstagram size={24} />
        <FaXTwitter size={24} />
        <FaFacebookF size={24} />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
