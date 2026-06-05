type Props = {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

function ChecklistItem({
  title,
  completed,
  onToggle,
  onDelete,
}: Props) {

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
      }}
    >

      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />

      <span
        style={{
          textDecoration:
            completed
              ? "line-through"
              : "none",
        }}
      >
        {title}
      </span>

      <button
        onClick={onDelete}
      >
        Delete
      </button>

    </div>
  );
}

export default ChecklistItem;