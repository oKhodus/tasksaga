import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useState } from "react";

type WelcomeScreenProps = {
  navigation: any;
  fontsLoaded: boolean;
};

export default function WelcomeScreen({ navigation, fontsLoaded }: WelcomeScreenProps) {
  const [identifier, setIdentifier] = useState("");

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={[styles.title, { fontFamily: "TaskSaga-Bold" }]}>
            Welcome back
          </Text>

          <Text style={[styles.label, { fontFamily: "TaskSaga-Regular" }]}>
            Email or username
          </Text>
          <TextInput
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            style={[styles.input, { fontFamily: "TaskSaga-Regular" }]}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, { fontFamily: "TaskSaga-Bold" }]}>
              Continue
            </Text>
          </TouchableOpacity>

          <Text style={[styles.orText, { fontFamily: "TaskSaga-Regular" }]}>or</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, { fontFamily: "TaskSaga-Bold" }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <Text style={[styles.preSignUpText, { fontFamily: "TaskSaga-Regular" }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity style={styles.SignUpButton}>
            <Text style={[styles.SignUpButtonText, { fontFamily: "TaskSaga-Bold" }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  innerContainer: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#1e1e1e" },
  title: { fontSize: 34, fontWeight: "700", color: "#fff", marginBottom: 40, textAlign: "center" },
  label: { color: "#fff", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 12, marginBottom: 20, backgroundColor: "#1e1e1e", color: "#fff" },
  button: { paddingVertical: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#2196F3", marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 18 },
  orText: { color: "#fff", textAlign: "center", marginVertical: 10 },
  preSignUpText: { color: "#fff", textAlign: "center", marginVertical: 10 },
  SignUpButton: { alignItems: "center" },
  SignUpButtonText: { color: "#fff", fontSize: 18 },
});
