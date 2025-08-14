import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Pagination from './Pagination';
import transactionsData from '@/data/transactions.json';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  recipientCountry: string;
  recipientName: string;
  status: string;
  deliveryMethod: string;
  trackingRef: string;
}

const TransactionHistory: React.FC = () => {
  const [transactions] = useState<Transaction[]>(transactionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const transactionsPerPage = 3;

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      searchTerm === '' ||
      transaction.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipientCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.trackingRef.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === '' || transaction.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'processing':
        return 'bg-yellow-500 text-white';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full scroll-smooth">
      <CardHeader className="scroll-smooth">
        <CardTitle className="flex items-center space-x-2"></CardTitle>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 scroll-smooth">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-green-600" />
            <Input
              placeholder="Search by recipient, country, or tracking reference..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterStatus === '' ? 'default' : 'outline'}
              size="sm"
              className="bg-[#2CD698] hover:bg-[#27c28c] text-white"
              onClick={() => {
                setFilterStatus('');
                setCurrentPage(1);
              }}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'Completed' ? 'default' : 'outline'}
              size="sm"
              className="bg-[#2CD698] hover:bg-[#27c28c] text-white"
              onClick={() => {
                setFilterStatus('Completed');
                setCurrentPage(1);
              }}
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === 'Processing' ? 'default' : 'outline'}
              size="sm"
              className="bg-[#2CD698] hover:bg-[#27c28c] text-white"
              onClick={() => {
                setFilterStatus('Processing');
                setCurrentPage(1);
              }}
            >
              Processing
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {currentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{transaction.recipientName}</h4>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {transaction.recipientCountry} • {transaction.deliveryMethod} • {formatDate(transaction.date)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ref: {transaction.trackingRef}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
                    <div className="text-right">
                      <p className="font-semibold">{transaction.currency} {transaction.amount.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-[#2CD698] hover:bg-[#27c28c] text-white"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
