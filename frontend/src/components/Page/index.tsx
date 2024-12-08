import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import CustomDialog from "../../pages/home/CreateTaskDialog";

type PageProps = BoxProps & {
  title: string;
  canCreateTask?: boolean;
};

const Page = ({
  title,
  canCreateTask,
  children,
  ...boxProps
}: PropsWithChildren<PageProps>) => {
  return (
    <Box h={"full"} {...boxProps}>
      {canCreateTask ? (
        <Flex justify={"space-between"}>
          <Heading size={"2xl"}>{title}</Heading>

          <CustomDialog />
        </Flex>
      ) : (
        <Heading size={"2xl"}>{title}</Heading>
      )}
      <Box mt={5}>{children}</Box>
    </Box>
  );
};

export default Page;
