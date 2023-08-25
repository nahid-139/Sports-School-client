import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import MiddleCardMotion from "../../motion/middleCardMotion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div className="w-full">
      <div className="navigation-wrapper">
        <div
          ref={sliderRef}
          className="keen-slider lg:h-[750px] md:h-[500px] h-[300px] relative"
        >
          <div className="!bg-[url('https://i.ibb.co/3CRTR4M/Sports-Banner.jpg')] !bg-cover keen-slider__slide number-slide1">
            <div className="bg-primary flex justify-center items-center w-full h-full bg-opacity-60">
              <MiddleCardMotion>
                <div>
                  <h1 className="lg:text-7xl md:text-4xl text-2xl text-center font-bold font-oswald text-white">
                    Welcome To <span className="text-secondary">Sports</span>{" "}
                    School
                  </h1>
                  <p className="md:text-xl text-base px-10 font-open_sans text-center mt-5 text-white">
                    Join our sports training class and be healthy
                  </p>
                </div>
              </MiddleCardMotion>
            </div>
          </div>
          <div className="!bg-[url('https://i.ibb.co/F4RGpdD/JHPBackgrounds-Core-Horizontal-Rebooku.jpg')] !bg-cover keen-slider__slide number-slide2">
            <div className="bg-primary flex justify-center items-center w-full h-full bg-opacity-60">
              <div>
                <h1 className="lg:text-7xl md:text-4xl text-2xl text-center font-bold font-oswald text-white">
                  Welcome To <span className="text-secondary">Sports</span>{" "}
                  School
                </h1>
                <p className="md:text-xl text-base px-10 font-open_sans text-center mt-5 text-white">
                  Join our sports training class and be healthy
                </p>
              </div>
            </div>
          </div>
          <div className="!bg-[url('https://i.ibb.co/TYjLmrX/crop.jpg')] !bg-cover keen-slider__slide number-slide3">
            <div className="bg-primary flex justify-center items-center w-full h-full bg-opacity-60">
              <div>
                <h1 className="lg:text-7xl md:text-4xl text-2xl text-center font-bold font-oswald text-white">
                  Welcome To <span className="text-secondary">Sports</span>{" "}
                  School
                </h1>
                <p className="md:text-xl text-base px-10 font-open_sans text-center mt-5 text-white">
                  Join our sports training class and be healthy
                </p>
              </div>
            </div>
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};
function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default Hero;
