import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
    Notification,
  } from "@mantine/core";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import useAuthStore from "../../store/app.store"; // Authentication store
  
  const LoginPage = () => {
    const login = useAuthStore((state) => state.login); // Login function from the store
    const navigate = useNavigate(); // Navigation hook
  
    const [username, setUsername] = useState(""); // State to store username
    const [password, setPassword] = useState(""); // State to store password
    const [error, setError] = useState(""); // State for error messages
  
    // Handle login logic
    const handleLogin = () => {
      if (!username || !password) {
        setError("Username and Password are required!");
        return;
      }
  
      // Mock login: Replace this with an actual API call or logic
      if (username === "user@example.com" && password === "pass123") {
        // Set authentication state to true (use store for state management)
        login();
        navigate("/resources"); // Redirect to resources page after successful login
      } else {
        setError("Invalid username or password!");


      }
    };
  
    return (
      <div
        style={{
          height: "100vh", // Full page height
          backgroundColor: "#f4f6f9", // Light gray background
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container size={420} my={40}>
          {/* Page Title */}
          <Title ta="center" fw={700}>
            Welcome Back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Don't have an account yet?{" "}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
  
          {/* Login Form */}
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            sx={{
              width: "400px", 
              height: "auto", 
              backgroundColor: "#ffffff", 
            }}
          >
            {/* Error Notification */}
            {error && (
              <Notification color="red" onClose={() => setError("")} mb="md">
                {error}
              </Notification>
            )}
  
            {/* Username Input */}
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              required
            />
  
            {/* Password Input */}
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
              mt="md"
            />
  
            {/* Additional Options */}
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
  
            {/* Login Button */}
            <Button fullWidth mt="xl" onClick={handleLogin}>
              Sign in
            </Button>
          </Paper>
        </Container>
      </div>
    );
  };
  
  export default LoginPage;
  