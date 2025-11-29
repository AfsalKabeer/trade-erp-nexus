import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Eye,
  X,
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Receipt,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Select from "react-select";

// Re-use the same reusable components you already have
const Toast = ({ show, message, type }) =>
  show && (
    <div
      className={`fixed top-4 right-4 p-4 rounded-xl shadow-2xl text-white z-50 animate-slide-in ${
        type === "success"
          ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
          : "bg-gradient-to-r from-red-500 to-red-600"
      }`}
    >
      <div className="flex items-center space-x-3">
        {type === "success" ? (
          <CheckCircle size={20} className="animate-bounce" />
        ) : (
          <XCircle size={20} className="animate-pulse" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );

const StatCard = ({
  title,
  count,
  icon,
  bgColor,
  textColor,
  borderColor,
  iconBg,
  iconColor,
  subText,
}) => (
  <div
    className={`${bgColor} ${borderColor} rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-default`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 ${iconBg} rounded-xl shadow-md`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <span className={`text-xs ${textColor} font-semibold opacity-80`}>
        View Details →
      </span>
    </div>
    <h3
      className={`text-sm font-semibold ${textColor} mb-2 uppercase tracking-wide`}
    >
      {title}
    </h3>
    <p className="text-3xl font-bold text-gray-900 mb-1">{count}</p>
    <p className="text-xs text-gray-600 font-medium">{subText}</p>
  </div>
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const pageNumbers = useMemo(() => {
    const pages = [];
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const options = [
    { value: 10, label: "10 per page" },
    { value: 25, label: "25 per page" },
    { value: 50, label: "50 per page" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <span className="text-sm text-gray-600">Items per page:</span>
        <Select
          value={options.find((o) => o.value === itemsPerPage)}
          onChange={(opt) => onItemsPerPageChange(opt.value)}
          options={options}
          className="w-32"
          classNamePrefix="react-select"
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === p
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const CreditAccountsManagement = () => {
  // Dummy customers data
  const [customers] = useState([
    {
      id: "1",
      customerId: "CUST2025001",
      name: "Diamond Jewellers LLC",
      totalInvoices: 18,
      totalReceivable: 28450.0,
      totalReceived: 19800.5,
      balance: 8649.5,
    },
    {
      id: "2",
      customerId: "CUST2025002",
      name: "Elite Retail Chain",
      totalInvoices: 9,
      totalReceivable: 15678.0,
      totalReceived: 15678.0,
      balance: 0.0,
    },
    {
      id: "3",
      customerId: "CUST2025003",
      name: "Luxury Watches Dubai",
      totalInvoices: 22,
      totalReceivable: 67890.75,
      totalReceived: 42000.0,
      balance: 25890.75,
    },
  ]);

  // Dummy transactions for modal
  const dummyTransactions = [
    {
      type: "Sales Invoice",
      date: "28/11/2025",
      invNo: "SINV-20251128-001",
      paid: 8500.0,
      balance: 8500.0,
      ref: "-",
      status: "Unpaid",
    },
    {
      type: "Sales Invoice",
      date: "25/11/2025",
      invNo: "SINV-20251125-115",
      paid: 4200.0,
      balance: 0,
      ref: "RCVD-001",
      status: "Paid",
    },
    {
      type: "Sales Return",
      date: "22/11/2025",
      invNo: "SRTN-20251122-003",
      paid: 1250.0,
      balance: 0,
      ref: "RCVD-002",
      status: "Paid",
    },
    {
      type: "Sales Invoice",
      date: "18/11/2025",
      invNo: "SINV-20251118-087",
      paid: 9800.0,
      balance: 3149.5,
      ref: "-",
      status: "Partially Paid",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customerId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const paginated = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const stats = {
    totalCustomers: customers.length,
    totalReceivable: customers.reduce((s, c) => s + c.totalReceivable, 0),
    totalReceived: customers.reduce((s, c) => s + c.totalReceived, 0),
    totalBalance: customers.reduce((s, c) => s + c.balance, 0),
  };

  const openCustomerModal = (customer) => {
    setSelectedCustomer(customer);
    setTransactions(dummyTransactions);
    setModalOpen(true);
  };

  // +ve for Sales Invoice (green), -ve for Sales Return (red)
  const formatCurrency = (amount, isReturn = false) => (
    <span
      className={`font-bold ${isReturn ? "text-red-600" : "text-emerald-600"}`}
    >
      {isReturn ? "-" : "+"}AED {Math.abs(amount).toFixed(2).toLocaleString()}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 sm:p-6">
      <style>{`
        @keyframes slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .modal-backdrop { backdrop-filter: blur(8px); animation: fadeIn 0.2s ease-out; }
      `}</style>

      <Toast show={false} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Credit Accounts
            </h1>
            <p className="text-gray-600 mt-1 font-medium">
              {customers.length} total customers
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
            <RefreshCw size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Customers"
          count={stats.totalCustomers}
          icon={<Users size={24} />}
          bgColor="bg-emerald-50"
          textColor="text-emerald-700"
          borderColor="border-emerald-200"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          subText="Active buyers"
        />
        <StatCard
          title="Total Receivable"
          count={`AED ${stats.totalReceivable.toFixed(2).toLocaleString()}`}
          icon={<TrendingUp size={24} />}
          bgColor="bg-purple-50"
          textColor="text-purple-700"
          borderColor="border-purple-200"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          subText="All sales invoices"
        />
        <StatCard
          title="Total Received"
          count={`AED ${stats.totalReceived.toFixed(2).toLocaleString()}`}
          icon={<DollarSign size={24} />}
          bgColor="bg-blue-50"
          textColor="text-blue-700"
          borderColor="border-blue-200"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          subText="Collected amount"
        />
        <StatCard
          title="Outstanding"
          count={`AED ${stats.totalBalance.toFixed(2).toLocaleString()}`}
          icon={<AlertCircle size={24} />}
          bgColor="bg-red-50"
          textColor="text-red-700"
          borderColor="border-red-200"
          iconBg="bg-red-100"
          iconColor="text-red-600"
          subText="Due from customers"
        />
      </div>

      {/* Search */}
      <div className="max-w-md mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by customer name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all hover:border-gray-300"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Customer Credit Summary
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Click any customer to view transaction history
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                {[
                  "Customer ID",
                  "Customer Name",
                  "No of Invoices",
                  "Total Receivable",
                  "Total Received",
                  "Balance",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => openCustomerModal(c)}
                  className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-sm text-purple-700 font-bold">
                    {c.customerId}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-6 py-4 text-center">{c.totalInvoices}</td>
                  <td className="px-6 py-4">
                    AED {c.totalReceivable.toFixed(2).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-emerald-600">
                    AED {c.totalReceived.toFixed(2).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-red-600 font-bold">
                    AED {c.balance.toFixed(2).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1">
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Customer Details Modal */}
      {modalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/30 modal-backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Users size={28} /> {selectedCustomer.name}
                  </h3>
                  <p className="text-purple-100 mt-1">
                    Customer ID: {selectedCustomer.customerId}
                  </p>
                  <p className="text-xl font-bold mt-3">
                    Outstanding Receivable:{" "}
                    <span className="text-red-200">
                      AED {selectedCustomer.balance.toFixed(2).toLocaleString()}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition hover:rotate-90"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-8 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <input
                  type="date"
                  className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium"
                />
                <input
                  type="date"
                  className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium"
                />
                <select className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium">
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Partially Paid</option>
                </select>
                <select className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium">
                  <option>All Types</option>
                  <option>Sales Invoice</option>
                  <option>Sales Return</option>
                </select>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-y-auto max-h-96 p-6">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <tr>
                    {[
                      "Invoice Type",
                      "Inv Date",
                      "Inv No",
                      "Paid Amnt",
                      "Balance Amnt",
                      "Ref No",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((t, i) => {
                    const isReturn = t.type.includes("Return");
                    return (
                      <tr key={i} className="hover:bg-purple-50">
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isReturn
                                ? "bg-red-100 text-red-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">{t.date}</td>
                        <td className="px-6 py-4 font-mono font-bold">
                          {t.invNo}
                        </td>
                        <td className="px-6 py-4">
                          {formatCurrency(t.paid, isReturn)}
                        </td>
                        <td className="px-6 py-4 text-red-600 font-bold">
                          AED {t.balance.toFixed(2).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{t.ref}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                              t.status === "Paid" || isReturn
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditAccountsManagement;
