import { api } from "./client";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getMembers = async (
  cardId: number
) => {

  const response =
    await api.get(
      `/members/${cardId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const createMember = async (
  userId: number,
  cardId: number
) => {

  const response =
    await api.post(
      "/members",
      {
        user_id: userId,
        card_id: cardId,
      },
      {
        headers: headers(),
      }
    );

  return response.data;
};

export const deleteMember = async (
  memberId: number
) => {

  const response =
    await api.delete(
      `/members/${memberId}`,
      {
        headers: headers(),
      }
    );

  return response.data;
};