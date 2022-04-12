import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Stack,
  Button,
  Card,
  Checkbox,
  Box,
  TextInput,
  Grid,
  Title,
  Modal,
  Group,
} from "@mantine/core";
import Login from "./Login";
import SignOnPage from "./Login";
import { SquarePlus, Plus } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { login, authFetch, useAuth, logout } from "./auth";
import { TimeInput, DatePicker } from "@mantine/dates";

export default function Medications() {

  const [opened, setOpened] = useState(false);
  const [prescriptions, setState, setPrescriptions] = React.useState({
    prescriptions: [],
  });

  useEffect(() => {
    get_prescriptions();
  }, [])

  async function get_prescriptions() {
    let opts = {
      user_id: 1
    };
    fetch("http://127.0.0.1:5000/api/get_prescriptions", {
      method: "post",
      body: JSON.stringify(opts),
    }).then(response => response.json())
    .then(data => setState(prevState => ({...prevState, prescriptions: data})))
  }

  console.log(prescriptions.prescriptions);

  const form = useForm({
    initialValues: {
      drug_name: "",
      rx_number: "",
      pharmacy_name: "",
      quantity: "",
      time: "",
      start_date: "",
      end_date: "",
    },

    validate: {
      drug_name: (value) => (/[\s\S]*/.test(value) ? null : "Invalid"),
      rx_number: (value) => (/[\s\S]*/.test(value) ? null : "Invalid"),
      quantity: (value) => (/[\s\S]*/.test(value) ? null : "Invalid"),
      time: (value) => (/[\s\S]*/.test(value) ? null : "Invalid"),
    },
  });

  function handleAddMedication(e) {
    var dt = new Date( e.time );
    let opts = {
      user_id: 1,
      drug_name: e.drug_name,
      rx_number: e.rx_number,
      pharmacy_name: e.pharmacy_name,
      quantity: e.quantity,
      time: dt.getHours() + ":" + dt.getMinutes(),
      start_date: e.start_date,
      end_date: e.end_date,
    };
    fetch("http://127.0.0.1:5000/api/add_prescription", {
      method: "post",
      body: JSON.stringify(opts),
    }).then((r) => get_prescriptions());

    setOpened(false);
  }

  return (
    <div className="App">
      <Stack
        spacing="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        })}
      >
        {prescriptions.prescriptions.map(p => (
        <Grid style={{ borderBottom: "gray", marginTop: 5 }}>
          <Grid.Col span={8}>
            <Title order={1}>{p.drug_name}</Title>
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={1}>{p.frequency}</Title>
          </Grid.Col>
        </Grid>

        ))}
      </Stack>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add medication"
      >
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => handleAddMedication(values))}
          >
            <TextInput
              required
              label="Name"
              placeholder="Name of medication"
              {...form.getInputProps("drug_name")}
            />

            <TextInput
              required
              label="Rx Number"
              placeholder=""
              {...form.getInputProps("rx_number")}
            />

            <TextInput
              label="Pharmacy Name"
              placeholder=""
              {...form.getInputProps("pharmacy_name")}
            />

            <TextInput
              required
              label="Quantity"
              placeholder="50mg"
              {...form.getInputProps("quantity")}
            />

            <TimeInput required label="Frequency" {...form.getInputProps("time")} />

            <DatePicker
              label="Start Date"
              {...form.getInputProps("start_date")}
            />

            <DatePicker label="End Date" {...form.getInputProps("end_date")} />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add medication</Button>
      </Group>
    </div>
  );
}
