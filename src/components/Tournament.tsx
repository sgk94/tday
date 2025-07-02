import { useParams } from "react-router-dom";

interface TournamentProps {
  label: string | undefined;
}

export default function Tournament({ label }: TournamentProps) {
  const { id } = useParams();

  return (
    <h1>
      {label} {id}
    </h1>
  );
}
