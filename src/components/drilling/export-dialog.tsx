import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import * as XLSX from "xlsx";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { Download } from "lucide-react";

interface ExportDialogProps {
  data: any[];
  columns: { header: string; accessorKey: string }[];
}

export function ExportDialog({ data, columns }: ExportDialogProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map((col) => col.accessorKey),
  );
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const handleExport = () => {
    // Filter data based on date range
    const filteredData = data.filter((row) => {
      const rowDate = new Date(row.date);
      return rowDate >= dateRange.from && rowDate <= dateRange.to;
    });

    // Create worksheet with selected columns only
    const exportData = filteredData.map((row) => {
      const exportRow: any = {};
      selectedColumns.forEach((col) => {
        exportRow[col] = row[col];
      });
      return exportRow;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Drilling Report");

    // Generate and download file
    XLSX.writeFile(wb, `drilling-report-${new Date().toISOString()}.xlsx`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-green-800 bg-green-800 text-white">
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Drilling Report</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Date Range</Label>
            <DatePickerWithRange
              date={dateRange}
              setDate={(date) => {
                if (date.from && date.to) {
                  setDateRange({ from: date.from, to: date.to });
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Columns</Label>
            <div className="grid grid-cols-2 gap-2">
              {columns.map((column) => (
                <div
                  key={column.accessorKey}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={column.accessorKey}
                    checked={selectedColumns.includes(column.accessorKey)}
                    onCheckedChange={(checked) => {
                      setSelectedColumns(
                        checked
                          ? [...selectedColumns, column.accessorKey]
                          : selectedColumns.filter(
                              (col) => col !== column.accessorKey,
                            ),
                      );
                    }}
                  />
                  <Label htmlFor={column.accessorKey}>{column.header}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={handleExport}>Download Excel</Button>
      </DialogContent>
    </Dialog>
  );
}
