import axios, { AxiosResponse } from "axios";
import { IData, IEquipment, IClassroom } from "../interface/interface";
import qs from 'qs';

export const getAllFaculty = async () => {
  try {
    const allData: AxiosResponse<IData> = await axios({
      url: "https://0ee3-85-172-29-2.ngrok-free.app/api/faculties/selection",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log()
    return allData.data;
  } catch (error) {
    throw new Error("Fail");
  }
};

export const getAllEquipment = async () => {
  try {
    const allEquipment: AxiosResponse<IEquipment> = await axios({
      url: "https://0ee3-85-172-29-2.ngrok-free.app/api/equipments/selection",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return allEquipment.data;
  } catch (error) {
    throw new Error("Fail");
  }
};

export const getFaculty = async (name: string) => {
  try {
    const getCurrentFaculty: AxiosResponse<IData[]> = await axios({
      url: "https://0ee3-85-172-29-2.ngrok-free.app/api/faculties/selection",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      params: {
        "search": name,
      },
    });
    return getCurrentFaculty.data;
  } catch (error) {
    throw new Error("Fail");
  }
};

export const getEquipment = async (name: string) => {
  try {
    const getCurrentEquipment: AxiosResponse<IEquipment[]> = await axios({
      url: "https://0ee3-85-172-29-2.ngrok-free.app/api/equipments/selection",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      params: {
        "search": name,
      },
    });
    return getCurrentEquipment.data;
  } catch (error) {
    throw new Error("Fail");
  }
};

export const getFreeRoom = async (dateString: string,
  numberParam: number,
  stringToNumberFunc: number[],
  anotherStringToNumberFunc: number[],
  anotherNumberParam: number) => {
  try {
    const getFreeRooms: AxiosResponse<IClassroom> = await axios({
      url: "https://0ee3-85-172-29-2.ngrok-free.app/api/timetable/places/free",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      params: {
        "date": dateString,
        "number": numberParam,
        "faculty": stringToNumberFunc,
        "equipment": anotherStringToNumberFunc,
        "size": anotherNumberParam
      },
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    })
    return getFreeRooms.data
  } catch (error) {
    throw new Error("Fail");
  }
}