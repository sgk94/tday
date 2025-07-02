import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./routes/PrivateRoute";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentPage from "./pages/TournamentPage";
import AccountPage from "./pages/AccountPage";
import Layout from "./components/Layout";
import CreateTournamentPage from "./pages/CreateTournamentPage";

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
            path="/tournaments"
            element={<TournamentsPage />}
          />
          <Route
            path="/tournaments/:slug"
            element={<TournamentPage />}
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
