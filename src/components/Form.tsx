import {
  DateInput,
  DateValue,
  DatesProvider,
  DateInputProps,
  DatePickerInput,
} from "@mantine/dates";
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
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ru";

import { WithoutDataCard } from "./WithoutDataCard";
import { IClassroom, IData, IEquipment } from "../interface/interface";
import { getAllFaculty, getAllEquipment, getFreeRooms } from "../api/api";
import { CardRoom } from "./CardRoom";
import { NotFoundRooms } from "./NotFoundRooms";
import { Icon } from "../components/Icon";

interface IMappedEquipment {
  value: string;
  label: string;
}

interface IMappedFaculty {
  value: string;
  label: string;
}

export const Form = () => {
  const [watchedValueLesson, setWatchedValueLesson] = useState(false);
  const [watchedValueAddInfo, setWatchedValueAddInfo] = useState(false);
  const [dataFaculty, setDataFaculty] = useState<IData[]>([]);
  const [dataEquipment, setDataEquipment] = useState<IEquipment[]>([]);
  const [idFaculty, setIdFaculty] = useState<string[]>();
  const [idEquipment, setIdEquipment] = useState<string[]>();
  const [freeRooms, setFreeRoom] = useState<IClassroom[]>();
  const [valueDate, setValueDate] = useState<Date | null>();
  const [valueNumber, setValueNumber] = useState<number>();
  const [valueSize, setValueSize] = useState<number | "">();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const mappedFaculty: IMappedFaculty[] = dataFaculty?.map(
    ({ id, short_name }) => ({
      value: String(id),
      label: short_name,
    })
  );

  const mappedEquipment: IMappedEquipment[] =
    dataEquipment?.map(({ id, name }) => ({
      value: String(id),
      label: name,
    })) || [];

  useEffect(() => {
    const allFacultyFromApi = async () => {
      try {
        const responseData = await getAllFaculty();
        const inactiveControl = responseData.filter(
          (item) => item.inactive === false
        );
        setDataFaculty(inactiveControl);
      } catch (err) {
        console.log(err);
      }
    };
    allFacultyFromApi();
  }, []);

  const dateParser: DateInputProps["dateParser"] = (input) => {
    return dayjs(input, "DD.MM.YYYY").toDate();
  };

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
      setLoading(false);
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

  useEffect(() => {
    const disabledButtonSearch = () => {
      if (valueDate && valueNumber != undefined) {
        setDisabled(false);
      }
    };
    disabledButtonSearch();
  }, [valueDate, valueNumber]);

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
        <DatesProvider settings={{ locale: "ru" }}>
          <DateInput
            onChange={(dateString: DateValue) => {
              setWatchedValueLesson(true);
              dateLesson(dateString);
            }}
            valueFormat="DD.MM.YYYY"
            label="Дата"
            minDate={new Date()}
            placeholder="Введите дату"
            w={252}
            withAsterisk
            mb={20}
            value={valueDate}
            labelProps={{
              style: {
                fontWeight: "bold",
                color: "#333",
              },
            }}
          />
        </DatesProvider>
        {watchedValueLesson && (
          <Input.Wrapper label="Номер занятия" withAsterisk mb={20}>
            <NumberInput
              w={252}
              min={1}
              max={9}
              placeholder="Выберите номер занятия"
              value={valueNumber}
              onChange={(value: string | number) => {
                setWatchedValueAddInfo(true);
                setValueNumber(Number(value));
              }}
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
            data={mappedEquipment}
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
            data={mappedFaculty}
            label="Желаемые факультеты"
            placeholder="Выберите желаемые факультеты"
            value={idFaculty}
            onChange={setIdFaculty}
            mb={10}
          />
        )}
        <Button
          loading={loading}
          loaderProps={{ type: "dots" }}
          className="button"
          w={133}
          loaderPosition='center'
          disabled={disabled}
          onClick={() => {
            freeRoom(
              dateLesson(valueDate),
              valueNumber,
              toNumberIdData(idFaculty),
              toNumberIdData(idEquipment),
              valueSize
            );
            setLoading(true);
          }}
        >
          {!loading ? "Найти" : <Loader />}
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
