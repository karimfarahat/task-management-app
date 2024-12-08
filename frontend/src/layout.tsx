import NavBar from "@/components/Navbar";
import { Box, Center } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./api/users";
import Cookies from "js-cookie"

export default function Layout() {

  const { data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  
  if (!Cookies.get("authToken") || isError){
    return <Navigate to={"/login"} />
  }

  return (
    <Box as={"main"} w={"full"} h={"full"}>
      <NavBar data={data} />
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
