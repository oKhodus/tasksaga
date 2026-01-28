import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { register } from "../api/auth";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [loginVal, setLoginVal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    try {
      const res = await register({ name, username: loginVal, email, password });

      if (res.detail) {
        Alert.alert("Error", res.detail);
        return;
      }

      navigation.navigate("Verify", { email });
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={loginVal}
          onChangeText={setLoginVal}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.button}>
          <Button title="Register" onPress={onRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
  },
});
