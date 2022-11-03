import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../api/baseURL";

const LoginHook = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();

  const toast = useToast();
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginAsGuest = (e) => {
    setEmail("user1@gmail.com");
    setPassword("123456");
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await baseUrl.post("/api/user/login", {
        email,
        password,
      });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
    }
  };

  return [
    email,
    password,
    onChangeEmail,
    onChangePassword,
    loginAsGuest,
    submitHandler,
    loading,
  ];
};
export default LoginHook;
