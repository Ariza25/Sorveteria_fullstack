import slide1 from "../images/header.webp";
import slide2 from "../images/slide2.webp";
import slide3 from "../images/slide3.webp";

import { useState, useEffect, useCallback } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
  const slides = [slide1, slide2, slide3];
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };
  const nextSlide = useCallback(() => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  }, [currentSlide, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <>
      <div className="max-w-[1400px] h-[460px] w-full m-auto pb-10 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentSlide]})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        ></div>
        <div className="hidden group-hover:block absolute top-[45%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <FaArrowAltCircleLeft size={30} onClick={prevSlide} />
        </div>
        <div className="hidden group-hover:block absolute top-[45%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <FaArrowAltCircleRight size={30} onClick={nextSlide} />
        </div>
        <div className="flex top-4 justify-center py-2 shadow-sm">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer "
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
