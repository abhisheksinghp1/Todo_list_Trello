import { useEffect } from "react";
import { useState } from "react";

import {
  getBoards,
  createBoard,
} from "../api/board";

import BoardCard from "../components/Board/BoardCard";

function BoardsPage() {

  const [boards, setBoards] =
    useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const loadBoards = async () => {

    const data =
      await getBoards();

    setBoards(data);
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const handleCreate =
    async () => {

      if (!title) return;

      await createBoard(title);

      setTitle("");

      loadBoards();
    };

  return (
    <div>

      <h1>
        My Boards
      </h1>

      <input
        placeholder="Board Name"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button
        onClick={handleCreate}
      >
        Create
      </button>

      <div>

        {boards.map((board) => (
          <BoardCard
            key={board.id}
            title={board.title}
          />
        ))}

      </div>

    </div>
  );
}

export default BoardsPage;