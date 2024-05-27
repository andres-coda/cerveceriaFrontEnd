import { BASE_URL } from "../../../endPoints/endPoints";

export async function getUserDetails(userId, token) {
  const response = await fetch(`${BASE_URL}/usuario/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching user details');
  }

  return await response.json();
}