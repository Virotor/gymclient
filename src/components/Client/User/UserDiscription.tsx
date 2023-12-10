import { PropsWithChildren } from 'react';
import { IClient } from '../../../redux/interfaces/Client';
import { Descriptions, DescriptionsProps } from 'antd';
import dayjs from 'dayjs';
import { render } from '@testing-library/react';



interface ClientDiscriptionProps extends PropsWithChildren {
  client: IClient
}



export const ClientDiscription: React.FC<ClientDiscriptionProps> = ({ client }: ClientDiscriptionProps) => {

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'First name',
      children: <>
      {client.firstName}
      </>,
    },
    {
      key: '2',
      label: 'Last name',
      children: client.secondName,
    },
    {
      key: '3',
      label: 'Telephone',
      children: client.phoneNumber,
    },
    {
      key: '4',
      label: 'Birth day',
      children: dayjs(client.birthDay).format('DD/MM/YYYY'),
    },
    {
      key: '5',
      label: 'Gender',
      children: client.gender,
    },
  ];


  return (
    <Descriptions title="Client Info" items={items} />
  )
}