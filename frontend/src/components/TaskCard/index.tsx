import { Flex, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { useMutation, useQueryClient } from "react-query";
import { update } from "@/api/tasks";
// import { LuPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

type TaskCardProps = {
  title: string;
  description?: string;
  status: "pending" | "completed";
  id: string;
};

const TaskCard = ({ id, title, description, status }: TaskCardProps) => {
  const queryClient = useQueryClient();
  const taskMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toaster.create({
        title: `Task updated successfully`,
        type: "success",
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: error.message,
        type: "error",
      });
    },
  });
  const navigate = useNavigate();
  return (
    <Flex
      border="2px solid"
      borderColor={status === "pending" ? "gray.200" : "white"}
      borderRadius={5}
      p={3}
      w={"full"}
      bg={status === "pending" ? "white" : "teal"}
      transition={"backgrounds"}
      _hover={{
        bg: status === "pending" ? "gray/10" : "teal/80",
      }}
    >
      <VStack w={"full"} align={"flex-start"} borderRadius={"lg"}>
        <Flex w={"full"} justify={"space-between"}>
          <Heading
            color={status === "pending" ? "fg" : "white"}
            textDecoration={status === "pending" ? "none" : "line-through"}
            size={"lg"}
            onClick={() => navigate(`/tasks/${id}`)}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
          >
            {title}
          </Heading>

          {taskMutation.isLoading ? (
            <Spinner color={status === "pending" ? "teal" : "white"} />
          ) : (
            <Checkbox
              size={"lg"}
              colorPalette={"teal"}
              checked={status === "pending" ? false : true}
              onClick={() =>
                taskMutation.mutateAsync({
                  _id: id,
                  status: status === "pending" ? "completed" : "pending",
                })
              }
              cursor={"pointer"}
              transition={"backgrounds"}
              _hover={{ colorPalette: "cyan" }}
              variant={"solid"}
            />
          )}
        </Flex>
        {description && (
          <Text
            textDecoration={status === "pending" ? "none" : "line-through"}
            color={status === "pending" ? "fg" : "white"}
          >
            {description}
          </Text>
        )}
      </VStack>
    </Flex>
  );
};

export default TaskCard;
