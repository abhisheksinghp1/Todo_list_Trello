import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getLists,
  createList,
} from "../api/list";

import ListColumn from "../components/List/ListColumn";
import CreateList from "../components/List/CreateList";

function BoardPage() {

  const { id } = useParams();

  const [lists, setLists] =
    useState<any[]>([]);

  const loadLists = async () => {
    try {

      const data =
        await getLists(
          Number(id)
        );

      setLists(data);

    } catch (error) {

      console.error(
        "Error loading lists:",
        error
      );
    }
  };

  useEffect(() => {
    loadLists();
  }, [id]);

  const handleCreateList =
    async (
      title: string
    ) => {

      try {

        await createList(
          Number(id),
          title
        );

        loadLists();

      } catch (error) {

        console.error(
          "Error creating list:",
          error
        );
      }
    };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#0079bf",
      }}
    >

      <h1
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Board {id}
      </h1>

      <CreateList
        onCreate={
          handleCreateList
        }
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          alignItems: "flex-start",
          overflowX: "auto",
        }}
      >

        {lists.map((list) => (

          <ListColumn
            key={list.id}
            id={list.id}
            title={list.title}
          />

        ))}

      </div>

    </div>
  );
}

export default BoardPage;