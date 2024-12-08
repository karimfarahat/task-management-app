import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "../../../components/ui/field";
import { Input, VStack } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { create } from "@/api/tasks";
import { toaster } from "../../../components/ui/toaster";

const CustomDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const closeTriggerRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const taskCreateMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toaster.create({
        title: `Task created successfully`,
        type: "success",
      });
      closeTriggerRef.current?.click();
    },
    onError: (error: Error) => {
      toaster.create({
        title: error.message,
        type: "error",
      });
    },
  });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    taskCreateMutation.mutate({ title: title, description: description });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button colorPalette={"teal"} variant="solid" size="sm">
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={5} as={"form"}>
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
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button size={"sm"} variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            type="submit"
            loading={taskCreateMutation.isLoading}
            onClick={handleSubmit}
            colorPalette={"teal"}
            variant="solid"
            size="sm"
          >
            Create
          </Button>
        </DialogFooter>
        <DialogCloseTrigger ref={closeTriggerRef} />
      </DialogContent>
    </DialogRoot>
  );
};

export default CustomDialog;
