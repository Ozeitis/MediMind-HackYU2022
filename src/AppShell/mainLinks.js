import React from 'react';
import { LayoutDashboard, MedicineSyrup, Settings } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

export function MainLink( props ) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      onClick={() => props.setPage(props.id)}
    >
      <Group>
        <ThemeIcon color={props.color} variant="light">
          {props.icon}
        </ThemeIcon>

        <Text size="sm">{props.label}</Text>
      </Group>
    </UnstyledButton>
  );
}

export function MainLinks(props) {
  return (
    <div>
      <MainLink icon={<LayoutDashboard size={16} />} color={'blue'} label={'Dashboard'} setPage={props.setPage} id={0}/>
      <MainLink icon={<MedicineSyrup size={16} />} color={'grape'} label={'Medications'} setPage={props.setPage} id={1}/>
      <MainLink icon={<Settings size={16} />} color={'green'} label={'Account Settings'} setPage={props.setPage} id={2}/>
    </div> 
  );
}
