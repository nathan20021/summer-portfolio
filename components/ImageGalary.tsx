import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
type props = {
  images: Array<string>;
};

const ImageGalary = ({ images }: props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <AnimatePresence initial={false} custom={direction}>
      <div id="image-galary" className="group relative w-full h-max md:h-full">
        <motion.div
          className="w-full h-full flex justify-center items-center"
          id="project-image"
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            if (images.length !== 1) {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }
          }}
        >
          <div
            id="haha"
            className="relative w-full h-full flex justify-center items-center"
          >
            <img
              src={images[imageIndex]}
              draggable={false}
              alt=""
              className="w-full aspect-[16/10] md:aspect-auto opacity-80 group-hover:opacity-100 hover:opacity-100 duration-150 ease-in-out"
            />
          </div>
        </motion.div>

        <motion.div style={{ opacity: 0 }}></motion.div>
        {images.length === 1 ? (
          void 0
        ) : (
          <div>
            <div
              className="next right-[10px] shadow-lg"
              onClick={() => paginate(1)}
            >
              <GrFormNext />
            </div>
            <div
              className="prev left-[10px] shadow-lg"
              onClick={() => paginate(-1)}
            >
              <GrFormPrevious />
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
export default ImageGalary;
