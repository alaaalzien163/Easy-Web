import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = ({
  title = "Send to your loved once in syria",
  subtitle = "Send , goods , groceries or whatever needs to your family and friends .",
  ctaText = "Start Shopping",
} = {}) => {
  return (
    <section className="relative w-full min-h-[700px] bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="space-y-8 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Animation Container */}
        <div className="relative h-[400px] md:h-[500px]">
          <ShoppingCartAnimation />
        </div>
      </div>
    </section>
  );
};

const ShoppingCartAnimation = () => {
  const cartVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    initial: { y: -50, opacity: 0 },
    animate: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.3, duration: 0.5 },
    }),
  };
  const giftVariants = {
    initial: { scale: 1, x: 0 },
    animate: {
      scale: [1, 1.1, 1],
      x: [0, 20, 200],
      opacity: [1, 1, 0],
      transition: {
        duration: 2,
        times: [0, 0.3, 1],
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-purple-100"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Shopping cart */}
      <motion.div
        className="relative z-10"
        variants={cartVariants}
        initial="initial"
        animate="animate"
      >
        <div className="relative bg-white p-6 rounded-xl shadow-xl w-72 h-80 flex flex-col border border-gray-100">
          <div className="text-xl font-bold mb-4 text-purple-600 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
            Shopping Cart
          </div>

          {/* Cart items */}
          <div className="flex-1 space-y-3">
            <motion.div
              className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100"
              variants={itemVariants}
              custom={0}
              initial="initial"
              animate="animate"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">🍫</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                Chocolate Box
              </div>
            </motion.div>

            <motion.div
              className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100"
              variants={itemVariants}
              custom={1}
              initial="initial"
              animate="animate"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">🌹</span>
              </div>
              <div className="text-sm font-medium text-gray-700">Flowers</div>
            </motion.div>

            <motion.div
              className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100"
              variants={itemVariants}
              custom={2}
              initial="initial"
              animate="animate"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-xs font-bold">🎁</span>
              </div>
              <div className="text-sm font-medium text-gray-700">Gift Card</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Gift flying animation */}
      <motion.div
        className="absolute z-20 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg"
        variants={giftVariants}
        initial="initial"
        animate="animate"
      >
        <span className="text-white text-xl">🎁</span>
      </motion.div>
    </div>
  );
};

export default HeroSection;
