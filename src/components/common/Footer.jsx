import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { BiRightArrow } from "react-icons/bi";
import LeftImageMotion from "../motion/leftImageMotion";
import MiddleCardMotion from "../motion/middleCardMotion";
import RightImageMotion from "../motion/rightImageMotion";

const Footer = () => {
  return (
    <div className="bg-primary py-10">
      <div className="max-w-screen-xl mx-auto lg:px-0 px-4">
        <div className="flex md:flex-row flex-col justify-between gap-[42px] md:px-0 px-4">
          <div className="lg:w-4/12">
            <LeftImageMotion>
              <div className="flex items-center">
                <img
                  src="https://i.ibb.co/r6t5b3R/images-removebg-preview-1.png"
                  alt=""
                  className="h-20"
                />
                <a className="text-2xl font-bold font-oswald uppercase">
                  <span className="text-secondary">Sports</span>{" "}
                  <span className="text-white">School</span>
                </a>
              </div>
              <p className="text-white mt-4">
                Elegant pink origami design threedimensional view and decoration
                co-exist.Great for adding a decorative touch toany room decor.
              </p>
              <div className="flex gap-x-8 text-2xl text-secondary mt-5">
                <BsFacebook className="hover:text-white cursor-pointer" />
                <BsTwitter className="hover:text-white cursor-pointer" />
                <BsInstagram className="hover:text-white cursor-pointer" />
                <BsWhatsapp className="hover:text-white cursor-pointer" />
              </div>
            </LeftImageMotion>
          </div>
          <div className="">
            <MiddleCardMotion>
              <h3 className="text-lg font-bold mb-8 text-secondary font-oswald uppercase">
                Quick Links
              </h3>
              <div className="text-white space-y-2">
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" /> <span>Home</span>
                </p>
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" />{" "}
                  <span>Instructors</span>
                </p>
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" />{" "}
                  <span>Classes</span>
                </p>
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" /> <span>About</span>
                </p>
              </div>
            </MiddleCardMotion>
          </div>
          <div className="">
            <MiddleCardMotion>
              <h3 className="text-lg font-bold mb-8 text-secondary font-oswald uppercase">
                Polices & Support
              </h3>
              <div className="text-white space-y-2">
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" />{" "}
                  <span>Contact</span>
                </p>
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" />{" "}
                  <span>Terms & Condition</span>
                </p>
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" />{" "}
                  <span>Privacy Policy</span>
                </p>
                <p className="hover:text-secondary cursor-pointer flex items-center gap-x-2">
                  <BiRightArrow className="text-secondary" /> <span>More</span>
                </p>
              </div>
            </MiddleCardMotion>
          </div>
          <div className="pr-4">
            <RightImageMotion>
              <h3 className="text-lg font-bold mb-8 text-secondary font-oswald uppercase">
                Contacts
              </h3>
              <div className="text-white space-y-2">
                <p>
                  Head office:
                  <br /> dhaka plaza 5th floor.
                  <br /> home, #08 road #4{" "}
                </p>
                <p>+(88)019 470 977 34</p>
                <p>info@example.com</p>
              </div>
            </RightImageMotion>
          </div>
        </div>
        <hr className="mt-10 w-full" />
        <MiddleCardMotion>
          <p className="text-center text-base text-white mt-8">
            All Right Reserved Sports School © 2023
          </p>
        </MiddleCardMotion>
      </div>
    </div>
  );
};

export default Footer;
