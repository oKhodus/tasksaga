import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useState } from "react";

export default function WelcomeScreen({ navigation }: any) {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    background: isDark ? "#1E1E1E" : "#f0f4f8",
    text: isDark ? "#fff" : "#333",
    signIn: isDark ? "#4CAF50" : "#4CAF50",
    signUp: isDark ? "#2196F3" : "#2196F3",
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.themeSwitch}>
        <Text style={{ color: theme.text, marginRight: 8 }}>
          {isDark ? "Dark" : "Light"} Mode
        </Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <Text style={[styles.title, { color: theme.text }]}>
        Welcome to{"\n"}TaskSaga
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.signIn }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

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
    marginBottom: 60,
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
});
