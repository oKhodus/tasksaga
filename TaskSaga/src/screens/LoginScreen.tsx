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
import { useState } from "react";
import { login } from "../api/auth";
import { saveToken } from "../auth/storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type LoginScreenProps = NativeStackScreenProps<ParamListBase, "Login"> & {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LoginScreen({ setToken }: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const res = await login({ identifier, password });

      if (res.access_token) {
        await saveToken(res.access_token);
        setToken(res.access_token);
        Alert.alert("Success", "You are logged in");
      } else {
        Alert.alert("Error", res.detail ?? "Login failed");
      }
    } catch (err) {
      Alert.alert("Error", "Invalid credentials, check your password & identifier or Sign Up");
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
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Email or username</Text>
        <TextInput
          placeholder="Email or username"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          // keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={onLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
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
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
