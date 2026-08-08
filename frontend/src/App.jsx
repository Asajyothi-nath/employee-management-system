import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";

import AdminDashboard from "./pages/AdminDashboard";

import AdminHome from "./pages/AdminHome";

import AdminLayout from "./components/AdminLayout";

import AdminProfile from "./pages/AdminProfile";

import EmployeeDashboard from "./pages/EmployeeDashboard";

import AdminRoute from "./components/AdminRoute";

import EmployeeRoute from "./components/EmployeeRoute";

import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import EmployeeProfile from "./pages/EmployeeProfile";

function App() {

  return (

    <BrowserRouter>
        <ToastContainer />
        <Routes>

        {/* WEBSITE PAGES */}

        <Route path="/" element={
            <Navigate to = "/login" replace />
          }
        />

        <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        {/* ADMIN */}

        <Route path="/admin" element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
        >

          <Route path="home" element={<AdminHome />}/>

          <Route path="users" element={<AdminDashboard />}/>

          <Route path="profile" element={<AdminProfile />}/>

        </Route>

        {/* EMPLOYEE */}

        <Route path="/employee/dashboard" element={
            <EmployeeRoute>
              <DashboardLayout>
                <EmployeeDashboard />
                </DashboardLayout>
            </EmployeeRoute>
          }
        />

        <Route path="/employee/profile" element={
            <EmployeeRoute>
              <DashboardLayout>
                <EmployeeProfile />
                </DashboardLayout>
            </EmployeeRoute>
          }
        />

        <Route path="/signup" element={
            <Layout>
              <Signup />
            </Layout>
          }
        />

        {/* DASHBOARD */}

        <Route path="/dashboard" element={
          <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
          </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:token" element={<ResetPassword />}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;