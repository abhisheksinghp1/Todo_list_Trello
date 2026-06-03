import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  title: string;
};

function BoardCard({
  id,
  title,
}: Props) {

  const navigate =
    useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/boards/${id}`)
      }
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "10px",
        cursor: "pointer",
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default BoardCard;