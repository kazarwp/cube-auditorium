import { Form } from "./Form";
import { Icon } from "./Icon";
import { CardRoom } from "./CardRoom";
import { Group } from "@mantine/core";

export const App: React.FC = () => {
  return (
    <div>
      <Icon />
      <Group justify="space-evenly">
        <Form />
        <CardRoom />
      </Group>
    </div>
  );
};
