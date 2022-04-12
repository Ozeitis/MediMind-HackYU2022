import React, { useState, useEffect } from "react";
import { AppShell, Navbar, Header, Group, AcnbtionIcon } from "@mantine/core";
import { MainLinks } from "./mainLinks";
import { User } from "./user.tsx";
import { Logo } from "./logo.tsx";
import App from "../App";
import Dashboard from "../Dashboard";
import Settings from "../Settings";
import Medications from "../Medications";
import { login, authFetch, useAuth, logout } from "../auth";
import SignOnPage from "../Login";

export default function Func() {
  const isLoggedIn = useAuth()[0];
  const [page, setPage] = useState(0);


  const appshell = (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={900} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks setPage={setPage} />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} style={{ backgroundColor: "#e3e3e3" }}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Logo />
          </Group>
        </Header>
      }
    >
      {/* <App/> */}
      {page === 0 ? <Dashboard /> : null}
      {page === 1 ? <Medications /> : null}
      {page === 2 ? <Settings /> : null}
    </AppShell>
  );

  return isLoggedIn ? appshell : <SignOnPage />;
}
