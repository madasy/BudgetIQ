import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  MoreHorizontal,
  Plane,
  ShoppingCart,
  TrendingUp,
  Tv,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Define allowed category names
type Category =
  | "Income"
  | "Investments"
  | "Utilities"
  | "Food & Dining"
  | "Healthcare"
  | "Real Estate"
  | "Entertainment"
  | "Travel"
  | "Transport"
  | "Loans"
  | "Charity"
  | "Shopping"
  | "Other"
  | "Education";

// Define transaction data type
interface Transaction {
  name: string;
  category: Category;
  account: string;
  id: string;
  date: string;
  amount: string;
  note: string;
  status: "Completed" | "Pending" | "Failed";
}

// Define type for category icons
type CategoryIcons = Record<
  Category,
  React.ComponentType<{ className?: string }>
>;

// Map category to icons
const categoryIcons: CategoryIcons = {
  Income: Briefcase,
  Investments: TrendingUp,
  Utilities: Zap,
  "Food & Dining": ShoppingCart,
  Healthcare: Heart,
  "Real Estate": Home,
  Entertainment: Tv,
  Travel: Plane,
  Transport: Briefcase,
  Loans: Briefcase,
  Charity: Briefcase,
  Shopping: ShoppingCart,
  Other: Briefcase,
  Education: Briefcase,
};

// Example transaction data
const initialTransactions: Transaction[] = [
  {
    name: "Bonus Payment",
    category: "Income",
    account: "Platinum Plus Visa",
    id: "4567890135",
    date: "2024-09-25 11:00 AM",
    amount: "+$500.00",
    note: "Annual performance bonus",
    status: "Completed",
  },
  {
    name: "Stock Dividends",
    category: "Investments",
    account: "Freedom Unlimited Mastercard",
    id: "4567890136",
    date: "2024-09-24 09:00 AM",
    amount: "+$300.00",
    note: "Quarterly stock dividend",
    status: "Completed",
  },
  {
    name: "Comcast Bill Payment",
    category: "Utilities",
    account: "Platinum Plus Visa",
    id: "4567890123",
    date: "2024-09-24 10:30 AM",
    amount: "-$150.00",
    note: "Monthly internet and TV bill",
    status: "Completed",
  },
  {
    name: "Freelance Project",
    category: "Income",
    account: "Platinum Plus Visa",
    id: "4567890137",
    date: "2024-09-23 01:30 PM",
    amount: "+$1,200.00",
    note: "Payment for freelance design work",
    status: "Completed",
  },
  {
    name: "Amazon Purchase",
    category: "Food & Dining",
    account: "Freedom Unlimited Mastercard",
    id: "4567890124",
    date: "2024-09-23 03:45 PM",
    amount: "-$80.95",
    note: "Purchased kitchen appliances",
    status: "Completed",
  },
  {
    name: "Gym Membership",
    category: "Healthcare",
    account: "Freedom Unlimited Mastercard",
    id: "526790123",
    date: "2024-09-22 06:00 AM",
    amount: "-$45.00",
    note: "Monthly gym fee for health",
    status: "Pending",
  },
  {
    name: "Rental Income",
    category: "Real Estate",
    account: "Freedom Unlimited Mastercard",
    id: "4567890138",
    date: "2024-09-22 08:00 AM",
    amount: "+$2,500.00",
    note: "Monthly rent from property",
    status: "Completed",
  },
  {
    name: "State Farm Insurance",
    category: "Investments",
    account: "Freedom Unlimited Mastercard",
    id: "4567890126",
    date: "2024-09-21 09:00 AM",
    amount: "-$125.00",
    note: "Car insurance premium investment",
    status: "Completed",
  },
  {
    name: "Verizon Bill",
    category: "Utilities",
    account: "Platinum Plus Visa",
    id: "4567890127",
    date: "2024-09-20 09:30 AM",
    amount: "-$60.00",
    note: "Mobile phone bill",
    status: "Pending",
  },
  {
    name: "Electricity Bill",
    category: "Utilities",
    account: "Platinum Plus Visa",
    id: "4567890128",
    date: "2024-09-19 08:20 AM",
    amount: "-$70.00",
    note: "Home electricity bill",
    status: "Completed",
  },
  {
    name: "Uber Ride",
    category: "Transport",
    account: "Platinum Plus Visa",
    id: "4567890140",
    date: "2024-09-18 07:30 PM",
    amount: "-$25.50",
    note: "Trip to airport",
    status: "Completed",
  },
  {
    name: "Netflix Subscription",
    category: "Entertainment",
    account: "Freedom Unlimited Mastercard",
    id: "4567890141",
    date: "2024-09-18 09:00 AM",
    amount: "-$15.99",
    note: "Monthly subscription fee",
    status: "Completed",
  },
  {
    name: "Grocery Shopping",
    category: "Food & Dining",
    account: "Platinum Plus Visa",
    id: "4567890142",
    date: "2024-09-17 06:15 PM",
    amount: "-$120.40",
    note: "Weekly groceries at Walmart",
    status: "Completed",
  },
  {
    name: "Tax Refund",
    category: "Income",
    account: "Platinum Plus Visa",
    id: "4567890143",
    date: "2024-09-17 10:00 AM",
    amount: "+$800.00",
    note: "Federal tax refund",
    status: "Completed",
  },
  {
    name: "Car Loan Payment",
    category: "Loans",
    account: "Freedom Unlimited Mastercard",
    id: "4567890144",
    date: "2024-09-16 09:30 AM",
    amount: "-$350.00",
    note: "Monthly auto loan payment",
    status: "Completed",
  },
  {
    name: "Coffee Shop",
    category: "Food & Dining",
    account: "Platinum Plus Visa",
    id: "4567890145",
    date: "2024-09-16 08:45 AM",
    amount: "-$8.75",
    note: "Morning latte and croissant",
    status: "Completed",
  },
  {
    name: "Spotify Subscription",
    category: "Entertainment",
    account: "Freedom Unlimited Mastercard",
    id: "4567890146",
    date: "2024-09-15 02:00 PM",
    amount: "-$9.99",
    note: "Monthly music plan",
    status: "Completed",
  },
  {
    name: "Dividend Payout",
    category: "Investments",
    account: "Platinum Plus Visa",
    id: "4567890147",
    date: "2024-09-15 11:20 AM",
    amount: "+$220.00",
    note: "Quarterly dividends",
    status: "Completed",
  },
  {
    name: "Charity Donation",
    category: "Charity",
    account: "Platinum Plus Visa",
    id: "4567890148",
    date: "2024-09-14 05:30 PM",
    amount: "-$100.00",
    note: "Local community support",
    status: "Completed",
  },
  {
    name: "Flight Ticket",
    category: "Travel",
    account: "Freedom Unlimited Mastercard",
    id: "4567890149",
    date: "2024-09-14 09:00 AM",
    amount: "-$450.00",
    note: "Round trip to Chicago",
    status: "Pending",
  },
  {
    name: "Movie Theater",
    category: "Entertainment",
    account: "Platinum Plus Visa",
    id: "4567890150",
    date: "2024-09-13 07:45 PM",
    amount: "-$35.00",
    note: "Weekend movie with family",
    status: "Completed",
  },
  {
    name: "Interest Payment",
    category: "Investments",
    account: "Freedom Unlimited Mastercard",
    id: "4567890151",
    date: "2024-09-13 01:30 PM",
    amount: "+$60.00",
    note: "Bond interest income",
    status: "Completed",
  },
  {
    name: "Pharmacy Purchase",
    category: "Healthcare",
    account: "Platinum Plus Visa",
    id: "4567890152",
    date: "2024-09-12 04:15 PM",
    amount: "-$22.45",
    note: "Over-the-counter medicine",
    status: "Completed",
  },
  {
    name: "Pet Store",
    category: "Other",
    account: "Freedom Unlimited Mastercard",
    id: "4567890153",
    date: "2024-09-12 02:45 PM",
    amount: "-$55.00",
    note: "Pet food and toys",
    status: "Completed",
  },
  {
    name: "Concert Ticket",
    category: "Entertainment",
    account: "Platinum Plus Visa",
    id: "4567890154",
    date: "2024-09-11 08:00 PM",
    amount: "-$120.00",
    note: "Live music concert",
    status: "Completed",
  },
  {
    name: "Freelance Payment",
    category: "Income",
    account: "Platinum Plus Visa",
    id: "4567890155",
    date: "2024-09-11 03:00 PM",
    amount: "+$600.00",
    note: "Web development project",
    status: "Completed",
  },
  {
    name: "Hotel Booking",
    category: "Travel",
    account: "Freedom Unlimited Mastercard",
    id: "4567890156",
    date: "2024-09-10 05:30 PM",
    amount: "-$300.00",
    note: "2-night stay",
    status: "Completed",
  },
  {
    name: "Parking Fee",
    category: "Transport",
    account: "Platinum Plus Visa",
    id: "4567890157",
    date: "2024-09-10 08:15 AM",
    amount: "-$12.00",
    note: "City parking garage",
    status: "Completed",
  },
  {
    name: "Consulting Income",
    category: "Income",
    account: "Freedom Unlimited Mastercard",
    id: "4567890158",
    date: "2024-09-09 02:00 PM",
    amount: "+$1,000.00",
    note: "Business consulting fee",
    status: "Completed",
  },
  {
    name: "Streaming Service",
    category: "Entertainment",
    account: "Platinum Plus Visa",
    id: "4567890159",
    date: "2024-09-09 11:30 AM",
    amount: "-$19.99",
    note: "Disney+ subscription",
    status: "Completed",
  },
  {
    name: "Car Maintenance",
    category: "Transport",
    account: "Freedom Unlimited Mastercard",
    id: "4567890160",
    date: "2024-09-08 01:30 PM",
    amount: "-$250.00",
    note: "Oil change & tire rotation",
    status: "Completed",
  },
  {
    name: "Real Estate Income",
    category: "Real Estate",
    account: "Platinum Plus Visa",
    id: "4567890161",
    date: "2024-09-08 10:30 AM",
    amount: "+$3,000.00",
    note: "Apartment rent received",
    status: "Completed",
  },
  {
    name: "Student Loan Payment",
    category: "Loans",
    account: "Freedom Unlimited Mastercard",
    id: "4567890162",
    date: "2024-09-07 09:15 AM",
    amount: "-$200.00",
    note: "Monthly student loan repayment",
    status: "Completed",
  },
  {
    name: "Lunch with Friends",
    category: "Food & Dining",
    account: "Platinum Plus Visa",
    id: "4567890163",
    date: "2024-09-07 01:15 PM",
    amount: "-$45.20",
    note: "Casual lunch out",
    status: "Completed",
  },
  {
    name: "PayPal Transfer",
    category: "Other",
    account: "Freedom Unlimited Mastercard",
    id: "4567890164",
    date: "2024-09-06 08:45 AM",
    amount: "+$150.00",
    note: "Payment from friend",
    status: "Completed",
  },
  {
    name: "Shopping Mall",
    category: "Shopping",
    account: "Platinum Plus Visa",
    id: "4567890165",
    date: "2024-09-06 06:15 PM",
    amount: "-$280.00",
    note: "Clothes and accessories",
    status: "Completed",
  },
  {
    name: "Fuel Station",
    category: "Transport",
    account: "Freedom Unlimited Mastercard",
    id: "4567890166",
    date: "2024-09-05 07:00 AM",
    amount: "-$65.00",
    note: "Gas refill",
    status: "Completed",
  },
  {
    name: "Dividend Income",
    category: "Investments",
    account: "Platinum Plus Visa",
    id: "4567890167",
    date: "2024-09-05 11:30 AM",
    amount: "+$180.00",
    note: "ETF dividend",
    status: "Completed",
  },
  {
    name: "Hair Salon",
    category: "Other",
    account: "Freedom Unlimited Mastercard",
    id: "4567890168",
    date: "2024-09-04 03:30 PM",
    amount: "-$75.00",
    note: "Haircut & grooming",
    status: "Completed",
  },
  {
    name: "Tuition Fees",
    category: "Education",
    account: "Platinum Plus Visa",
    id: "4567890169",
    date: "2024-09-04 09:00 AM",
    amount: "-$1,200.00",
    note: "Semester fee",
    status: "Completed",
  },
  {
    name: "Health Insurance",
    category: "Healthcare",
    account: "Freedom Unlimited Mastercard",
    id: "4567890170",
    date: "2024-09-03 10:00 AM",
    amount: "-$250.00",
    note: "Monthly insurance premium",
    status: "Completed",
  },
  {
    name: "Side Hustle Payment",
    category: "Income",
    account: "Platinum Plus Visa",
    id: "4567890171",
    date: "2024-09-03 08:00 AM",
    amount: "+$400.00",
    note: "Part-time gig income",
    status: "Completed",
  },
  {
    name: "Water Bill",
    category: "Utilities",
    account: "Freedom Unlimited Mastercard",
    id: "4567890172",
    date: "2024-09-02 07:30 AM",
    amount: "-$45.00",
    note: "Monthly water usage",
    status: "Completed",
  },
  {
    name: "Magazine Subscription",
    category: "Entertainment",
    account: "Platinum Plus Visa",
    id: "4567890173",
    date: "2024-09-02 11:00 AM",
    amount: "-$12.99",
    note: "Digital magazine",
    status: "Completed",
  },
  {
    name: "Airbnb Booking",
    category: "Travel",
    account: "Freedom Unlimited Mastercard",
    id: "4567890174",
    date: "2024-09-01 05:00 PM",
    amount: "-$500.00",
    note: "Vacation stay",
    status: "Completed",
  },
  {
    name: "Salary Deposit",
    category: "Income",
    account: "Platinum Plus Visa",
    id: "4567890175",
    date: "2024-09-01 09:00 AM",
    amount: "+$4,500.00",
    note: "Monthly salary",
    status: "Completed",
  },
];

export default function TransactionsTable() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [page, setPage] = useState<number>(1);
  const pageSize: number = 10;

  const totalPages = Math.ceil(transactions.length / pageSize);
  const paginatedData = transactions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Update transaction status
  const updateStatus = (id: string, newStatus: Transaction["status"]) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {/* Filters (Commented out, but typed for completeness) */}
      {/* <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <Input placeholder="Search transaction" className="max-w-xs" />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="investments">Investments</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="visa">Visa</SelectItem>
            <SelectItem value="mastercard">MasterCard</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">Download</Button>
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full table-auto text-sm text-left">
          <TableHeader className="bg-accent text-accent-foreground">
            <TableRow>
              <TableHead className="px-4 py-2 font-medium">
                Transaction
              </TableHead>
              <TableHead className="px-4 py-2 font-medium">Category</TableHead>
              <TableHead className="px-4 py-2 font-medium">Account</TableHead>
              <TableHead className="px-4 py-2 font-medium">ID</TableHead>
              <TableHead className="px-4 py-2 font-medium">Date</TableHead>
              <TableHead className="px-4 py-2 font-medium">Amount</TableHead>
              <TableHead className="px-4 py-2 font-medium">Note</TableHead>
              <TableHead className="px-4 py-2 font-medium">Status</TableHead>
              <TableHead className="px-4 py-2 font-medium text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((t, i) => {
              const Icon = categoryIcons[t.category] || Briefcase;
              return (
                <TableRow key={i}>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-primary" />
                      {t.category}
                    </div>
                  </TableCell>
                  <TableCell>{t.account}</TableCell>
                  <TableCell>{t.id}</TableCell>
                  <TableCell className="min-w-32">{t.date}</TableCell>
                  <TableCell
                    className={
                      t.amount.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {t.amount}
                  </TableCell>
                  <TableCell>{t.note}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        t.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </TableCell>

                  {/* Action Column */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => updateStatus(t.id, "Completed")}
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateStatus(t.id, "Pending")}
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => updateStatus(t.id, "Failed")}
                        >
                          Failed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => deleteTransaction(t.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-4">
        <span className="text-sm text-gray-500 mb-1 md:mb-0">
          Showing {Math.min(page * pageSize, transactions.length)} of{" "}
          {transactions.length}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-1 py-2 rtl:rotate-180"
          >
            <ChevronLeft />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(i + 1)}
              className="px-2 py-2"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-1 py-2 rtl:rotate-180"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
