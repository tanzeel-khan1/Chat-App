import { useState } from "react";
import axios from "axios";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMessage = async (messageId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`/api/messages/${messageId}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    }
  };

  return { deleteMessage, loading, error };
};

export default useDeleteMessage;
