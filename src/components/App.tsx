import { Form } from "./Form";
import { Icon } from "./Icon";
import { CardRoom } from "./CardRoom";
import { Grid } from "@mantine/core";
import "../style/App.css"

export const App: React.FC = () => {
  return (
    <div className="app">
      <Icon />
      <Form />
    </div>
  );
};
