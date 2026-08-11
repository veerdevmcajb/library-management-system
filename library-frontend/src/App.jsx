import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Dashboard from "./pages/Dashboard";

import BooksList from "./pages/books/BooksList";
import AddBook from "./pages/books/AddBooks";
import EditBook from "./pages/books/EditBook";

import UsersList from "./pages/users/UserList";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUsers";

import BorrowBook from "./pages/borrow/BorrowBook";
import BorrowHistory from "./pages/borrow/BorrowHistory";

import Register from "./pages/auth/Registration";
import Login from "./pages/auth/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import Layout from "./components/Layout";
import AdminBorrowHistory from "./pages/borrow/AdminBorrowHistory";


function App() {

  return (

    <Routes>


      {/* =========================
                PUBLIC ROUTES
            ========================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =========================
                LOGGED-IN ROUTES
            ========================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>


          {/* Dashboard */}

          <Route
            path="/"
            element={<Dashboard />}
          />


          {/* =====================
                        BOOK ROUTES
                    ====================== */}

          {/* USER + ADMIN */}

          <Route
            path="/books"
            element={<BooksList />}
          />


          {/* =====================
                        ADMIN BOOK ROUTES
                    ====================== */}

          <Route element={
            <RoleRoute
              allowedRoles={["ROLE_ADMIN"]}
            />
          }>

            <Route
              path="/books/add"
              element={<AddBook />}
            />

            <Route
              path="/books/edit/:id"
              element={<EditBook />}
            />

          </Route>


          {/* =====================
                        ADMIN USER ROUTES
                    ====================== */}

          <Route element={
            <RoleRoute
              allowedRoles={["ROLE_ADMIN"]}
            />
          }>

            <Route
              path="/users"
              element={<UsersList />}
            />

            <Route
              path="/users/add"
              element={<AddUser />}
            />

            <Route
              path="/users/edit/:id"
              element={<EditUser />}
            />

          </Route>


          {/* =====================
                        BORROW ROUTES
                    ====================== */}

          {/* USER + ADMIN */}

          <Route
            path="/borrow"
            element={<BorrowBook />}
          />

          <Route
            path="/history"
            element={<BorrowHistory />}
          />

          <Route
            path="/admin/borrow-history"
            element={<AdminBorrowHistory />}
          />


        </Route>

      </Route>


      {/* =========================
                UNKNOWN URL
            ========================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;