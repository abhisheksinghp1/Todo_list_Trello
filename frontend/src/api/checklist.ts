import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getChecklists = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/checklists/${cardId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const createChecklist = async (
  title: string,
  cardId: number
) => {

  const response =
    await api.post(
      "/checklists",
      {
        title,
        card_id: cardId,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const toggleChecklist = async (
  checklistId: number,
  completed: boolean
) => {

  const response =
    await api.put(
      `/checklists/${checklistId}`,
      {
        completed,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const deleteChecklist = async (
  checklistId: number
) => {

  const response =
    await api.delete(
      `/checklists/${checklistId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};