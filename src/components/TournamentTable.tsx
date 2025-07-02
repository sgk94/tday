import type { Tournament } from "../types/tournament";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type TournamentTableProps = {
  tournaments: Tournament[];
};

export default function TournamentTable({ tournaments }: TournamentTableProps) {
  const navigate = useNavigate();
  const rows = tournaments.map((tournament) => {
    const formattedDateRangeFrom = tournament.dateRange.from
      ? format(new Date(tournament.dateRange.from), "MM/dd/yyyy")
      : "N/A";
    const formattedDateRangeTo = tournament.dateRange.to
      ? format(new Date(tournament.dateRange.to), "MM/dd/yyyy")
      : "N/A";
    return (
      <tr
        className="cursor-pointer border-b last:border-b-0 hover:bg-neutral-100"
        onClick={() => {
          navigate(`/tournaments/${tournament.slug}`);
        }}
      >
        <td className="p-3">{tournament.name}</td>
        <td className="p-3">{formattedDateRangeFrom}</td>
        <td className="p-3">{formattedDateRangeTo}</td>
        <td className="p-3">{tournament.location}</td>
        <td className="p-3">{tournament.isActive ? "active" : "inactive"}</td>
      </tr>
    );
  });
  return (
    <div className="border-1 overflow-hidden rounded-md border border-gray-200 shadow-md">
      <table className="w-full table-auto border-spacing-x-4 border-spacing-y-2">
        <thead>
          <tr className="bg-blue-300">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">From</th>
            <th className="p-3 text-left">To</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
