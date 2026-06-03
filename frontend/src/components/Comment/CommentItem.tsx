type Props = {
  message: string;
  onDelete: () => void;
};

function CommentItem({
  message,
  onDelete,
}: Props) {

  return (
    <div
      style={{
        background: "#eee",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <p>{message}</p>

      <button
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default CommentItem;