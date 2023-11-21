import { Card, Group, Text, Image, Flex, Title, ScrollArea } from "@mantine/core";
import faculty from "../images/faculty.svg";
import size from "../images/size.svg";
import { InfoMenu } from "./InfoMenu";

export const CardRoom = () => {
  return (
    <ScrollArea>
      <Flex
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        <Title order={4} mb={20}>
          Результат
        </Title>
        <Card w={400} withBorder radius={6} h={46} pt={10}>
          <Group justify="space-between">
            <Group justify="space-between" gap={50}>
              <Text size="14px">308Н</Text>
              <Group gap="5px">
                <Image src={faculty} />
                <Text>ФMиКН</Text>
              </Group>
              <Group gap="5px">
                <Image src={size} />
                <Text>90</Text>
              </Group>
            </Group>
            <Group>
              <InfoMenu />
            </Group>
          </Group>
        </Card>
      </Flex>
    </ScrollArea>
  );
};
