import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getCards = async (
  listId: number
) => {

  const response =
    await api.get(
      `/cards/list/${listId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const createCard = async (
  title: string,
  listId: number
) => {

  const response =
    await api.post(
      "/cards",
      {
        title,
        description: "",
        list_id: listId,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const deleteCard = async (
  cardId: number
) => {

  const response =
    await api.delete(
      `/cards/${cardId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};


export const moveCard = async (
  cardId: number,
  listId: number,
  position: number
) => {

  return api.put(
    `/cards/${cardId}/move`,
    {
      list_id: listId,
      position,
    }
  );
};

export const getCard = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/cards/${cardId}`
    );

  return response.data;
};