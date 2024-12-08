import { Flex, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("/login");
  const isRegister = pathname.includes("/register");
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
      {!isLogin && !isRegister && (
        <>
          <Text>Hello User</Text>
          <Button variant={"ghost"} colorPalette={"red"}>
            Logout
          </Button>
        </>
      )}
    </Flex>
  );
};

export default NavBar;
