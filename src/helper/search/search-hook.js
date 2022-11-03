import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import baseUrl from "../../api/baseURL";
import { TheAppState } from "../../context/TheAppProvider";

const SearchHook = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user } = TheAppState();

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e, query) => {
    if (query) {
      setSearch(query);
    }
    if (!search && !query) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await baseUrl.get(
        `/api/user?search=${query ? query : search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return [
    search,
    onChangeSearch,
    setSearch,
    searchResult,
    setSearchResult,
    handleSearch,
    loading,
    setLoading,
  ];
};

export default SearchHook;
