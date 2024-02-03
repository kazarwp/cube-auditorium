import { Card, Badge } from "@mantine/core";

export const WithoutDataCard = () => {
  return (
    <Card w={400} radius={6} h={46} p={0} mb={10}>
      <Badge fw={500}>Заполните форму для поиска аудиторий</Badge>
    </Card>
  );
};
