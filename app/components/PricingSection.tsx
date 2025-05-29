import { motion } from 'framer-motion';
import { useState } from 'react';

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, type: 'spring' }
  })
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 * i, duration: 0.4 }
  })
};

export default function PricingSection() {
  const [showMessage, setShowMessage] = useState(false);
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      color: 'text-blue-600',
      border: 'border-blue-100 dark:border-gray-700',
      features: [
        'Merge up to 3 PDFs at once',
        'Basic support',
        'Watermark on output',
      ],
      button: <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg font-medium cursor-not-allowed opacity-70" disabled>Current Plan</button>,
      cardClass: 'shadow-lg',
    },
    {
      name: 'Pro',
      price: '₹299',
      sub: '/month',
      color: 'text-purple-600',
      border: 'border-purple-200 dark:border-purple-700',
      features: [
        'Merge 100 PDFs',
        'No watermark',
        'Priority support',
        'Faster processing',
      ],
      button: <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition-transform">Get Pro</button>,
      cardClass: 'shadow-xl scale-105',
    },
    {
      name: 'Yearly',
      price: '₹2199',
      sub: '/year',
      color: 'text-yellow-600',
      border: 'border-gray-700',
      features: [
        'All Pro features',
        'Best value for power users',
        'Priority support',
        'Cancel anytime',
      ],
      badge: (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-yellow-900 font-semibold text-xs shadow-lg border border-yellow-300 animate-bounce"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 1.2, ease: 'easeInOut' }}
        >
          Save 38%
        </motion.div>
      ),
      button: <button className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition-transform">Get Yearly</button>,
      cardClass: 'shadow-2xl scale-110 z-10',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      color: 'text-blue-600',
      border: 'border-blue-100 dark:border-gray-700',
      features: [
        'All Pro features',
        'Team management',
        'Unlimited PDFs',
        'Dedicated support',
        'Custom integrations',
      ],
      button: <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors">Contact Sales</button>,
      cardClass: 'shadow-lg',
    },
  ];

  return (
    <section className="mt-24 mb-24 max-w-5xl mx-auto px-2" id="pricing">
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
            <span className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">
              The website is in production / development mode, so all the plans are free
            </span>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setShowMessage(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Pricing
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-12"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`relative rounded-2xl bg-white dark:bg-gray-800 p-8 flex flex-col items-center border-2 ${plan.border} ${plan.cardClass}`}
            variants={cardVariants}
            custom={i}
            whileHover={{ y: -8, scale: 1.05 }}
            onClick={() => setShowMessage(true)}
            style={{ cursor: 'pointer' }}
          >
            {plan.badge}
            <h3 className="text-2xl font-semibold mb-2 mt-4">{plan.name}</h3>
            <div className={`text-3xl font-bold mb-4 ${plan.color}`}>{plan.price}{plan.sub && <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{plan.sub}</span>}</div>
            <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-300 text-center">
              {plan.features.map((feature, idx) => (
                <motion.li
                  key={feature}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={featureVariants}
                  custom={idx}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
            {plan.button}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}