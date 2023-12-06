import {
  Image,
  Text,
  Popover,
  Button,
  Title,
  Paper,
  Flex,
} from "@mantine/core";
import info from "../images/info.svg";
import "../style/InfoRoom.css";
import { IClassroom } from "../interface/interface";

interface InfoMenuProps {
  equipments: {
    equipment: {
      id: number;
      name: string;
    };
    amount: number;
  }[];
}

export const InfoMenu: React.FC = ({ equipments }: {equipments: InfoMenuProps}) => {
  return (
    <Popover position="bottom" withArrow shadow="md" withinPortal width={125}>
      <Popover.Target>
        <Button h={24}>
          <Image src={info} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Title size={10} c="#969696" weight={500} mb={10}>
          Оснащение
        </Title>
        {equipments.map((equipment: {id: number, name: string}, index: number) => (
          <div className="info-menu" key={index}>
            <Text size={10} c="#228be6">
              {equipment.equipment.name}: {equipment.amount}
            </Text>
          </div>))}
      </Popover.Dropdown>
    </Popover>
  );
};
