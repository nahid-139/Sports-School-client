import CardMotion from "../motion/cardMotion";
import LeftImageMotion from "../motion/leftImageMotion";
import MiddleCardMotion from "../motion/middleCardMotion";
import RightImageMotion from "../motion/rightImageMotion";
import SubCardMotion from "../motion/subCardMotion";

const ContactUs = () => {
  return (
    <div className="bg-slate-50">
      <div className="max-w-screen-xl mx-auto py-20 lg:px-0 px-5">
        <CardMotion>
          <h1 className="text-4xl font-bold font-oswald text-center">
            <span className="text-secondary">Contact </span>With Us
          </h1>
        </CardMotion>
        <SubCardMotion>
          <p className="text-lg font-open_sans italic text-center mt-2">
            Contact with us 24/7. Join or sports school.
          </p>
        </SubCardMotion>
        <div className="py-12 grid md:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <LeftImageMotion>
              <h1 className="text-2xl font-bold font-oswald mb-4">
                Headquarter
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </LeftImageMotion>
            <MiddleCardMotion>
              <div className="mt-10 flex gap-x-6">
                <div>
                  <img
                    src="https://i.ibb.co/17476Nb/contact-location.png"
                    alt=""
                    className="w-[50px]"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black">Address </h4>
                  <p className="text-base mt-2 max-w-[300px]">
                    Dhaka plaza 5th floor. home, #08 road #4
                  </p>
                </div>
              </div>
              <div className="mt-10 flex gap-x-6">
                <div>
                  <img
                    src="https://i.ibb.co/0ZvgXY5/contact-phone.png"
                    alt=""
                    className="w-[50px]"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black">Phone </h4>
                  <p className="text-base mt-2 max-w-[300px]">
                    +(88)019 470 977 34
                  </p>
                </div>
              </div>
              <div className="mt-10 flex gap-x-6">
                <div>
                  <img
                    src="https://i.ibb.co/wBv187q/contact-email.png"
                    alt=""
                    className="w-[50px]"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black">Email </h4>
                  <p className="text-base mt-2 max-w-[300px]">
                    info@example.com
                  </p>
                </div>
              </div>
            </MiddleCardMotion>
          </div>
          <div>
            <RightImageMotion>
              <h1 className="text-2xl font-bold font-oswald mb-4">
                Request a Free Quote
              </h1>
              <div>
                <div className="flex justify-center gap-x-5">
                  <input
                    className="py-3 px-3 w-full box-border border border-primary focus:outline-secondary rounded-lg"
                    placeholder="Enter your first name"
                  />
                  <input
                    className="py-3 px-3 w-full box-border border border-primary focus:outline-secondary rounded-lg"
                    placeholder="Enter your last name"
                  />
                </div>
                <input
                  className="mt-5 py-3 px-3 w-full box-border border border-primary focus:outline-secondary rounded-lg"
                  placeholder="Enter your email"
                />
                <input
                  className="mt-5 py-3 px-3 w-full box-border border border-primary focus:outline-secondary rounded-lg"
                  placeholder="Enter subject"
                />
                <textarea
                  rows="4"
                  cols=""
                  className="mt-5 py-3 px-3 w-full box-border border border-primary focus:outline-secondary rounded-lg"
                ></textarea>
                <input
                  className="btn mt-5 bg-secondary !border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  type="submit"
                  value="Send Message"
                />
              </div>
            </RightImageMotion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
