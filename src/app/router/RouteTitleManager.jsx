import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routeTitles from "./routeTitles";

const APP_NAME = "Chrono Suite";

const RouteTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // 1️⃣ Exact match
    let pageTitle = routeTitles[pathname];

    // 2️⃣ If not exact, check partial match (for future nested routes)
    if (!pageTitle) {
      const matchedRoute = Object.keys(routeTitles).find((route) =>
        route !== "*" && pathname.startsWith(route)
      );

      if (matchedRoute) {
        pageTitle = routeTitles[matchedRoute];
      }
    }

    // 3️⃣ Fallback to wildcard
    if (!pageTitle) {
      pageTitle = routeTitles["*"];
    }

    document.title = pageTitle
      ? `${pageTitle} | ${APP_NAME}`
      : APP_NAME;

  }, [location.pathname]);

  return null;
};

export default RouteTitleManager;
