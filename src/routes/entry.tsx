import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes, { RouteItem } from "./index";

export default function RouterEntry() {
  return (
    <BrowserRouter basename="/storybook">
      <Routes>
        {routes.map((route: RouteItem) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}
