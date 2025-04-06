import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/login";
import Register from "../components/Register";
import CartPage from "../pages/home/books/cartPage";
import CheckOutPage from "../pages/home/books/CheckOutPage.jsx";
import SingleBook from "../pages/home/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/home/books/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin/>,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard/>,
      },
      {
        path: "add-new-book",
        element: <AddBook/>,
      },
      {
        path: "edit-book/:id",
        element: <UpdateBook/>,
      },
      {
        path: "manage-books",
        element: <ManageBooks/>,
      },
    ],
  },
]);

export default router;
