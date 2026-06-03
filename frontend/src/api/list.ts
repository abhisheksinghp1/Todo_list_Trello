import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getLists = async (
  boardId: number
) => {
  const response = await api.get(
    `/lists/${boardId}`
  );

  return response.data;
};

export const createList = async (
  boardId: number,
  title: string
) => {

  const response =
    await api.post(
      "/lists",
      {
        board_id: boardId,
        title,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};