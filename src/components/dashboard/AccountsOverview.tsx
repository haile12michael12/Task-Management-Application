import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2, PiggyBank, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Demo data - will be replaced with real data
const accounts = [
  {
    id: 1,
    name: "Main Checking",
    institution: "Chase Bank",
    balance: 4250.00,
    type: "checking",
    icon: Building2,
  },
  {
    id: 2,
    name: "Savings Account",
    institution: "Ally Bank",
    balance: 12500.00,
    type: "savings",
    icon: PiggyBank,
  },
  {
    id: 3,
    name: "Credit Card",
    institution: "American Express",
    balance: -1250.00,
    type: "credit",
    icon: CreditCard,
  },
  {
    id: 4,
    name: "Investment",
    institution: "Fidelity",
    balance: 28750.00,
    type: "investment",
    icon: TrendingUp,
  },
];

const typeColors = {
  checking: "bg-primary/10 text-primary",
  savings: "bg-success/10 text-success",
  credit: "bg-warning/10 text-warning",
  investment: "bg-info/10 text-info",
};

export function AccountsOverview() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Accounts</CardTitle>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-xl font-bold">${totalBalance.toLocaleString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {accounts.map((account) => (
          <div 
            key={account.id} 
            className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              typeColors[account.type as keyof typeof typeColors]
            )}>
              <account.icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{account.name}</p>
              <p className="text-sm text-muted-foreground">{account.institution}</p>
            </div>
            
            <p className={cn(
              "font-semibold",
              account.balance < 0 ? "text-warning" : "text-foreground"
            )}>
              {account.balance < 0 ? "-" : ""}${Math.abs(account.balance).toLocaleString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
