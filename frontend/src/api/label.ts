import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getLabels = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/labels/${cardId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const createLabel = async (
  name: string,
  color: string,
  cardId: number
) => {

  const response =
    await api.post(
      "/labels",
      {
        name,
        color,
        card_id: cardId,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};