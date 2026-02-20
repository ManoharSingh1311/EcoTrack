import { Link } from 'react-router-dom';
import { Wrench, Globe, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

function Home() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-5xl mx-auto"
      >
        <motion.div
          className="flex justify-center mb-6"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Sparkles className="w-16 h-16 text-green-600 dark:text-green-400" />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4 sm:mb-6"
        >
          Welcome to EcoTrack
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 font-medium px-4"
        >
          Your Local Community Sharing Platform
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
        >
          Share tools, equipment, and items with your neighbors. Build a sustainable
          community by reducing waste and promoting sharing.
        </motion.p>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="backdrop-blur-lg bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 p-6 sm:p-8 rounded-xl shadow-lg border border-green-200/50 dark:border-green-700/50"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-green-100 dark:bg-green-800 p-3 sm:p-4 rounded-full"
              >
                <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
              </motion.div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-white">Share Tools</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Lend your tools to neighbors and borrow what you need
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="backdrop-blur-lg bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200/50 dark:border-blue-700/50"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-blue-100 dark:bg-blue-800 p-3 sm:p-4 rounded-full"
              >
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-white">Reduce Waste</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Promote sustainability by sharing instead of buying
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="backdrop-blur-lg bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 p-6 sm:p-8 rounded-xl shadow-lg border border-purple-200/50 dark:border-purple-700/50 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-purple-100 dark:bg-purple-800 p-3 sm:p-4 rounded-full"
              >
                <HeartHandshake className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-white">Build Community</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Connect with your neighbors and strengthen local bonds
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <MagneticButton className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl">
            <Link to="/register" className="flex items-center">
              <span>Get Started</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </MagneticButton>
          
          <MagneticButton className="inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <Link to="/login" className="flex items-center">
              <span>Login</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
