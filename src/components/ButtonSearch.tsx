import { Button } from '@mantine/core';
import '../style/Button.css'
import { getIdFaculty } from '../api/api';
import { useEffect } from 'react';

export const ButtonSearch: React.FC = () => {
  useEffect(() => {
    getIdFaculty()
  }, [])

  return <Button className='button' w={133}>Найти</Button>;
};
