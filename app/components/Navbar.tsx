'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FiMenu, FiX, FiFileText, FiShield, FiZap, FiUsers } from 'react-icons/fi';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import AboutSection from './AboutSection';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutTooltip, setShowAboutTooltip] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const navItems = useMemo(() => [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { 
      name: 'About', 
      href: '#about', 
      description: {
        title: 'Welcome to PDF Merger',
        mainText: 'Your trusted solution for combining PDF documents with ease and precision.',
        features: [
          {
            icon: <FiFileText className="w-5 h-5" />,
            text: 'Merge multiple PDFs into a single, organized document'
          },
          {
            icon: <FiShield className="w-5 h-5" />,
            text: '100% secure - Your files never leave your device'
          },
          {
            icon: <FiZap className="w-5 h-5" />,
            text: 'Lightning-fast processing with our optimized engine'
          },
          {
            icon: <FiUsers className="w-5 h-5" />,
            text: 'Trusted by thousands of users worldwide'
          }
        ],
        footer: 'Experience the future of PDF management with our intuitive, powerful, and free tool.'
      }
    },
  ], []);

  return (
    <>
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                SummaDoc
              </span>
            </motion.div>

            {/* Desktop Nav + Auth */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center space-x-6"
            >
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <motion.a
                    href={item.href}
                    whileHover={{ y: -2 }}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onMouseEnter={() => item.description && setShowAboutTooltip(true)}
                    onMouseLeave={() => item.description && setShowAboutTooltip(false)}
                  >
                    {item.name}
                  </motion.a>
                  {item.description && showAboutTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="fixed left-1/2 top-20 z-50 -translate-x-1/2 w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                      style={{ minWidth: '320px' }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                        {item.description.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                        {item.description.mainText}
                      </p>
                      <div className="space-y-3">
                        {item.description.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="text-blue-500 mt-0.5">{feature.icon}</div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {feature.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic text-center">
                        {item.description.footer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Auth Buttons */}
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white hover:text-gray-200 font-medium"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white hover:text-gray-200 font-medium"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.description) {
                        setShowAboutModal(true);
                      }
                    }}
                  >
                    {item.name}
                  </motion.a>
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-white hover:text-gray-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-white hover:text-gray-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </motion.div>
        </div>
      </nav>
      {/* About Modal for Mobile */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-2" onClick={() => setShowAboutModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl" onClick={() => setShowAboutModal(false)}>&times;</button>
            <AboutSection />
          </div>
        </div>
      )}
    </>
  );
}
