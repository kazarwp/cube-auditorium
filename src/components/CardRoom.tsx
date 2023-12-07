import {
  Card,
  Group,
  Text,
  Image,
  Flex,
} from "@mantine/core";
import facultyimg from "../images/facultyimg.svg";
import sizeimg from "../images/sizeimg.svg";
import { InfoMenu } from "./InfoMenu";
import { IClassroom } from "../interface/interface";

export const CardRoom = ({ classroom }: { classroom: IClassroom }) => {
  return (
    <Flex
      gap="xs"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Card w={400} withBorder radius={6} h={46} pt={10} mb={10}>
        <Group spacing={110}>
          <Group spacing={15}>
            <Text size="14px" w={40}>
              {classroom.name !== null ? classroom.name : "-"}
            </Text>
            <Group spacing={5} w={100}>
              <Image src={facultyimg} width={15} />
              <Text c="black">
                {classroom.faculty !== null
                  ? classroom.faculty?.short_name
                  : "-"}
              </Text>
            </Group>
            <Group spacing={5} w={45}>
              <Image src={sizeimg} width={15} />
              <Text>{classroom.size !== null ? classroom.size : "-"}</Text>
            </Group>
          </Group>
          <Group>
            <InfoMenu equipments={classroom.equipments}/>
          </Group>
        </Group>
      </Card>
    </Flex>
  );
};
