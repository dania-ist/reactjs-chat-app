import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import baseUrl from "../../api/baseURL";
import { TheAppState } from "../../context/TheAppProvider";

const CreateChatGroupHook = () => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user, chats, setChats } = TheAppState();
  const toast = useToast();

  const onChangeGroupChatName = (e) => {
    setGroupChatName(e.target.value);
  };

  const handleDeleteUser = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== userToDelete._id)
    );
  };

  const handleAddUser = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async (e, onCloseModal) => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await baseUrl.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onCloseModal();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
    }
  };

  return [
    onChangeGroupChatName,
    selectedUsers,
    handleAddUser,
    handleDeleteUser,
    handleSubmit,
  ];
};

export default CreateChatGroupHook;
