import Add from "@/pages/add";
import Home from "@/pages/home";

export interface RouteItem {
	path: string
	component: () => JSX.Element
	children?: RouteItem[]
}

const routeList: RouteItem[] = [
  {
    path: "/",
    component: Home,
    children: [],
  },
  {
    path: "/add",
    component: Add,
    children: [],
  },
];

export default routeList
