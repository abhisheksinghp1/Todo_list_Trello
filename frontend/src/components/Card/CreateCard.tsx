import { useState } from "react";

type Props = {
  onCreate: (
    title: string
  ) => void;
};

function CreateCard({
  onCreate,
}: Props) {

  const [title, setTitle] =
    useState("");

  return (
    <div>

<input
  placeholder="Enter card title..."
  value={title}
  onChange={(e) =>
    setTitle(e.target.value)
  }
  style={{
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  }}
/>

    <button
  onClick={() => {

    if (!title.trim())
      return;

    onCreate(title);

    setTitle("");
  }}
  style={{
    width: "100%",
    marginTop: "8px",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#0079bf",
    color: "white",
    fontWeight: "bold",
  }}
>
  Add Card
</button>

    </div>
  );
}

export default CreateCard;