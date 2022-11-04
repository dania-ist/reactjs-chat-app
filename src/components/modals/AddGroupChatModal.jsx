import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";

import CreateChatGroupHook from "../../helper/chat/create-chat-group-hook";
import SearchHook from "../../helper/search/search-hook";

import { UserListItem, UserBadgeItem } from "../index";

const AddGroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [
    search,
    onChangeSearch,
    setSearch,
    searchResult,
    setSearchResult,
    handleSearch,
    loading,
    // setLoading,
  ] = SearchHook();
  const [
    onChangeGroupChatName,
    selectedUsers,
    handleAddUser,
    handleDeleteUser,
    handleSubmit,
  ] = CreateChatGroupHook();

  const onCloseModal = () => {
    console.log("close");
    // onChangeSearch("");
    setSearch("");
    setSearchResult([]);
    onClose();
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onCloseModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={onChangeGroupChatName}
              />
            </FormControl>
            <FormControl>
              <Input
                value={search}
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => {
                  if (!e.target.value) {
                    onChangeSearch(e);
                  } else {
                    handleSearch(e, e.target.value);
                  }
                }}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDeleteUser(u)}
                />
              ))}
            </Box>
            {loading
              ? "searching"
              : //   <ChatLoading />
                search &&
                searchResult
                  ?.slice(0, 4)
                  .map((usr) => (
                    <UserListItem
                      key={usr._id}
                      user={usr}
                      handleFunction={() => handleAddUser(usr)}
                    />
                  ))}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => handleSubmit(e, onCloseModal)}
              colorScheme="blue"
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddGroupChatModal;
