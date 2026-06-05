import {
  useEffect,
  useState,
} from "react";

import {
  getCards,
  createCard,
  deleteCard,
} from "../../api/card";

import DraggableCard from "../Card/DraggableCard";
import CreateCard from "../Card/CreateCard";
import DroppableList from "./DroppableList";
import socket from "../../services/socket";

type Props = {
  id: number;
  title: string;
};

function ListColumn({
  id,
  title,
}: Props) {

  const [cards, setCards] =
    useState<any[]>([]);

  const loadCards = async () => {

    try {

      const data =
        await getCards(id);

      console.log(
        "List",
        id,
        data
      );

      setCards(data);

    } catch (error) {

      console.error(
        "Error loading cards:",
        error
      );
    }
  };

  useEffect(() => {

    loadCards();

    socket.onmessage = () => {

      loadCards();
    };

  }, [id]);

  const handleCreate =
    async (
      cardTitle: string
    ) => {

      try {

        await createCard(
          cardTitle,
          id
        );

        await loadCards();

      } catch (error) {

        console.error(
          "Error creating card:",
          error
        );
      }
    };

  const handleDelete =
    async (
      cardId: number
    ) => {

      console.log(
        "Deleting Card:",
        cardId
      );

      try {

        const result =
          await deleteCard(
            cardId
          );

        console.log(
          "Delete Response:",
          result
        );

        await loadCards();

      } catch (error) {

        console.error(
          "Delete Error:",
          error
        );
      }
    };

  return (
    <div
      style={{
        width: "300px",
        background: "#ebecf0",
        padding: "12px",
        borderRadius: "12px",
        minHeight: "400px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >

      <h3
        style={{
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h3>

      <CreateCard
        onCreate={
          handleCreate
        }
      />

      <DroppableList id={id}>

        {cards.map((card) => (

          <DraggableCard
            key={card.id}
            id={card.id}
            title={`${card.title} (ID:${card.id})`}
            onDelete={() =>
              handleDelete(
                card.id
              )
            }
          />

        ))}

      </DroppableList>

    </div>
  );
}

export default ListColumn;