"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Clock,
  FileText,
  MoreHorizontal,
  Printer,
  Search,
  X,
} from "lucide-react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { TRPCProvider, useTRPC, type AppRouter } from "../lib/trpc";
import { Link, useNavigate } from "react-router";

interface PrintJob {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  document: string;
  pages: number;
  copies: number;
  status: "queued" | "printing" | "paused" | "completed" | "error";
  submittedAt: Date;
  estimatedCompletion: Date;
  priority: "low" | "normal" | "high";
}

const mockJobs: PrintJob[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    document: "Q4_Financial_Report.pdf",
    pages: 45,
    copies: 3,
    status: "printing",
    submittedAt: new Date(Date.now() - 5 * 60 * 1000),
    estimatedCompletion: new Date(Date.now() + 8 * 60 * 1000),
    priority: "high",
  },
  {
    id: "2",
    user: { name: "Mike Johnson", email: "mike.j@company.com" },
    document: "Marketing_Presentation.pptx",
    pages: 24,
    copies: 10,
    status: "queued",
    submittedAt: new Date(Date.now() - 3 * 60 * 1000),
    estimatedCompletion: new Date(Date.now() + 15 * 60 * 1000),
    priority: "normal",
  },
  {
    id: "3",
    user: {
      name: "Emily Rodriguez",
      email: "e.rodriguez@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    document: "Employee_Handbook_v2.docx",
    pages: 78,
    copies: 1,
    status: "queued",
    submittedAt: new Date(Date.now() - 2 * 60 * 1000),
    estimatedCompletion: new Date(Date.now() + 25 * 60 * 1000),
    priority: "low",
  },
  {
    id: "4",
    user: { name: "David Park", email: "david.park@company.com" },
    document: "Contract_Amendment.pdf",
    pages: 12,
    copies: 2,
    status: "paused",
    submittedAt: new Date(Date.now() - 10 * 60 * 1000),
    estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000),
    priority: "high",
  },
  {
    id: "5",
    user: {
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    document: "Training_Materials.pdf",
    pages: 156,
    copies: 5,
    status: "queued",
    submittedAt: new Date(Date.now() - 1 * 60 * 1000),
    estimatedCompletion: new Date(Date.now() + 45 * 60 * 1000),
    priority: "normal",
  },
];

function getStatusColor(status: PrintJob["status"]) {
  switch (status) {
    case "printing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "queued":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "paused":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "error":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getPriorityColor(priority: PrintJob["priority"]) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "normal":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "low":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getTimeAgo(date: Date) {
  const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 min ago";
  return `${minutes} mins ago`;
}

export function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobs, setJobs] = useState(mockJobs);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.document.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const queueStats = {
    total: jobs.length,
    printing: jobs.filter((j) => j.status === "printing").length,
    queued: jobs.filter((j) => j.status === "queued").length,
    paused: jobs.filter((j) => j.status === "paused").length,
  };

  const handleCancelJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const handlePauseJob = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: "paused" as const } : job
      )
    );
  };

  const handleResumeJob = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: "queued" as const } : job
      )
    );
  };

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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by user or document name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="printing">Printing</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
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
                <TableHead>Document</TableHead>
                <TableHead>Pages/Copies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Est. Completion</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={job.user.avatar || "/placeholder.svg"}
                          alt={job.user.name}
                        />
                        <AvatarFallback>
                          {job.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{job.user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {job.user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{job.document}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{job.pages} pages</div>
                      <div className="text-muted-foreground">
                        {job.copies} {job.copies === 1 ? "copy" : "copies"}
                      </div>
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
                    <Badge
                      variant="outline"
                      className={getPriorityColor(job.priority)}
                    >
                      {job.priority.charAt(0).toUpperCase() +
                        job.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatTime(job.submittedAt)}</div>
                      <div className="text-muted-foreground">
                        {getTimeAgo(job.submittedAt)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatTime(job.estimatedCompletion)}</div>
                      <div className="text-muted-foreground">
                        {job.status === "printing"
                          ? "In progress"
                          : "Estimated"}
                      </div>
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
                        {job.status === "paused" ? (
                          <DropdownMenuItem
                            onClick={() => handleResumeJob(job.id)}
                          >
                            Resume Job
                          </DropdownMenuItem>
                        ) : job.status === "queued" ? (
                          <DropdownMenuItem
                            onClick={() => handlePauseJob(job.id)}
                          >
                            Pause Job
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem>Move to Top</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleCancelJob(job.id)}
                        >
                          Cancel Job
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
  const data = React.use(query.promise);
  //  const { nickname, date } = data
  console.log(data);

  const trpc = useTRPC();
  const userCreator = useMutation(trpc.setUserInfo.mutationOptions());
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    userCreator.mutate({ nickname });
    navigate("/passbook"); // 保存後にパスブックページへリダイレクト
  };

  return (
    <>
      <Component />
    </>
  );
}

export function App() {
  const trpc = useTRPC();
  const jobCatalogQuery = useQuery(trpc.getJobCatalog.queryOptions());
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
