import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTournamentStore } from "../store/useTournamentStore";
import { Loader, Plus } from "lucide-react";
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
      <div className="mb-[10px] mt-[20px] flex justify-end">
        <div className="flex h-[35px] w-[200px] items-center justify-center rounded-md bg-blue-700 text-white hover:bg-blue-800">
          <Link to="/tournaments/create">
            <div className="flex gap-2">
              <Plus /> Create Tournament
            </div>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center gap-2">
          <Loader className="animate-spin" />
          <p>Loading ...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tournaments.length === 0 ? (
        <p>No Tournaments yet</p>
      ) : (
        <TournamentTable tournaments={tournaments} />
      )}
    </>
  );
}
