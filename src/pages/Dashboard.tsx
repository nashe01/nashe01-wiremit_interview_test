import React from 'react';
import { motion } from 'framer-motion';
import { Send, LogOut, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SendMoney from '@/components/SendMoney';
import TransactionHistory from '@/components/TransactionHistory';
import AdsCarousel from '@/components/AdsCarousel';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { useRates } from '@/context/RatesContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { refreshRates, loading: ratesLoading } = useRates();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 scroll-smooth">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo.png" 
                alt="WireMit Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-lg font-semibold gradient-text">WireMit</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome, {user?.firstName}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Logout button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                style={{ color: '#2CD698', borderColor: '#2CD698' }}
              >
                <LogOut className="w-4 h-4 mr-2 text-[#2CD698]" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-smooth">
        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-3 space-y-8 scroll-smooth order-2 lg:order-1">
            {/* Ads Banner (Top of main content on desktop) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="dashboard-glass rounded-xl shadow-lg p-0 overflow-hidden hidden lg:block"
            >
              <AdsCarousel variant="banner" />
            </motion.section>

            {/* Send Money Section (mobile/tablet only) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="dashboard-glass rounded-xl overflow-hidden shadow-lg p-6 lg:hidden"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Send className="w-5 h-5 text-[#2CD698]" />
                <h2 className="text-xl font-semibold text-[#2CD698]">Send Money</h2>
              </div>
              <SendMoney />
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
            {/* Ads on small/medium screens (keep existing design) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dashboard-glass rounded-xl shadow-lg p-4 h-64 lg:hidden"
            >
              <AdsCarousel />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="dashboard-glass rounded-xl shadow-lg p-6 h-64 lg:h-79"
            >
              <h3 className="text-lg font-semibold mb-4 text-[#2CD698]">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sent:</span>
                  <span className="font-medium">$2,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transactions:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Transfers:</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop divider between Ads and Send Money */}
        <div className="relative items-center justify-center my-8 hidden lg:flex">
          <span className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 px-4 text-2xl font-semibold" style={{ color: '#2CD698' }}>
            Start a transfer
          </span>
        </div>

        {/* Full-Width Send Money Section (desktop) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dashboard-glass rounded-xl overflow-hidden shadow-lg max-w-full mx-auto p-6 hidden lg:block mt-4"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Send className="w-5 h-5 text-[#2CD698]" />
            <h2 className="text-xl font-semibold text-[#2CD698]">Send Money</h2>
          </div>
          <SendMoney />
        </motion.section>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-8">
          <span className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 px-4 text-2xl font-semibold" style={{ color: '#2CD698' }}>
            Your past activity
          </span>
        </div>

        {/* Full-Width Transaction History Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dashboard-glass rounded-xl shadow-lg max-w-full mx-auto p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5 text-[#2CD698]" />
            <h2 className="text-xl font-semibold text-[#2CD698]">Transaction History</h2>
          </div>
          <TransactionHistory />
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;


