type Props = {
  filename: string;
  filepath: string;
  onDelete: () => void;
};

function AttachmentItem({
  filename,
  filepath,
  onDelete,
}: Props) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "6px",
        marginBottom: "10px",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {filename}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#555",
          }}
        >
          {filepath}
        </div>
      </div>
      <button
        onClick={onDelete}
        style={{
          background: "#d9534f",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default AttachmentItem;
