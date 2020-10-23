import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { Button, Box, Text, Stack, Input, Checkbox } from "@chakra-ui/core";
import { MdAdd, MdDelete, MdMenu, MdSearch } from "react-icons/md";
import { createTodo, destroy, setAsComplete } from "../../libs/home";
import config from "../../config";

function Home() {
  const router = useRouter();
  const url = () =>
    config.BASE_URL + "/todolist?completion=" + router.query.completion;

  const { data: todos } = useSWR(url);
  const [todo, setTodo] = useState("");

  return (
    <Box w="550px" m="0 auto">
      <Box bg="gray.100" p="2" borderRadius="0 0 4px 4px">
        <Stack isInline justify="space-between">
          <Box>
            <Button>
              <Box
                size="5"
                as={MdMenu}
                aria-label="Main Menu"
                color="gray.600"
              />
            </Button>
          </Box>
          <Box>
            <Text pt="2" color="gray.600">
              Ekspresi
            </Text>
          </Box>
          <Button>
            <Box
              size="5"
              as={MdSearch}
              aria-label="Search database"
              color="gray.600"
            />
          </Button>
        </Stack>
      </Box>
      <Box mt="2">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await createTodo({ name: todo });
            mutate(url);
          }}
        >
          <Stack isInline justify="space-between">
            <Input
              placeholder="Add To do List"
              focusBorderColor="gray.400"
              size="md"
              variant="outline"
              bg="gray.200"
              color="gray.600"
              onChange={(e) => setTodo(e.target.value)}
            ></Input>
            <Button type="submit">
              <Box size="5" as={MdAdd} aria-label="Close" />
            </Button>
          </Stack>
        </form>
        <Box bg="gray.400" w="100%" mt="2" p="3" borderRadius="4px">
          {(todos ? todos?.data : []).map((todo) => {
            return (
              <Stack
                key={todo.id}
                isInline
                align="stretch"
                justify="space-between"
                m="5px"
              >
                <Box bg="gray.100" p="10px 10px 0" borderRadius="4px">
                  <Checkbox
                    size="lg"
                    borderColor="gray.300"
                    variantColor="gray"
                    isChecked={todo.is_completed}
                    onChange={async (e) => {
                      await setAsComplete(todo.id, {
                        is_completed: !todo.is_completed,
                      });
                      mutate(url);
                    }}
                  />
                </Box>
                <Box w="100%" bg="gray.100" borderRadius="4px">
                  <Text
                    textDecoration={todo.is_completed ? "line-through" : null}
                    p="2"
                    fontSize="15px"
                    color="gray.600"
                  >
                    {todo.name}
                  </Text>
                </Box>
                <Box>
                  <Button bg="gray.100">
                    <Box
                      size="5"
                      as={MdDelete}
                      aria-label="Close"
                      color="gray.600"
                      onClick={async (e) => {
                        await destroy(todo.id);
                        mutate(url);
                      }}
                    />
                  </Button>
                </Box>
              </Stack>
            );
          })}
          <Stack isInline align="stretch" justify="flex-start" m="5px">
            <Box>
              <Button
                variantColor="teal"
                size="xs"
                onClick={() => {
                  router.push("/");
                }}
              >
                Show All
              </Button>
            </Box>
            <Box>
              <Button
                variantColor="teal"
                size="xs"
                onClick={() => {
                  router.push("/?completion=no");
                }}
              >
                Active
              </Button>
            </Box>
            <Box>
              <Button
                variantColor="teal"
                size="xs"
                onClick={() => {
                  router.push("/?completion=yes");
                }}
              >
                Completed
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
