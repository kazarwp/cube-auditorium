import { Box, Image } from "@mantine/core";

import icon from "../images/icon.svg";
import "./Icon.css";

export const Icon: React.FC = () => {
  return (
    <Box>
      <Image className="icon" src={icon} width={250} />
    </Box>
  );
};
