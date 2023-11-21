import { HoverCard, UnstyledButton, Image, Text} from "@mantine/core";
import info from "../images/info.svg";
import "../style/InfoRoom.css";

export const InfoMenu: React.FC = () => {
  return (
    <HoverCard>
      <HoverCard.Target>
        <UnstyledButton>
          <Image src={info} />
        </UnstyledButton>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <div className='info-menu'>
          КОМПЬЮТЕРЫ: 15
        </div>
        <div className='info-menu'>
          ПРОЕКТОР: 1
        </div>
        <div className='info-menu'>
          МАРКЕРНАЯ ДОСКА: 1
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
