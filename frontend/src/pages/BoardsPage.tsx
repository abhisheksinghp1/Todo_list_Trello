import { useEffect, useState } from "react";

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
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const handleCreate =
    async () => {

      if (!title.trim()) return;

      await createBoard(title);

      setTitle("");

      loadBoards();
    };

  return (
    <div style={{ padding: "20px" }}>

      <h1>My Boards</h1>

      <input
        value={title}
        placeholder="Board Name"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button
        onClick={handleCreate}
      >
        Create Board
      </button>

      <div>

        {boards.map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
          />
        ))}

      </div>

    </div>
  );
}

export default BoardsPage;