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
import { FormEvent } from "react";

type DeleteTaskDialogProps = {
  handleDelete: (e: FormEvent) => void;
  isLoading: boolean;
};

const DeleteTaskDialog = ({
  handleDelete,
  isLoading,
}: DeleteTaskDialogProps) => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"solid"} colorPalette={"red"}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Are you sure you want to delete this task?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            colorPalette={"teal"}
            loading={isLoading}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteTaskDialog;
