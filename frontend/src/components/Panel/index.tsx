import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Panel = ({
  children,

  ...boxProps
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box minH={"20"} p={5} bg="white" borderRadius={"lg"} {...boxProps}>
      {children}
    </Box>
  );
};

export default Panel;
