import { useParams, useNavigate } from "react-router-dom";
import Tournament from "../components/Tournament";
import { toSlug } from "../lib/toSlug";
import { ChevronLeft } from "lucide-react";

export default function TournamentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const tourneys = [
    {
      id: 1,
      label: "Master Cho's Summer of Pain",
      isActive: true,
      slug: toSlug("Master Cho's Summer of Pain"),
    },
    {
      id: 2,
      label: "Master Cho's Fall of Pain",
      isActive: false,
      slug: toSlug("Master Cho's Fall of Pain"),
    },
    {
      id: 3,
      label: "Master Cho's Winter of Pain",
      isActive: false,
      slug: toSlug("Master Cho's Winter of Pain"),
    },
    {
      id: 4,
      label: "Master Cho's Spring of Pain",
      isActive: false,
      slug: toSlug("Master Cho's Spring of Pain"),
    },
  ];
  const tournament = tourneys.find((t) => t.slug === slug);

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <div className="flex gap-2">
          <ChevronLeft />
          back to dashboard
        </div>
      </button>
      <div className="p-4">
        <Tournament label={tournament?.label} />
      </div>
    </>
  );
}
