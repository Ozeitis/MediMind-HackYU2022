import { Navbar } from '@mantine/core';

export default function Demo() {
  return (
    <Navbar height={'auto'} p="xs" width={{ base: 300 }}>
      <Navbar.Section>{/* Header with logo */}</Navbar.Section>
      <Navbar.Section grow mt="md">{/* Links sections */}</Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
}