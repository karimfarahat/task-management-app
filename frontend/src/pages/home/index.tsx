import { getAll } from "@/api/tasks";
import TaskCard from "@/components/TaskCard";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import { Task } from "@/types/tasks";
import { useQuery } from "react-query";
import { Center, Grid } from "@chakra-ui/react";

const Home = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAll,
  });

  return (
    !isLoading && (
      <Page canCreateTask width={"1/2"} title="Your current tasks">
        <Panel>
          {isSuccess && data.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap="3">
              {data.map((task: Task) => {
                return (
                  <TaskCard
                    key={task._id}
                    id={task._id!}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                  />
                );
              })}
            </Grid>
          ) : (
            <Center>No tasks to show</Center>
          )}
        </Panel>
      </Page>
    )
  );
};

export default Home;
