import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppRouter from "./app/router/AppRouter";
import Navbar from "./components/layout/Navbar";
import AppLayout from "./components/layout/AppLayout";
import SplashScreen from "./components/common/SplashScreen";
import NotificationProvider from "./app/notifications/NotificationProvider";
import Footer from "./components/layout/Footer";
import RouteTitleManager from "./app/router/RouteTitleManager";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <NotificationProvider>
        <RouteTitleManager />

        <AnimatePresence>{loading && <SplashScreen />}</AnimatePresence>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <AppLayout>
              <AppRouter />
            </AppLayout>
            <Footer />
          </motion.div>
        )}
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
