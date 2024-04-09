"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cubicBezier } from "framer-motion";

const Carousel = ({ children, maxElements = 3 }) => {
  const easing = cubicBezier(0.86, 0.21, 0.03, 1);

  const [currentIndex, setCurrentIndex] = useState(0);

  var [intervalStop, setIntervalStop] = useState(false);

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection, fromUser = true) => {
    if (fromUser) {
      intervalStop = true;
    }

    if (newDirection < 0 && currentIndex == 0) {
      setCurrentIndex(children.length - 1);
      return;
    } else {
      setCurrentIndex((prev) => (prev + 1 * newDirection) % children.length);
    }
  };

  const variants = {
    enter: (direction) => {
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
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  useEffect(() => {
    if (intervalStop) {
      clearTimeout(startTimer);
      setIntervalStop(false);
      return;
    }

    var startTimer = setInterval(() => {
      console.log(intervalStop);

      paginate(1, false);
    }, 4000);

    return () => {
      clearInterval(startTimer);
    };
  }, [intervalStop]);

  return (
    <AnimatePresence initial={false}>
      <div className="overflow-hidden padding-page ">
        <motion.div
          className="w-full h-full object-cover"
          variants={variants}
          key={"room-image2"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: easing,
            duration: 2,
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
          {children.slice(
            currentIndex * maxElements,
            Math.min(currentIndex * maxElements + maxElements, children.length)
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Carousel;
