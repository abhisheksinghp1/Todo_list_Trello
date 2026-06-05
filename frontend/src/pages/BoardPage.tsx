import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getLists,
  createList,
} from "../api/list";

import { moveCard } from "../api/card";

import ListColumn from "../components/List/ListColumn";
import CreateList from "../components/List/CreateList";

import socket from "../services/socket";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

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

    socket.onmessage = (
      event
    ) => {

      const data =
        JSON.parse(
          event.data
        );

      console.log(
        "Realtime Event:",
        data
      );

      if (
        data.event === "card_created" ||
        data.event === "card_deleted" ||
        data.event === "card_moved" ||
        data.event === "card_updated"
      ) {

        loadLists();
      }
    };

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

  const handleDragEnd =
    async (
      event: any
    ) => {

      console.log(
        "DRAG END FIRED"
      );

      const {
        active,
        over,
      } = event;

      console.log(
        "Active Card:",
        active?.id
      );

      console.log(
        "Target List:",
        over?.id
      );

      if (!over) {

        console.log(
          "NO DROP TARGET"
        );

        return;
      }

      try {

        await moveCard(
          Number(active.id),
          Number(over.id),
          0
        );

        console.log(
          "MOVE API SUCCESS"
        );

        await loadLists();

      } catch (error) {

        console.error(
          "Move Error:",
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

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={
          handleDragEnd
        }
      >

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            alignItems: "flex-start",
            overflowX: "auto",
          }}
        >

          {lists.map(
            (list) => (

              <ListColumn
                key={list.id}
                id={list.id}
                title={list.title}
              />

            )
          )}

        </div>

      </DndContext>

    </div>
  );
}

export default BoardPage;