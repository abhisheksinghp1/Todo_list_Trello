import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  onDelete: () => void;
};

function CardItem({
  id,
  title,
  onDelete,
}: Props) {

  const navigate = useNavigate();

  return (
    <div
            style={{
        background: "white",
        padding: "12px",
        marginTop: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow:
          "0 1px 4px rgba(0,0,0,0.15)",
      }}
      onClick={() =>
        navigate(`/cards/${id}`)
      }
    >
      <p>{title}</p>

    <button
  onClick={(e) => {
    e.stopPropagation();
    onDelete();
  }}
  style={{
    marginTop: "10px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Delete
</button>
    </div>
  );
}

export default CardItem;