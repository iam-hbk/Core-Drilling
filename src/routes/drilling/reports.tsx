import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormsStore } from "@/lib/stores/use-forms-store";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ExportDialog } from "@/components/drilling/export-dialog";

export const Route = createFileRoute("/drilling/reports")({
  component: DrillingReportsPage,
});

export default function DrillingReportsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Get data from Zustand store
  const { drillingRecords, progressReports, coreSamples } = useFormsStore();

  // Define columns
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Project Details",
        columns: [
          {
            accessorKey: "projectName",
            header: ({ column }) => (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Project Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            ),
          },
          {
            accessorKey: "holeId",
            header: "Hole ID",
          },
        ],
      },
      {
        header: "Drilling Metrics",
        columns: [
          {
            accessorKey: "depth",
            header: "Depth (m)",
            cell: ({ row }) => {
              const depth = row.getValue("depth");
              return (
                <div className="text-right">
                  {typeof depth === "number" ? depth.toFixed(2) : "-"}
                </div>
              );
            },
          },
          {
            accessorKey: "coreRecovery",
            header: "Recovery (%)",
            cell: ({ row }) => {
              const recovery = row.getValue("coreRecovery");
              return (
                <div className="text-right">
                  {typeof recovery === "number"
                    ? `${recovery.toFixed(1)}%`
                    : "-"}
                </div>
              );
            },
          },
        ],
      },
      {
        header: "Core Analysis",
        columns: [
          {
            accessorKey: "rockType",
            header: "Rock Type",
          },
          {
            accessorKey: "mineralogy",
            header: "Mineralogy",
          },
        ],
      },
    ],
    [],
  );

  // Combine and transform data
  const combinedData = useMemo(() => {
    return drillingRecords.map((record) => {
      // Find matching progress report
      const progress = progressReports.find((p) => p.siteId === record.holeId);
      // Find matching core sample
      const core = coreSamples.find((c) => c.holeId === record.holeId);

      return {
        ...record,
        ...progress,
        ...core,
      };
    });
  }, [drillingRecords, progressReports, coreSamples]);

  const table = useReactTable({
    data: combinedData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Create a flat array of columns for the export dialog
  const flatColumns = useMemo(() => {
    const flat: { header: string; accessorKey: string }[] = [];
    columns.forEach((col) => {
      if ('columns' in col && col.columns) {
        col.columns.forEach((subCol) => {
          if ('accessorKey' in subCol) {
            flat.push({
              header: subCol.header as string,
              accessorKey: subCol.accessorKey as string,
            });
          }
        });
      }
    });
    return flat;
  }, [columns]);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Drilling Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive view of drilling operations
            </p>
          </div>
          <ExportDialog data={combinedData} columns={flatColumns} />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
