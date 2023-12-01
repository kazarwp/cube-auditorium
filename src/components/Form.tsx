import { DateInput, DateValue } from "@mantine/dates";
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

interface IdEquipment {
  value: string;
  label: string;
}

export const Form: React.FC = () => {
  const [watchedValueLesson, setWatchedValueLesson] = useState(false);
  const [watchedValueAddInfo, setWatchedValueAddInfo] = useState(false);
  const [dataFaculty, setDataFalucly] = useState<IData>();
  const [dataEquipment, setDataEquipment] = useState<IEquipment>();
  const [idFaculty, setIdFaculty] = useState<string[]>();
  const [idEquipment, setIdEquipment] = useState<string[]>();
  const [freeRooms, setFreeRoom] = useState<IClassroom>();
  const [valueDate, setValueDate] = useState<Date | null>();
  const [valueNumber, setValueNumber] = useState<string | number>();
  const [valueSize, setValueSize] = useState<string | number>();
  const [valueFaculty, setValueFaculty] = useState<string[]>([]);
  const [valueEquipment, setValueEquipment] = useState<string[]>([]);

  useEffect(() => {
    const allFacultyFromApi = async () => {
      try {
        const responseData = await getAllFaculty();
        setDataFalucly(responseData);
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
        setDataEquipment(responseEquipment);
      } catch (err) {
        console.log(err);
      }
    };
    allEquipmentFromApi();
  }, []);

  const dateLesson = (date: DateValue) => {
    setValueDate(date);
    return valueDate?.toISOString().substring(0, 10);
  };

  const freeRoom = async (
    dateString: (date: DateValue) => string,
    numberParam: number,
    toNumberId: (arr: string[]) => number[],
    toNumberIdData: (arr: string[]) => number[],
    anotherNumberParam: number
  ) => {
    try {
      const responseRoom = await getFreeRoom(
        dateString,
        numberParam,
        toNumberId,
        toNumberIdData,
        anotherNumberParam
      );
      console.log(responseRoom);
    } catch (err) {
      console.log(err);
    }
  };

  const toNumberIdData = (data: string[] | undefined) => {
    if (data) {
      const arr = data.map((item) => {
        return Number(item);
      });
      return arr;
    } else {
      // Обработка случая, когда data не определен
      return [];
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
        onChange={(dateString: DateValue) => {
          setWatchedValueLesson(true);
          dateLesson(dateString);
        }}
        valueFormat="YYYY-MM-DD"
        label="Дата"
        placeholder="Введите дату"
        w={252}
        withAsterisk
        mb={20}
        value={valueDate}
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
          <NumberInput
            w={252}
            placeholder="Выберите номер занятия"
            value={valueNumber}
            onChange={(value: string | number) => {
              setWatchedValueAddInfo(true);
              setValueNumber(Number(value));
            }}
            hideControls
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
          value={valueSize}
          onChange={setValueSize}
        />
      )}
      {watchedValueAddInfo && (
        <MultiSelect
          w={252}
          data={dataEquipment?.map(({ id, name }) => ({
            value: String(id),
            label: name,
          })) || []}
          label="Желаемое оборудование"
          placeholder="Выберите желаемое оборудование"
          withAsterisk
          mb={20}
          value={idEquipment}
          onChange={setIdEquipment}
        />
      )}
      {watchedValueAddInfo && (
        <MultiSelect
          w={252}
          data={dataFaculty?.map(({ id, short_name }) => ({
            value: String(id),
            label: short_name,
          }))}
          label="Желаемые факультеты"
          placeholder="Выберите желаемые факультеты"
          withAsterisk
          value={idFaculty}
          onChange={setIdFaculty}
          mb={10}
        />
      )}
      <Button
        className="button"
        w={133}
        onClick={() =>
          freeRoom(
            dateLesson(valueDate),
            valueNumber,
            toNumberIdData(idFaculty),
            toNumberIdData(idEquipment),
            valueSize
          )
        }
      >
        Найти
      </Button>
    </Flex>
  );
};
