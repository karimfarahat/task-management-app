import { get, remove, update } from "@/api/tasks";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { Task } from "@/types/tasks";
import { Flex, Input, Skeleton, VStack } from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import DeleteTaskDialog from "./DeleteTaskDialog";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    if (id) {
      e.preventDefault();
      taskUpdateMutation.mutate({
        _id: id,
        title: title,
        description: description,
      });
    }
  };

  const handleDelete = (e: FormEvent) => {
    if (id) {
      e.preventDefault();
      taskDeleteMutation.mutate(id);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
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
      setTitle(task.title);
      setDescription(task.description ?? "");
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

  const taskDeleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toaster.create({
        title: `Task deleted successfully`,
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
    <Page w={"1/2"} title={"Edit Task"}>
      <Panel>
        <VStack gap={5} as={"form"} align={"flex-start"}>
          {!isLoading ? (
            <>
              <Field
                label="Title"
                required
                invalid={!title}
                errorText="This field is required"
              >
                <Input
                  value={title}
                  onChange={handleChangeTitle}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter the task's title"
                />
              </Field>
              <Field label="Description">
                <Input
                  value={description}
                  onChange={handleChangeDescription}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter the task's description"
                />
              </Field>
            </>
          ) : (
            <Skeleton width={"full"} h={"full"} />
          )}
        </VStack>
        <Flex gap={3} mt={5} justify={"space-between"}>
          <Button
            size={"sm"}
            variant={"ghost"}
            colorPalette={"teal"}
            onClick={() => navigate("/home")}
          >
            Back
          </Button>
          <Flex gap={3} justify={"flex-end"}>
            <Button
              disabled={
                task.title === title && task.description === description
              }
              size={"sm"}
              variant={"solid"}
              colorPalette={"teal"}
              onClick={handleSubmit}
              type="submit"
            >
              Update
            </Button>
            <DeleteTaskDialog
              isLoading={taskDeleteMutation.isLoading}
              handleDelete={handleDelete}
            />
          </Flex>
        </Flex>
      </Panel>
    </Page>
  );
};

export default EditTask;
