import clsx from "clsx";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Transaction {
  name: string;
  category: string;
  date: string;
  time: string;
  amount: number;
  note: string;
  status: "Completed" | "Pending" | "Failed";
}

const transactionsData: Transaction[] = [
  {
    name: "Internet Bill",
    category: "Utilities",
    date: "2028-03-05",
    time: "10:15:23",
    amount: 120.5,
    note: "Monthly broadband subscription",
    status: "Completed",
  },
  {
    name: "Grocery Shopping",
    category: "Shopping",
    date: "2028-03-07",
    time: "15:47:11",
    amount: 185.75,
    note: "Weekly groceries at supermarket",
    status: "Completed",
  },
  {
    name: "Concert Tickets",
    category: "Entertainment",
    date: "2028-02-28",
    time: "20:05:42",
    amount: 310.0,
    note: "Tickets for live music concert",
    status: "Failed",
  },
  {
    name: "Pharmacy Purchase",
    category: "Healthcare",
    date: "2028-02-10",
    time: "12:22:54",
    amount: 75.9,
    note: "Medicines and health supplements",
    status: "Completed",
  },
  {
    name: "Family Dinner",
    category: "Dining Out",
    date: "2028-02-15",
    time: "19:36:09",
    amount: 240.6,
    note: "Dinner with family at Thai restaurant",
    status: "Pending",
  },
  {
    name: "Fuel Refill",
    category: "Transport",
    date: "2028-03-06",
    time: "09:05:18",
    amount: 65.4,
    note: "Car fuel refill at local gas station",
    status: "Completed",
  },
  {
    name: "Clothing Purchase",
    category: "Shopping",
    date: "2028-02-20",
    time: "16:12:43",
    amount: 420.99,
    note: "New clothes for upcoming event",
    status: "Completed",
  },
  {
    name: "Gym Membership",
    category: "Fitness",
    date: "2028-03-01",
    time: "08:45:32",
    amount: 150.0,
    note: "Monthly gym subscription fee",
    status: "Completed",
  },
  {
    name: "Taxi Ride",
    category: "Transport",
    date: "2028-02-22",
    time: "21:50:07",
    amount: 32.75,
    note: "Late night ride home",
    status: "Failed",
  },
  {
    name: "Laptop Purchase",
    category: "Electronics",
    date: "2028-02-25",
    time: "14:30:55",
    amount: 1250.0,
    note: "New laptop for work and study",
    status: "Completed",
  },
];

const statusColor: Record<Transaction["status"], string> = {
  Completed: "text-green-600",
  Pending: "text-yellow-700",
  Failed: "text-red-600",
};

const dateOptions = ["This Month", "Last Month", "This Year", "Custom Range"];
const categoryOptions = [
  "All",
  "Payments",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Dining Out",
];

export default function RecentTransactions2() {
  const [selectedDate, setSelectedDate] = useState("This Month");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAction, setOpenAction] = useState<number | null>(null);

  const dateRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(transactions.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = transactions.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!(e.target as Element).closest(".action-menu")) {
        setOpenAction(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    setOpenAction(null);
  }, [currentPage]);

  const handleDelete = (index: number) => {
    const txn = transactions[index];
    if (confirm(`Delete "${txn.name}"? This can't be undone.`)) {
      setTransactions((prev) => {
        const next = prev.filter((_, i) => i !== index);
        const nextTotalPages = Math.max(
          1,
          Math.ceil(next.length / rowsPerPage)
        );
        if (currentPage > nextTotalPages) setCurrentPage(nextTotalPages);
        return next;
      });
    }
    setOpenAction(null);
  };

  const handleChangeStatus = (index: number, status: Transaction["status"]) => {
    setTransactions((prev) =>
      prev.map((t, i) => (i === index ? { ...t, status } : t))
    );
    setOpenAction(null);
  };

  return (
    <Card>
      <CardHeader className="p-6 flex items-center flex-row justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            <div className="relative" ref={dateRef}>
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="flex items-center gap-1 rounded-md border  bg-accent px-3 py-1.5 text-sm text-accent-foreground hover:bg-accent/90"
              >
                {selectedDate}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDateDropdown && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border bg-background shadow-md z-10">
                  {dateOptions.map((option) => (
                    <button
                      key={option}
                      className={clsx(
                        "w-full px-4 py-2 text-sm text-left hover:bg-accent",
                        option === selectedDate && "bg-accent/80 font-medium"
                      )}
                      onClick={() => {
                        setSelectedDate(option);
                        setShowDateDropdown(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={categoryRef}>
              {showCategoryDropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-md z-10">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      className={clsx(
                        "w-full px-4 py-2 text-sm text-left hover:bg-accent/50",
                        option === selectedCategory && "bg-accent font-medium"
                      )}
                      onClick={() => {
                        setSelectedCategory(option);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-accent text-accent-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Date & Time</th>
                <th className="px-4 py-2 font-medium">Amount</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Note</th>
                <th className="px-4 py-2 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((txn, idx) => {
                const globalIndex = startIndex + idx;
                return (
                  <tr
                    key={globalIndex}
                    className="border-t hover:bg-gray-50 dark:hover:bg-muted"
                  >
                    <td className="px-4 py-3 font-medium">{txn.name}</td>
                    <td className="px-4 py-3">{txn.category}</td>
                    <td className="px-4 py-3">
                      <div>{txn.date}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {txn.time}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ${txn.amount.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        statusColor[txn.status]
                      }`}
                    >
                      {txn.status}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {txn.note}
                    </td>

                    <td className="px-4 py-3 text-center relative action-menu">
                      <button
                        aria-label="Actions"
                        onClick={() =>
                          setOpenAction(
                            openAction === globalIndex ? null : globalIndex
                          )
                        }
                        className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                      >
                        ⋮
                      </button>

                      {openAction === globalIndex && (
                        <div
                          className="absolute right-2 mt-2 w-44 rounded-md border bg-white shadow-lg z-30"
                          style={{
                            top:
                              idx >= currentData.length - 2 ? "auto" : "100%",
                            bottom:
                              idx >= currentData.length - 2 ? "100%" : "auto",
                            marginTop:
                              idx >= currentData.length - 2 ? "0" : "0.5rem",
                            marginBottom:
                              idx >= currentData.length - 2 ? "0.5rem" : "0",
                          }}
                        >
                          <div className="border-t" />
                          <button
                            onClick={() =>
                              handleChangeStatus(globalIndex, "Completed")
                            }
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Completed
                          </button>
                          <button
                            onClick={() =>
                              handleChangeStatus(globalIndex, "Pending")
                            }
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() =>
                              handleChangeStatus(globalIndex, "Failed")
                            }
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          >
                            Failed
                          </button>
                          <div className="border-t" />
                          <button
                            onClick={() => handleDelete(globalIndex)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No transactions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            {transactions.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + currentData.length, transactions.length)} of{" "}
            {transactions.length} entries
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2 py-2 bg-accent text-accent-foreground border rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent hover:bg-accent/80"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-2 bg-accent text-accent-foreground border rounded disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
