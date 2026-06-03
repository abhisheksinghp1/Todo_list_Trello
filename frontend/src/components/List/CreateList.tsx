import { useState } from "react";

type Props = {
  onCreate: (
    title: string
  ) => void;
};

function CreateList({
  onCreate,
}: Props) {

  const [title, setTitle] =
    useState("");

  return (
    <div>

      <input
        placeholder="List Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button
        onClick={() => {

          if (!title.trim())
            return;

          onCreate(title);

          setTitle("");
        }}
      >
        Add List
      </button>

    </div>
  );
}

export default CreateList;