import React, { useState, useMemo, useCallback } from "react";
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Eye,
  X,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Receipt,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";
import Select from "react-select";

// Reusable Components from your existing code
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
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const itemsPerPageOptions = [
    { value: 10, label: "10 per page" },
    { value: 25, label: "25 per page" },
    { value: 50, label: "50 per page" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <span className="text-sm text-gray-600">Items per page:</span>
        <Select
          value={itemsPerPageOptions.find(
            (option) => option.value === itemsPerPage
          )}
          onChange={(option) => onItemsPerPageChange(option.value)}
          options={itemsPerPageOptions}
          className="w-32"
          classNamePrefix="react-select"
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft size={16} />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const DebitAccountsManagement = () => {
  const [vendors] = useState([
    {
      id: "1",
      vendorId: "VEND2025001",
      name: "ABC Bullion Trading LLC",
      totalInvoices: 12,
      totalPayable: 18450.75,
      totalPaid: 15275.28,
      balance: 3175.47,
    },
    {
      id: "2",
      vendorId: "VEND2025002",
      name: "Global Suppliers Ltd",
      totalInvoices: 8,
      totalPayable: 9875.0,
      totalPaid: 9875.0,
      balance: 0.0,
    },
    {
      id: "3",
      vendorId: "VEND2025003",
      name: "Premier Electronics",
      totalInvoices: 15,
      totalPayable: 45678.9,
      totalPaid: 32100.0,
      balance: 13578.9,
    },
  ]);

  const dummyTransactions = [
    {
      type: "Purchase Invoice",
      date: "17/10/2025",
      invNo: "PURV-20251017-059",
      paid: 7350.0,
      balance: 7350.0,
      ref: "-",
      status: "Unpaid",
    },
    {
      type: "Purchase Invoice",
      date: "17/10/2025",
      invNo: "PURV-20251017-510",
      paid: 4000.0,
      balance: 4000.0,
      ref: "-",
      status: "Unpaid",
    },
    {
      type: "Purchase Return",
      date: "15/10/2025",
      invNo: "PRTN-20251015-214",
      paid: 619.97,
      balance: 0,
      ref: "PYMT-001",
      status: "Paid",
    },
    {
      type: "Purchase Invoice",
      date: "10/10/2025",
      invNo: "PURV-20251010-971",
      paid: 5000.0,
      balance: 0,
      ref: "PYMT-003",
      status: "Paid",
    },
    {
      type: "Purchase Return",
      date: "08/10/2025",
      invNo: "PRTN-20251008-105",
      paid: 1200.0,
      balance: 0,
      ref: "PYMT-002",
      status: "Paid",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const filteredVendors = useMemo(() => {
    return vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vendors, searchTerm]);

  const paginated = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const stats = {
    totalVendors: vendors.length,
    totalPayable: vendors.reduce((s, v) => s + v.totalPayable, 0),
    totalPaid: vendors.reduce((s, v) => s + v.totalPaid, 0),
    totalBalance: vendors.reduce((s, v) => s + v.balance, 0),
  };

  const openVendorModal = (vendor) => {
    setSelectedVendor(vendor);
    setTransactions(dummyTransactions);
    setModalOpen(true);
  };

  const formatCurrency = (amount, isNegative = false) => (
    <span
      className={`font-bold ${
        isNegative ? "text-red-600" : "text-emerald-600"
      }`}
    >
      {isNegative ? "-" : "+"}AED {Math.abs(amount).toFixed(2).toLocaleString()}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 sm:p-6">
      <style>{`
        @keyframes slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .modal-backdrop { backdrop-filter: blur(8px); animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <Toast show={false} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Debit Accounts
            </h1>
            <p className="text-gray-600 mt-1 font-medium">
              {vendors.length} total vendors
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
            <RefreshCw size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stat Cards - EXACT SAME STYLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Vendors"
          count={stats.totalVendors}
          icon={<Users size={24} />}
          bgColor="bg-emerald-50"
          textColor="text-emerald-700"
          borderColor="border-emerald-200"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          subText="Active suppliers"
        />
        <StatCard
          title="Total Payable"
          count={`AED ${stats.totalPayable.toFixed(2).toLocaleString()}`}
          icon={<TrendingUp size={24} />}
          bgColor="bg-purple-50"
          textColor="text-purple-700"
          borderColor="border-purple-200"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          subText="All invoices"
        />
        <StatCard
          title="Total Paid"
          count={`AED ${stats.totalPaid.toFixed(2).toLocaleString()}`}
          icon={<DollarSign size={24} />}
          bgColor="bg-blue-50"
          textColor="text-blue-700"
          borderColor="border-blue-200"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          subText="Cleared amount"
        />
        <StatCard
          title="Outstanding"
          count={`AED ${stats.totalBalance.toFixed(2).toLocaleString()}`}
          icon={<DollarSign size={24} />}
          bgColor="bg-red-50"
          textColor="text-red-700"
          borderColor="border-red-200"
          iconBg="bg-red-100"
          iconColor="text-red-600"
          subText="Due balance"
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
            placeholder="Search by vendor name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all hover:border-gray-300"
          />
        </div>
      </div>

      {/* Vendor Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Vendor Debit Summary
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Click any vendor to view transaction history
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                {[
                  "Vendor ID",
                  "Vendor Name",
                  "No of Invoices",
                  "Total Payable",
                  "Total Paid",
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
              {paginated.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => openVendorModal(v)}
                  className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-sm text-purple-700 font-bold">
                    {v.vendorId}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {v.name}
                  </td>
                  <td className="px-6 py-4 text-center">{v.totalInvoices}</td>
                  <td className="px-6 py-4">
                    AED {v.totalPayable.toFixed(2).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-emerald-600">
                    AED {v.totalPaid.toFixed(2).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-red-600 font-bold">
                    AED {v.balance.toFixed(2)}
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

      {/* Vendor Details Modal */}
      {modalOpen && selectedVendor && (
        <div className="fixed inset-0 bg-black/30 modal-backdrop flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Users size={28} /> {selectedVendor.name}
                  </h3>
                  <p className="text-purple-100 mt-1">
                    Vendor ID: {selectedVendor.vendorId}
                  </p>
                  <p className="text-xl font-bold mt-3">
                    Outstanding:{" "}
                    <span className="text-red-200">
                      AED {selectedVendor.balance.toFixed(2)}
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
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div>
                  <input
                    type="date"
                    className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium"
                  />
                </div>
                <div>
                  <select className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium">
                    <option>All Status</option>
                    <option>Paid</option>
                    <option>Unpaid</option>
                    <option>Partially Paid</option>
                  </select>
                </div>
                <div>
                  <select className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none text-gray-700 font-medium">
                    <option>All Types</option>
                    <option>Purchase Invoice</option>
                    <option>Purchase Return</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transaction Table */}
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
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-purple-50">
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            t.type.includes("Return")
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
                        {formatCurrency(t.paid, t.type.includes("Return"))}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-bold">
                        AED {t.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{t.ref}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                            t.status === "Paid"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebitAccountsManagement;
