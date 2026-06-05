import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getActivities = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/activities/${cardId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const createActivity = async (
  cardId: number,
  message: string
) => {

  const response =
    await api.post(
      "/activities",
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