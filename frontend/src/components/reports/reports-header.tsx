import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Share2 } from "lucide-react";

export function ReportsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-wide">
          Financial Reports
        </h1>
        <p className="text-sm text-muted-foreground tracking-wide">
          Analyze your financial data and trends
        </p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Select defaultValue="may2024">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="may2024">May 2024</SelectItem>
            <SelectItem value="apr2024">April 2024</SelectItem>
            <SelectItem value="mar2024">March 2024</SelectItem>
            <SelectItem value="feb2024">February 2024</SelectItem>
            <SelectItem value="jan2024">January 2024</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
