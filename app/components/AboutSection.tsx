import { FiFileText, FiShield, FiZap, FiUsers } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section className="mt-16 sm:mt-24 max-w-lg sm:max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-16" id="about">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          About PDF Merger
        </h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-6 sm:mb-8">
          Your trusted solution for combining PDF documents with ease and precision.
        </p>
        <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
          {[
            {
              icon: <FiFileText className="w-5 h-5 sm:w-6 sm:h-6" />,
              text: 'Merge multiple PDFs into a single, organized document',
            },
            {
              icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6" />,
              text: '100% secure - Your files never leave your device',
            },
            {
              icon: <FiZap className="w-5 h-5 sm:w-6 sm:h-6" />,
              text: 'Lightning-fast processing with our optimized engine',
            },
            {
              icon: <FiUsers className="w-5 h-5 sm:w-6 sm:h-6" />,
              text: 'Trusted by thousands of users worldwide',
            },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4">
              <span className="text-blue-500">{feature.icon}</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{feature.text}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 italic text-xs sm:text-base">
          Experience the future of PDF management with our intuitive, powerful, and free tool.
        </p>
      </div>
    </section>
  );
} 