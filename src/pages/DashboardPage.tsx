import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTournamentStore } from "../store/useTournamentStore";
import { Loader } from "lucide-react";
import TournamentTable from "../components/TournamentTable";

export default function DashboardPage() {
  const { tournaments, isLoading, error, fetchTournaments } =
    useTournamentStore();

  useEffect(() => {
    fetchTournaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mb-[30px] flex justify-end">
        <div className="flex h-[35px] w-[200px] items-center justify-center rounded-md bg-blue-700 text-white hover:bg-blue-800">
          <Link to="/tournaments/create">Create New Tournament</Link>
        </div>
      </div>

      {isLoading && <Loader className="animate-spin" />}
      {error && <p className="text-red-500">{error}</p>}

      {tournaments.length === 0 && !isLoading ? (
        <p>No Tournaments yet</p>
      ) : (
        <>
          <TournamentTable tournaments={tournaments} />
        </>
      )}
    </>
  );
}
