'use client';

import { motion } from 'framer-motion';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import PdfMergeUploader from './components/PdfMergeUploader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Merge PDFs with Ease
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Combine multiple PDF files into one document in seconds. Fast, secure, and free.
            </p>
          </motion.div>

          {/* Upload Area */}
          <PdfMergeUploader />

          {/* Features Section */}
          <FeaturesSection />

          {/* Pricing Section */}
          <PricingSection />
        </div>

        {/* Footer */}
        <footer className="mt-24 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              © {new Date().getFullYear()} PDF Merger. Made with{' '}
              <motion.span
                className="text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.2 }}
              >
                ♥
              </motion.span>{' '}
              & lots of{' '}
              <motion.span
                className="text-yellow-600 font-semibold"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: 'loop', ease: 'easeInOut' }}
              >
                chai
              </motion.span>{' '}
              by your friendly{' '}
              <span className="italic text-blue-600 dark:text-blue-400">Shivansh</span>.
            </motion.p>
          </div>
        </footer>
      </div>
    </div>
  );
}
