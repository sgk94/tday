import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentPage from "./pages/TournamentPage";
import AccountPage from "./pages/AccountPage";
import Layout from "./components/Layout";
import CreateTournamentPage from "./pages/CreateTournamentPage";
import EditTournamentPage from "./pages/EditTournamentPage";
import AdminPage from "./pages/AdminPage";
import RequireRole from "./components/RequireRole";
import RolePage from "./pages/RolePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />
        <Route element={<Layout />}>
          <Route
            path="/role"
            element={<RolePage />}
          />
          <Route element={<RequireRole allowed={["admin"]} />}>
            <Route
              path="/admin"
              element={<AdminPage />}
            />
          </Route>

          <Route
            element={
              <RequireRole allowed={["admin", "organizer", "competitor"]} />
            }
          >
            <Route
              path="/tournaments"
              element={<TournamentsPage />}
            />
            <Route
              path="/tournaments/:slug"
              element={<TournamentPage />}
            />
            <Route
              path="/tournaments/:slug/edit"
              element={<EditTournamentPage />}
            />
            <Route
              path="/tournaments/create"
              element={<CreateTournamentPage />}
            />
            <Route
              path="/account"
              element={<AccountPage />}
            />
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
