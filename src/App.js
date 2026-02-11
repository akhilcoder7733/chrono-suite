import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/AppRouter";
import Navbar from "./components/layout/Navbar";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
