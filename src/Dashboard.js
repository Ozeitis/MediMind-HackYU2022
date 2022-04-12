import logo from "./logo.svg";
import "./App.css";
import { Title, Button } from "@mantine/core";
import { Check, MedicalCross } from "tabler-icons-react";
import SignOnPage from "./Login";

function sendText() {
  fetch("http://127.0.0.1:5000/api/send_msg", {
    method: "GET",
  })
}

export default function Dashboard() {
  return (
    <>
      <div className="App">
        <Title order={1}>Did you remember to take ______</Title>
        <Button
          style={{ margin: 10 }}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          rightIcon={<Check />}
          size="xl"
        >
          Done
        </Button>
        <Button
          style={{ margin: 10 }}
          rightIcon={<MedicalCross />}
          size="xl"
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
        >
          Contact Doctor
        </Button>
      </div>
      <div className="App">
        <Button
          style={{ margin: 10 }}
          size="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "red" }}
          onClick={() => sendText()}
        >
          Send Text
        </Button>
      </div>
    </>
  );
}
