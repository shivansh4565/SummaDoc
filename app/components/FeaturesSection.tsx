import { motion } from 'framer-motion';
import { FiFile, FiCheck, FiArrowRight } from 'react-icons/fi';

export default function FeaturesSection() {
  return (
    <section className="mt-24" id="features">
      <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Features
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: <FiFile className="w-8 h-8" />,
            title: 'Easy to Use',
            description: 'Simple drag and drop interface for quick PDF merging',
          },
          {
            icon: <FiCheck className="w-8 h-8" />,
            title: 'Secure',
            description: 'Your files are processed locally and never stored on our servers',
          },
          {
            icon: <FiArrowRight className="w-8 h-8" />,
            title: 'Fast Processing',
            description: 'Merge multiple PDFs in seconds with our optimized engine',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <div className="text-blue-500 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 