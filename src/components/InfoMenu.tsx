import { Image, Text, Popover, Title, UnstyledButton } from "@mantine/core";

import info from "../images/info.svg";

import "./InfoMenu.css";

interface InfoMenuProps {
  map(
    arg0: (
      {
        equipment,
        amount,
      }: { equipment: { id: number; name: string }; amount: number },
      index: number
    ) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  equipments: {
    equipment: {
      id: number;
      name: string;
    };
    amount: number;
  }[];
}

export const InfoMenu = ({ equipments }: { equipments: InfoMenuProps }) => {
  return (
    <Popover position="bottom" withArrow shadow="md" withinPortal width={125}>
      <Popover.Target>
        <UnstyledButton h={24}>
          <Image src={info} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Title size={10} c="#969696" weight={500} mb={10}>
          Оснащение
        </Title>
        {equipments.map(
          (
            {
              equipment,
              amount,
            }: { equipment: { id: number; name: string }; amount: number },
            index: number
          ) => (
            <div className="info-menu" key={index}>
              <Text size={10} c="#228be6">
                {equipment.name}: {amount}
              </Text>
            </div>
          )
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
