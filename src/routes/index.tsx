import Add from "@/pages/add";
import Detail from "@/pages/detail";
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
  {
    path: "/detail/:id",
    component: Detail,
    children: [],
  },
];

export default routeList
