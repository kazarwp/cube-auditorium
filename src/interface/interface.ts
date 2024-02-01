export interface IData {
  id: number;
  inactive: boolean;
  name: string;
  short_name: string;
}

export interface IEquipment {
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