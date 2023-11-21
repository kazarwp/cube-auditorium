import { DateInput } from "@mantine/dates";
import {
  Title,
  Input,
  NumberInput,
  MultiSelect,
  Button,
  Flex,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IClassroom, IData, IEquipment } from "../interface/interface";
import {
  getAllFaculty,
  getAllEquipment,
  getFaculty,
  getEquipment,
  getFreeRoom,
} from "../api/api";

export const Form: React.FC = () => {
  const [watchedValueLesson, setWatchedValueLesson] = useState(false);
  const [watchedValueAddInfo, setWatchedValueAddInfo] = useState(false);
  const [dataFaculty, setDataFalucly] = useState<string[]>();
  const [dataEquipment, setDataEquipment] = useState<string[]>();
  const [idFaculty, setIdFaculty] = useState<number>();
  const [idEquipment, setIdEquipment] = useState<number>();
  const [freeRooms, setFreeRoom] = useState<IClassroom>();
  const [valueFaculty, setValueFaculty] = useState<string[]>([]);
  const [valueEquipment, setValueEquipment] = useState<string[]>([]);

  useEffect(() => {
    const allFacultyFromApi = async () => {
      try {
        const responseData = await getAllFaculty();
        const shortNameFaculty: string[] = responseData.map(
          (item: IData) => item.short_name
        );
        setDataFalucly(shortNameFaculty);
      } catch (err) {
        console.log(err);
      }
    };
    allFacultyFromApi();
  }, []);

  useEffect(() => {
    const allEquipmentFromApi = async () => {
      try {
        const responseEquipment = await getAllEquipment();
        const nameEquipment: string[] = responseEquipment.map(
          (item: IEquipment) => item.name
        );
        setDataEquipment(nameEquipment);
      } catch (err) {
        console.log(err);
      }
    };
    allEquipmentFromApi();
  }, []);

  const freeRoom = async () => {
    try {
      const responseRoom = await getFreeRoom();
      console.log(responseRoom);
    } catch (err) {
      console.log(err);
    }
  };
  
  const currentFaculty = async (namesFaculty: string[]) => {
    try {
      namesFaculty.map(async (item) => {
        const responseCurrentFaculty = await getFaculty(item);
        return responseCurrentFaculty[0].id;
      });
    } catch (err) {
      console.log(err);
    }
  };

  currentFaculty(["ФМиКН", "БФ", "ФЖ"]);

  const currentEquipment = async (name: string) => {
    try {
      const responseCurrentEquipment = await getEquipment(name);
      setIdEquipment(responseCurrentEquipment[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      gap="xs"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Title order={4} mb={20}>
        Поиск свободной аудитории
      </Title>
      <DateInput
        onChange={() => setWatchedValueLesson(true)}
        valueFormat="YYYY-MM-DD"
        label="Дата"
        placeholder="Введите дату"
        w={252}
        withAsterisk
        mb={20}
        labelProps={{
          style: {
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#333",
            fontSize: "18px",
          },
        }}
      />
      {watchedValueLesson && (
        <Input.Wrapper label="Номер занятия" withAsterisk mb={20}>
          <Input
            w={252}
            placeholder="Выберите номер занятия"
            onChange={() => setWatchedValueAddInfo(true)}
          />
        </Input.Wrapper>
      )}
      {watchedValueAddInfo && (
        <NumberInput
          label="Минимальная вместимость"
          placeholder="Введите желаемое кол-во мест"
          w={252}
          withAsterisk
          mb={20}
        />
      )}
      {watchedValueAddInfo && (
        <MultiSelect
          w={252}
          data={dataEquipment}
          label="Желаемое оборудование"
          placeholder="Выберите желаемое оборудование"
          withAsterisk
          mb={20}
          value={valueEquipment}
          onChange={setValueEquipment}
        />
      )}
      {watchedValueAddInfo && (
        <MultiSelect
          w={252}
          data={dataFaculty}
          label="Желаемые факультеты"
          placeholder="Выберите желаемые факультеты"
          withAsterisk
          mb={10}
          value={valueFaculty}
          onChange={setValueFaculty}
        />
      )}
      <Button className="button" w={133}>
        Найти
      </Button>
    </Flex>
  );
};
