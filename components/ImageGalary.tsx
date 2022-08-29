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
    <>
      <AnimatePresence initial={false} custom={direction}>
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
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <div className="relative">
            <motion.div
              whileHover={{ opacity: 0 }}
              className="absolute bg-primary opacity-20 z-[1000] w-full h-full"
            ></motion.div>
            <img src={images[imageIndex]} draggable={false} alt="" />
          </div>
        </motion.div>

        <motion.div style={{ opacity: 0 }}></motion.div>
      </AnimatePresence>
      <div className="next right-[10px] shadow-lg" onClick={() => paginate(1)}>
        <GrFormNext />
      </div>
      <div className="prev left-[10px] shadow-lg" onClick={() => paginate(-1)}>
        <GrFormPrevious />
      </div>
    </>
  );
};
export default ImageGalary;