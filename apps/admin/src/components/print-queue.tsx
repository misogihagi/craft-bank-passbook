"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, FileText, MoreHorizontal, Printer, X } from "lucide-react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { TRPCProvider, useTRPC, type AppRouter } from "../lib/trpc";
import { Link } from "react-router";

interface PrintJob {
  id: number;
  nickname: string;
  pages: number;
  date: Date;
  status: "Printing" | "Paused" | "Queued";
  count: number;
}

function getStatusColor(status: PrintJob["status"]) {
  switch (status) {
    case "Printing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Queued":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Paused":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTimeAgo(date: Date) {
  const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 min ago";
  return `${minutes} mins ago`;
}

export function Component({
  jobs,
  mutate,
}: {
  jobs: PrintJob[];
  mutate: (i: number) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.nickname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const queueStats = {
    total: jobs.length,
    printing: jobs.filter((j) => j.status === "Printing").length,
    queued: jobs.filter((j) => j.status === "Queued").length,
    paused: jobs.filter((j) => j.status === "Paused").length,
  };

  const handleCancelJob = (jobId: string) => {};

  const handlePauseJob = (jobId: string) => {};

  const handleResumeJob = (jobId: string) => {};

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Print Queue</h1>
          <p className="text-muted-foreground">
            Monitor and manage print jobs across all printers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Printer className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            HP LaserJet Pro 4000
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Currently Printing
            </CardTitle>
            <Printer className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {queueStats.printing}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Queue</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {queueStats.queued}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paused</CardTitle>
            <X className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {queueStats.paused}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Print Jobs</CardTitle>
          <CardDescription>
            {filteredJobs.length} of {jobs.length} jobs shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Pages/Copies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{job.nickname}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{job.pages} pages</div>
                      <div className="text-muted-foreground">{job.count}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(job.status)}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatTime(job.date)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => mutate(job.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// アクションボタンコンポーネント
export function ActionButtons({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="mt-8 space-y-4">
      <button
        id="save-changes-button"
        className="w-full bg-blue-600 text-white py-3 rounded-full font-medium cursor-pointer" // Tailwindのprimaryをblue-600に仮定
        onClick={onSubmit}
      >
        変更を保存
      </button>
      <Link
        to="/passbook"
        className="block w-full text-center text-gray-600 py-3 cursor-pointer"
      >
        キャンセル
      </Link>
    </div>
  );
}

// メインのAppコンポーネント
export function Main<T, U>({ query }: { query: UseQueryResult<T, U> }) {
  const data = React.use(query.promise) as {
    id: number;
    nickname: string;
    pages: number;
    date: string;
    status: "Printing" | "Paused" | "Queued";
    count: number;
  }[];

  const service = (jobs: typeof data): PrintJob[] => {
    return jobs.map((job) => ({
      ...job,
      date: new Date(job.date),
    }));
  };

  const trpc = useTRPC();
  const printCreator = useMutation(trpc.print.mutationOptions());

  return (
    <>
      <Component jobs={service(data)} mutate={printCreator.mutate} />
    </>
  );
}

export function App() {
  const trpc = useTRPC();
  const jobCatalogQuery = useQuery(trpc.getJobCatalog.queryOptions());
  const getJobByIdQuery = useQuery(trpc.getJobById.queryOptions(1));
  const printCreator = useMutation(trpc.print.mutationOptions());

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Main query={jobCatalogQuery} />
      </React.Suspense>
    </>
  );
}

const AppWithQuery = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
      },
    },
  });

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:3011/trpc",
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <App />
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export default AppWithQuery;
