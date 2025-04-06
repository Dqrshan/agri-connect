
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "../context/UserContext";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowUpRight, ArrowDownLeft, Search } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "buy" | "sell";
  crop: string;
  quantity: string;
  amount: string;
  status: "completed" | "pending" | "cancelled";
  counterparty: string;
}

const TransactionsPage: React.FC = () => {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock transaction data
  const mockTransactions: Transaction[] = [
    {
      id: "TX123456",
      date: "2025-04-01",
      type: userRole === "farmer" ? "sell" : "buy",
      crop: "Tomatoes",
      quantity: "100 kg",
      amount: "₹4,800",
      status: "completed",
      counterparty: userRole === "farmer" ? "Ankit Kumar" : "Rajesh Singh",
    },
    {
      id: "TX123457",
      date: "2025-03-25",
      type: userRole === "farmer" ? "sell" : "buy",
      crop: "Potatoes",
      quantity: "50 kg",
      amount: "₹1,600",
      status: "completed",
      counterparty: userRole === "farmer" ? "Vijay Sharma" : "Rajesh Singh",
    },
    {
      id: "TX123458",
      date: "2025-03-15",
      type: userRole === "farmer" ? "sell" : "buy",
      crop: "Onions",
      quantity: "75 kg",
      amount: "₹2,625",
      status: "pending",
      counterparty: userRole === "farmer" ? "Ankit Kumar" : "Rajesh Singh",
    },
    {
      id: "TX123459",
      date: "2025-03-10",
      type: userRole === "farmer" ? "sell" : "buy",
      crop: "Tomatoes",
      quantity: "30 kg",
      amount: "₹1,440",
      status: "cancelled",
      counterparty: userRole === "farmer" ? "Rahul Verma" : "Rajesh Singh",
    },
  ];
  
  // Filter transactions based on search term
  const filteredTransactions = mockTransactions.filter(transaction => 
    transaction.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by crop, ID or counterparty..."
          className="pl-10 p-2 border border-gray-300 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>{userRole === "farmer" ? "Buyer" : "Seller"}</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                          {formatDate(transaction.date)}
                        </TableCell>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.crop}</TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell>{transaction.counterparty}</TableCell>
                        <TableCell className="flex items-center">
                          {transaction.type === "sell" ? (
                            <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownLeft className="mr-2 h-4 w-4 text-blue-500" />
                          )}
                          {transaction.amount}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>{userRole === "farmer" ? "Buyer" : "Seller"}</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.filter(t => t.status === "completed").length > 0 ? (
                    filteredTransactions
                      .filter(t => t.status === "completed")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                            {formatDate(transaction.date)}
                          </TableCell>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.crop}</TableCell>
                          <TableCell>{transaction.quantity}</TableCell>
                          <TableCell>{transaction.counterparty}</TableCell>
                          <TableCell className="flex items-center">
                            {transaction.type === "sell" ? (
                              <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownLeft className="mr-2 h-4 w-4 text-blue-500" />
                            )}
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No completed transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>{userRole === "farmer" ? "Buyer" : "Seller"}</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.filter(t => t.status === "pending").length > 0 ? (
                    filteredTransactions
                      .filter(t => t.status === "pending")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                            {formatDate(transaction.date)}
                          </TableCell>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.crop}</TableCell>
                          <TableCell>{transaction.quantity}</TableCell>
                          <TableCell>{transaction.counterparty}</TableCell>
                          <TableCell className="flex items-center">
                            {transaction.type === "sell" ? (
                              <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownLeft className="mr-2 h-4 w-4 text-blue-500" />
                            )}
                            {transaction.amount}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No pending transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionsPage;
