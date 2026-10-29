import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { PortfolioPage } from "./pages/PortfolioPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: PortfolioPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "home", Component: HomePage },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
