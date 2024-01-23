import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },

    validate: {
      username: (val) =>
        val.length <= 2 ? "username needs to be atleast 2 characters" : null,
      password: (val) => {
        if (val.length < 6) {
          return "Password should include at least 6 characters";
        } else if (!/[a-z]/.test(val)) {
          return "Password should include at least one lowercase letter";
        } else if (!/[A-Z]/.test(val)) {
          return "Password should include at least one uppercase letter";
        } else {
          return null;
        }
      },
    },
  });

  const handleSubmit = form.onSubmit(() => {
    const currentUsers =
      JSON.parse(localStorage.getItem("users") as string) || [];
    if (type === "register") {
      currentUsers.push(form.values.username);
      localStorage.setItem("users", JSON.stringify(currentUsers));
    } else if (type === "login") {
      if (!currentUsers.includes(form.values.username)) {
        alert("Username not found");
        return;
      }
    }
    window.location.replace("/confg");
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Hatal, {type} with username
      </Text>

      <Group grow mb="md" mt="md"></Group>

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            required
            label="Username"
            placeholder="gals"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username && "Invalid username"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          {type === "register" && (
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              error={form.errors.confirmPassword && "Passwords do not match"}
              radius="md"
            />
          )}

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
