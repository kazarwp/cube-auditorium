import { DateInput, DateValue } from "@mantine/dates";
import {
  Box,
  Title,
  Input,
  NumberInput,
  MultiSelect,
  Button,
  Flex,
  Grid,
  ScrollArea,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { WithoutDataCard } from "./WithoutDataCard";
import { IClassroom, IData, IEquipment } from "../interface/interface";
import { getAllFaculty, getAllEquipment, getFreeRooms } from "../api/api";
import { CardRoom } from "./CardRoom";
import { NotFoundRooms } from "./NotFoundRooms";
import { Icon } from "../components/Icon";

export const Form = () => {
  const [watchedValueLesson, setWatchedValueLesson] = useState(false);
  const [watchedValueAddInfo, setWatchedValueAddInfo] = useState(false);
  const [dataFaculty, setDataFalucly] = useState<IData>();
  const [dataEquipment, setDataEquipment] = useState<IEquipment>();
  const [idFaculty, setIdFaculty] = useState<string[]>();
  const [idEquipment, setIdEquipment] = useState<string[]>();
  const [freeRooms, setFreeRoom] = useState<IClassroom[]>();
  const [valueDate, setValueDate] = useState<Date | null>();
  const [valueNumber, setValueNumber] = useState<number>();
  const [valueSize, setValueSize] = useState<number | "">();

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
      const responseRoom = await getFreeRooms(
        dateString,
        numberParam,
        toNumberId,
        toNumberIdData,
        anotherNumberParam
      );
      setFreeRoom(responseRoom);
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
    <Grid justify="space-around" align="flex-start">
      
        <Flex
          gap="xs"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Icon />
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
            minDate={new Date()}
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
              mb={20}
              value={valueSize}
              onChange={setValueSize}
              max={100}
              min={1}
            />
          )}
          {watchedValueAddInfo && (
            <MultiSelect
              w={252}
              data={
                dataEquipment?.map(({ id, name }) => ({
                  value: String(id),
                  label: name,
                })) || []
              }
              label="Желаемое оборудование"
              placeholder="Выберите желаемое оборудование"
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
        <Box mt={300}> 
          <Title order={4} mb={20}>
            Результат
          </Title>
          <ScrollArea h={500}>
            {freeRooms === undefined ? (
              <WithoutDataCard />
            ) : freeRooms.length === 0 ? (
              <NotFoundRooms />
            ) : (
              freeRooms.map((classroom: IClassroom) => (
                <CardRoom key={classroom.id} classroom={classroom} />
              ))
            )}
          </ScrollArea>
        </Box>
    </Grid>
  );
};
