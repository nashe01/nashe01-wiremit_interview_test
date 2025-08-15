import React from 'react';
import { motion } from 'framer-motion';
import { Send, LogOut, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SendMoney from '@/components/SendMoney';
import TransactionHistory from '@/components/TransactionHistory';
import AdsCarousel from '@/components/AdsCarousel';
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
    <div className="min-h-screen bg-background scroll-smooth">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40"
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
                  Welcome back, {user?.firstName}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Logout button with green text and border */}
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
          <div className="lg:col-span-3 space-y-8 scroll-smooth">
            
            {/* Send Money Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 p-6 bg-[#1F1F1F] rounded-xl shadow-lg border border-[#2CD698]/40"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Send className="w-5 h-5 text-[#2CD698]" />
                <h2 className="text-xl font-semibold text-[#2CD698]">Send Money</h2>
              </div>
              <SendMoney />
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-4 bg-[#1F1F1F] rounded-xl shadow-lg border border-[#2CD698]/40"
            >
              <AdsCarousel />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-[#1F1F1F] rounded-xl shadow-lg border border-[#2CD698]/40"
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
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-8">
          <span className="bg-background px-4 text-sm font-medium" style={{ color: '#2CD698' }}>
            Your past activity
          </span>
        </div>

        {/* Full-Width Transaction History Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 p-6 bg-[#1F1F1F] rounded-xl shadow-lg border border-[#2CD698]/40 max-w-full mx-auto"
        >
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5 text-[#2CD698]" />
            <h2 className="text-xl font-semibold text-[#2CD698]">Transaction History</h2>
          </div>
          <TransactionHistory />
        </motion.section>
      </main>
    </div>
  );
};

export default Dashboard;


