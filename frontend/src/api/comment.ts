import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getComments = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/comments/${cardId}`
    );

  return response.data;
};

export const createComment = async (
  cardId: number,
  message: string
) => {

  const response =
    await api.post(
      "/comments",
      {
        card_id: cardId,
        message,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const deleteComment = async (
  commentId: number
) => {

  const response =
    await api.delete(
      `/comments/${commentId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};