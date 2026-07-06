import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t-gray-200">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born in 2010 with a vision to create a brand that
            embodies quality, style, and sustainability and to provide our
            customers with timeless pieces that they can cherish for years to
            come. Forever was born in 2010 with a vision to create a brand that
            embodies quality, style, and sustainability and to provide our
            customers with timeless pieces that they can cherish for years to
            come.
          </p>
          <p>
            Our journey began in a small workshop, where we handcrafted each
            piece with care and attention to detail and whenever possible, we
            use sustainable materials and ethical production methods to minimize
            our impact on the environment. use sustainable materials and ethical
            production methods to minimize our impact on the environment
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Forever was born in 2010 with a vision to create a brand that
            embodies quality, style, and sustainability and to provide our
            customers with timeless pieces that they can cherish for years to
            come. Forever was born in 2010 with a vision to create a brand that
            embodies quality, st
          </p>
        </div>
      </div>{" "}
      <div className="text-xl py-4 ">
        <Title text1={"WHY"} text2={"CHOOSE US ?"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We ensure that every piece meets our high standards of quality and
            durability.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly website and fast shipping, shopping with us
            is easy and hassle-free.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We are committed to providing outstanding customer service and
            support.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
