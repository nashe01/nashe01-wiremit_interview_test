import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, LogOut, User, History, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [activeTab, setActiveTab] = useState('send');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold gradient-text">WireMit</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.firstName}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshRates}
                disabled={ratesLoading}
                className="hidden sm:flex"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${ratesLoading ? 'animate-spin' : ''}`} />
                Refresh Rates
              </Button>
              
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                  <TabsTrigger value="send" className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Money</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center space-x-2">
                    <History className="w-4 h-4" />
                    <span>History</span>
                  </TabsTrigger>
                  <TabsTrigger value="overview" className="hidden lg:flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="send" className="space-y-6">
                  <SendMoney />
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  <TransactionHistory />
                </TabsContent>

                <TabsContent value="overview" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-elevated"
                  >
                    <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Full Name:</span>
                        <span className="font-medium">
                          {user?.firstName} {user?.middleName} {user?.secondName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{user?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Status:</span>
                        <span className="font-medium text-success">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member Since:</span>
                        <span className="font-medium">January 2024</span>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AdsCarousel />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-elevated"
            >
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
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
      </main>
    </div>
  );
};

export default Dashboard;