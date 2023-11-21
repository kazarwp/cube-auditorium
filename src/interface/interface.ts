export interface IData {
  map(arg0: (item: IData) => string): string[];
  map(arg0: (item: IData) => number): number[];
  id: number;
  inactive: boolean;
  name: string;
  short_name: string;
}

export interface IEquipment {
  map(arg0: (item: IData) => string): string[];
  id: number;
  name: string;
}

export interface IClassroom {
  id: number;
  address: string;
  name: string;
  faculty: {
    id: number;
    short_name: string;
  };
  size: number;
  equipments: {
    equipment: {
      id: number;
      name: string;
    };
    amount: number;
  }[];
}