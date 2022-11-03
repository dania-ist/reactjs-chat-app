import { Box } from "@chakra-ui/layout";
import { ChatBox, MyChats, SideDrawer } from "../components";

import { TheAppState } from "../context/TheAppProvider";

const Chats = () => {
  const { user } = TheAppState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;
