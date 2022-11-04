import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import baseUrl from "../../api/baseURL";
import { TheAppState } from "../../context/TheAppProvider";

const GetAllChatsHook = () => {
  const { user, setChats } = TheAppState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchChats = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await baseUrl.get("/api/chat", config);
      setLoading(false);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  return [fetchChats, loading];
};

export default GetAllChatsHook;
