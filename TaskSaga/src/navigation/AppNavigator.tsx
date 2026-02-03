import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import VerifyScreen from "../screens/VerifyScreen";
import HomeScreen from "../screens/HomeScreen";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

type AppNavigatorProps = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AppNavigator({ token, setToken }: AppNavigatorProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Если токен уже есть, или мы только что получили его из URL
    if (token) {
      setLoading(false);
    } else {
      // Можно добавить проверку localStorage / asyncStorage для веб
      setLoading(false);
    }
  }, [token]);

  if (loading) return null; // пока не знаем токен — не рендерим стек

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Verify" component={VerifyScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
