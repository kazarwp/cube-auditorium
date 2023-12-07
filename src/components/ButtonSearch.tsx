import { Button } from '@mantine/core';
import { useEffect } from 'react';

import { getIdFaculty } from '../api/api';

import './ButtonSearch.css'

export const ButtonSearch = () => {
  useEffect(() => {
    getIdFaculty()
  }, [])

  return <Button className='button' w={133}>Найти</Button>;
};
