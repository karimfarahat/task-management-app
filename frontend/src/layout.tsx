import NavBar from "@/components/Navbar";
import { Box, Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box as={"main"} w={"full"} h={"full"}>
      <NavBar />
      <Center
        px={20}
        py={8}
        pos={"fixed"}
        top={16}
        h={"full"}
        w={"full"}
        bgColor={"gray.100"}
      >
        <Outlet />
      </Center>
    </Box>
  );
}
