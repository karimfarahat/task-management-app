import { Flex, Span, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = ({
  data,
}: {
  data: {
    username: string;
  };
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  return (
    <Flex
      position="sticky"
      w="full"
      top={0}
      py={3}
      px={20}
      h={16}
      zIndex={999}
      bgColor={"white"}
      align={"center"}
      justify={"space-between"}
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      {
        <Text>
          Hello <Span color={"teal"}>{data?.username}</Span>
        </Text>
      }
      <Button onClick={handleLogout} variant={"ghost"} colorPalette={"red"}>
        Logout
      </Button>
    </Flex>
  );
};

export default NavBar;
