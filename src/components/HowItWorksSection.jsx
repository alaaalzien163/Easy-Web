import React from "react";
import { motion } from "framer-motion";
import { Store, Package, UserRound, CreditCard } from "lucide-react";

const Step = (
  { icon, title, description, stepNumber } = {
    icon: <Store className="h-8 w-8" />,
    title: "Browse Stores",
    description: "Explore our partner stores and their products",
    stepNumber: 1,
  },
) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center max-w-xs"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: stepNumber * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <div className="bg-purple-100 p-6 rounded-full mb-6 border-4 border-white shadow-lg">
          <div className="text-purple-600">{icon}</div>
        </div>
        <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
          {stepNumber}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Store className="h-8 w-8" />,
      title: "Browse Stores",
      description:
        "Explore our partner stores and find the perfect products for your needs",
      stepNumber: 1,
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Select Products",
      description:
        "Choose from a wide variety of products and add them to your cart",
      stepNumber: 2,
    },
    {
      icon: <UserRound className="h-8 w-8" />,
      title: "Add Recipient Details",
      description:
        "Enter the delivery information for your recipient in Syria",
      stepNumber: 3,
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Complete Checkout",
      description:
        "Pay securely and we'll handle the delivery to your recipient",
      stepNumber: 4,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Send products to your loved ones in Syria with just a few simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-purple-200 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
            {steps.map((step) => (
              <Step
                key={step.stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
                stepNumber={step.stepNumber}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-purple-50 rounded-2xl p-8 max-w-2xl mx-auto border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Send Your First Products?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of people who trust Easy Shopping to deliver their
              products across Syria.
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
