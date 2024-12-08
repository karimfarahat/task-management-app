import { Flex, Span, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUser } from "@/api/users";
import Cookies from "js-cookie";

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogin = pathname.includes("/login");
  const isRegister = pathname.includes("/register");

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !isLogin && !isRegister,
  });

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  return (
    !isLogin &&
    !isRegister && (
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
    )
  );
};

export default NavBar;
