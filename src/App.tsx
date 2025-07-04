import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./routes/PrivateRoute";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentPage from "./pages/TournamentPage";
import AccountPage from "./pages/AccountPage";
import Layout from "./components/Layout";
import CreateTournamentPage from "./pages/CreateTournamentPage";
import EditTournamentPage from "./pages/EditTournamentPage";
import AdminPage from "./pages/AdminPage";

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
        <Route element={<Layout />}>
          <Route
            path="/admin"
            element={<AdminPage />}
          />
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
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
