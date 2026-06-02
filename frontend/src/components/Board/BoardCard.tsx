type Props = {
  title: string;
};

function BoardCard({
  title,
}: Props) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default BoardCard;