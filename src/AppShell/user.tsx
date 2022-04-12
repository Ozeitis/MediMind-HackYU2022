import { Logout } from 'tabler-icons-react';
import { UnstyledButton, ActionIcon, Group, Avatar, Text, Tooltip, Box, useMantineTheme } from '@mantine/core';
import {login, authFetch, useAuth, logout} from "../auth"
import {createAuthProvider} from 'react-token-auth';
import React, { useState, useEffect } from 'react';


export function User() {
  const theme = useMantineTheme()

  return (
    // const

    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,

          '&:hover': {
            backgroundColor: theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Oze Botach
            </Text>
            <Text color="dimmed" size="xs">
              oze@obotach.com
            </Text>
          </Box>

          <Tooltip
            // opened
            transition="fade"
            transitionDuration={200}
            label="Sign Out"
            withArrow
          >
            <ActionIcon size="lg" onClick={() => logout()}>
              <Logout/>
            </ActionIcon>
          </Tooltip>

        </Group>
      </UnstyledButton>
    </Box>
  );
}
