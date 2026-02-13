import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ApplicationPage from "../pages/ApplicationPage";
import Success from "../pages/Success";
import NotFound from "../pages/NotFound";


/* 
* AppRouter
* It handle all route of the application
*/
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Wrapper */}
        <Route element={<MainLayout />}>
          {/* Application Wizard Page */}
          <Route path="/" element={<ApplicationPage />} />
        </Route>
          {/* Success Wizard Page */}
        <Route path="/success" element={<Success />} />
        {/* 404 Page */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
