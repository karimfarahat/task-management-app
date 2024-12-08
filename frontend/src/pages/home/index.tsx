import { getAll } from "@/api/tasks";
import TaskCard from "@/components/TaskCard";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import { Task } from "@/types/tasks";
import { useQuery } from "react-query";
import { Grid, Text } from "@chakra-ui/react";

const Home = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAll,
  });

  return (
    !isLoading && (
      <Page canCreateTask width={"1/2"} title="Your current tasks">
        <Panel>
          <Grid templateColumns="repeat(3, 1fr)" gap="3">
            {isSuccess ? (
              data.map((task: Task) => {
                return (
                  <TaskCard
                    key={task._id}
                    id={task._id!}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                  />
                );
              })
            ) : (
              <Text>No data to show</Text>
            )}
          </Grid>
        </Panel>
      </Page>
    )
  );
};

export default Home;
