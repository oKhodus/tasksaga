import { View, Text, TouchableOpacity, StyleSheet, Switch, KeyboardAvoidingView, Platform, ScrollView, TextInput, Button, Image } from "react-native";
import { useState } from "react";

export default function WelcomeScreen({ navigation }: any) {
  const [isDark] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const theme = {
    background: isDark ? "#1E1E1E" : "#f0f4f8",
    text: isDark ? "#fff" : "#333",
    signIn: isDark ? "#4CAF50" : "#4CAF50",
    signUp: isDark ? "#2196F3" : "#2196F3",
  };
  const LoginStyles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 40, fontWeight: "bold", textAlign: "center", fontFamily: "TaskSaga-Regular" },
    label: { fontSize: 16, marginBottom: 8, color: "#ffffff", fontFamily: "TaskSaga-Regular" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 20, backgroundColor: "#fff" },
    buttonContainer: { marginTop: 10 },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>



      {/* style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} */}
      <KeyboardAvoidingView >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.containerImage}>
            <Image
              source={require('../../assets/d20.gif')}
              style={styles.icon}
            />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            Welcome back
          </Text>


          <Text style={LoginStyles.label}>Email or username</Text>
          <TextInput
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            style={LoginStyles.input}
          />

          {/* <Text style={LoginStyles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={LoginStyles.input}
          /> */}

          {/* <View style={LoginStyles.buttonContainer}>
            <Button title="Continue" />
          </View> */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.signUp }]}
            onPress={() => navigation.navigate("")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>


      <View style={{ height: 16 }} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.signUp }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  themeSwitch: {
    position: "absolute",
    top: 40,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "TaskSaga-Bold",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  icon: {
    width: 100,
    height: 100,
  },
});
