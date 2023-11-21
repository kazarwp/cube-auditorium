import { Box, Image } from "@mantine/core";
import icon from "../images/icon.svg";
import "../style/Icon.css";

export const Icon: React.FC = () => {
  return (
    <Box>
      <Image className='icon' src={icon} w={250} />
    </Box>
  );
};