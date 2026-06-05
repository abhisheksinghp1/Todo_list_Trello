import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getAttachments = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/attachments/${cardId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const createAttachment = async (
  filename: string,
  filepath: string,
  cardId: number
) => {

  const response =
    await api.post(
      "/attachments",
      {
        filename,
        filepath,
        card_id: cardId,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const deleteAttachment = async (
  attachmentId: number
) => {

  const response =
    await api.delete(
      `/attachments/${attachmentId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};