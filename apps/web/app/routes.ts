import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./landing/page.tsx"),
  route("passbook", "./passbook/page.tsx"),
] satisfies RouteConfig;
