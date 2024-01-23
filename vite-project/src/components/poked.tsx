import { useForm } from "@mantine/form";
import {
  TextInput,
  Text,
  Paper,
  PaperProps,
  Button,
  Stack,
} from "@mantine/core";
import { NavbarMinimal } from "./navbar";

export function Poked(props: PaperProps) {
  const form = useForm({
    initialValues: {
      ip: "",
      notificationIp: "",
      port: "",
      config: JSON.parse(localStorage.getItem("config") as string)
    },

    validate: {
      ip: (val) =>
        !/^(\d{1,3}\.){3}\d{1,3}$/.test(val) ? "Invalid IP address" : null,
      notificationIp: (val) =>
        !/^(\d{1,3}\.){3}\d{1,3}$/.test(val) ? "Invalid IP address" : null,
      port: (val) => (!/^\d+$/.test(val) ? "Port must be a number" : null),
    },
  });

  const handleSubmit = form.onSubmit(() => {
    const config = JSON.parse(localStorage.getItem("config") as string);
    if (!config || Object.keys(config).length === 0) {
      alert('Please fill the configuration first');
      return;
    }
    window.location.replace("/confg");
  });

  return (
    <div>
      <NavbarMinimal />
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Poked
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              label="IP"
              placeholder="Enter IP"
              value={form.values.ip}
              onChange={(event) =>
                form.setFieldValue("ip", event.currentTarget.value)
              }
              error={form.errors.ip && "Invalid IP address"}
              radius="md"
            />

            <TextInput
              required
              label="Notification IP"
              placeholder="Enter Notification IP"
              value={form.values.notificationIp}
              onChange={(event) =>
                form.setFieldValue("notificationIp", event.currentTarget.value)
              }
              error={form.errors.notificationIp && "Invalid IP address"}
              radius="md"
            />

            <TextInput
              required
              label="Port"
              placeholder="Enter Port"
              value={form.values.port}
              onChange={(event) =>
                form.setFieldValue("port", event.currentTarget.value)
              }
              error={form.errors.port && "Port must be a number"}
              radius="md"
            />
          </Stack>

          <Button type="submit" radius="xl" mt="xl">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}
