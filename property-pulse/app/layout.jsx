import "@/assets/styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./components/AuthProvider";

export const metadata = {
  title: "Property Pulse",
  description: "Find your next short stay property",
  keywords: "property, short stay, rental, accommodation",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer hideProgressBar autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
