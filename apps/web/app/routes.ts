import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./landing/page.tsx"),
  route("passbook", "./passbook/page.tsx"),
  route("passbook/new", "./passbook/new/page.tsx"),
  route("passbook/user", "./passbook/user/page.tsx"),
] satisfies RouteConfig;
