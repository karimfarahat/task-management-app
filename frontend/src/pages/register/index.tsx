import { register } from "@/api/users";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { Center, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeusername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      username: username,
      password: password,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data: { token: string }) => {
      toaster.create({
        title: "Register successful",
        type: "success",
      });
      Cookies.set("authToken", data.token);
      navigate("/login");
    },
    onError: (error: Error) => {
      toaster.create({
        title: error.message,
        type: "error",
      });
    },
  });

  return (
    <Center
      px={20}
      py={8}
      pos={"fixed"}
      mt={16}
      h={"full"}
      w={"full"}
      bgColor={"gray.100"}
    >
      <Page w={"1/4"} title={"Register"}>
        <Panel
          display={"flex"}
          flexDir={"column"}
          gap={5}
          alignItems={"center"}
        >
          <VStack gap={5} as={"form"} align={"flex-start"}>
            <Field label="Username" errorText="This field is required">
              <Input
                value={username}
                onChange={handleChangeusername}
                onKeyDown={handleKeyDown}
                placeholder="Enter Username"
              />
            </Field>
            <Field label="Password">
              <Input
                value={password}
                onChange={handleChangePassword}
                onKeyDown={handleKeyDown}
                type="password"
                placeholder="Enter password"
              />
            </Field>
            <Field label="Confirm Password">
              <Input
                value={confirmPassword}
                type="password"
                onChange={handleChangeConfirmPassword}
                onKeyDown={handleKeyDown}
                placeholder="Confirm Password"
              />
            </Field>
          </VStack>

          <Button
            size={"sm"}
            variant={"solid"}
            colorPalette={"teal"}
            onClick={handleSubmit}
            disabled={!username || !password || password !== confirmPassword}
            type="submit"
          >
            Register
          </Button>
          <Flex gap={1}>
            <Text fontSize={"xs"} color={"fg.muted"}>
              Already have an account?
            </Text>
            <Button
              colorPalette={"teal"}
              fontSize={"xs"}
              variant={"plain"}
             onClick={()=> (navigate("/login"))}
            >
              Login
            </Button>
          </Flex>
        </Panel>
      </Page>
    </Center>
  );
};

export default Register;
