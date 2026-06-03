import { useState } from "react";

type Props = {
  onCreate: (
    message: string
  ) => void;
};

function CreateComment({
  onCreate,
}: Props) {

  const [message, setMessage] =
    useState("");

  return (
    <div>

      <input
        value={message}
        placeholder="Comment..."
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={() => {

          if (!message.trim())
            return;

          onCreate(message);

          setMessage("");
        }}
      >
        Add Comment
      </button>

    </div>
  );
}

export default CreateComment;