import { get, update } from "@/api/tasks";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { Task } from "@/types/tasks";
import { Flex, Input, Link, Skeleton, Text, VStack } from "@chakra-ui/react";
import {
  ChangeEvent,
  // FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const Register = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // const handleSubmit = (e: FormEvent) => {
  //   if (id) {
  //     e.preventDefault();
  //     taskUpdateMutation.mutate({
  //       _id: id,
  //       email: email,
  //       password: password,
  //     });
  //   }
  // };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // handleSubmit(e);
    }
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["task", id],
    queryFn: ({ queryKey }) => {
      const [, taskId] = queryKey;
      if (!taskId) throw new Error("Task ID is required");
      return get(taskId);
    },
    enabled: !!id,
  });

  const task: Task = { ...data };

  useEffect(() => {
    if (isSuccess) {
      // setTitle(task.title);
      // setDescription(task.description ?? "");
    }
  }, [isSuccess, task.title, task.description]);

  const queryClient = useQueryClient();

  const taskUpdateMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", id] });

      toaster.create({
        title: `Task updated successfully`,
        type: "success",
      });
      navigate("/home");
    },
    onError: (error: Error) => {
      toaster.create({
        title: error.message,
        type: "error",
      });
    },
  });

  return (
    <Page w={"1/4"} title={"Register"}>
      <Panel display={"flex"} flexDir={"column"} gap={5} alignItems={"center"}>
        <VStack gap={5} as={"form"} align={"flex-start"}>
          {!isLoading ? (
            <>
              <Field
                label="Email"
                // invalid={!email}
                errorText="This field is required"
              >
                <Input
                  value={email}
                  onChange={handleChangeEmail}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter the task's title"
                />
              </Field>
              <Field label="Password">
                <Input
                  value={password}
                  onChange={handleChangePassword}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter the task's description"
                />
              </Field>
              <Field label="Confirm Password">
                <Input
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter the task's description"
                />
              </Field>
            </>
          ) : (
            <Skeleton width={"full"} h={"full"} />
          )}
        </VStack>

        <Button
          size={"sm"}
          variant={"solid"}
          colorPalette={"teal"}
          // onClick={handleSubmit}
          type="submit"
        >
          Regsiter
        </Button>
        <Flex gap={1}>
          <Text fontSize={"xs"} color={"fg.muted"}>
            Already have an account?
          </Text>
          <Link
            color={"teal"}
            fontSize={"xs"}
            variant={"underline"}
            href={"login"}
          >
            Login
          </Link>
        </Flex>
      </Panel>
    </Page>
  );
};

export default Register;
