import {
  useEffect,
  useState,
} from "react";

import {
  getCards,
  createCard,
  deleteCard,
} from "../../api/card";

import CardItem from "../Card/CardItem";
import CreateCard from "../Card/CreateCard";

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

        loadCards();
      } catch (error) {
        console.error(
          "Error creating card:",
          error
        );
      }
    };


const handleDelete = async (
  cardId: number
) => {

  try {

    await deleteCard(cardId);

    loadCards();

  } catch (error) {

    console.error(
      "Error deleting card:",
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

    {cards.map((card) => (
  <CardItem
  key={card.id}
  id={card.id}
  title={card.title}
  onDelete={() =>
    handleDelete(card.id)
  }
/>
))}

    </div>
  );
}

export default ListColumn;