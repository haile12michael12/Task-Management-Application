import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Utensils, 
  Home, 
  Car, 
  Zap, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo data - will be replaced with real data from database
const transactions = [
  {
    id: 1,
    description: "Grocery Store",
    category: "Food & Dining",
    amount: -125.50,
    date: "Today",
    icon: Utensils,
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: 4500.00,
    date: "Yesterday",
    icon: DollarSign,
  },
  {
    id: 3,
    description: "Electric Bill",
    category: "Utilities",
    amount: -89.00,
    date: "Jan 18",
    icon: Zap,
  },
  {
    id: 4,
    description: "Amazon",
    category: "Shopping",
    amount: -234.99,
    date: "Jan 17",
    icon: ShoppingBag,
  },
  {
    id: 5,
    description: "Rent Payment",
    category: "Housing",
    amount: -1800.00,
    date: "Jan 15",
    icon: Home,
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <Badge variant="outline" className="text-xs">
          View All
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                transaction.amount > 0 
                  ? "bg-success/10 text-success" 
                  : "bg-muted text-muted-foreground"
              )}>
                <transaction.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
              </div>
              
              <div className="text-right">
                <p className={cn(
                  "font-semibold",
                  transaction.amount > 0 ? "text-success" : "text-foreground"
                )}>
                  {transaction.amount > 0 ? "+" : ""}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
