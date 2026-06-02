import { api } from "./client";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getBoards = async () => {
  const response = await api.get(
    "/boards",
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};

export const createBoard = async (
  title: string
) => {
  const response = await api.post(
    "/boards",
    { title },
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};

export const deleteBoard = async (
  boardId: number
) => {
  const response = await api.delete(
    `/boards/${boardId}`,
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};