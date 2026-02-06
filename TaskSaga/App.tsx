import { useEffect, useState, useCallback } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { getToken, saveToken } from "./src/auth/storage";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'TaskSaga-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'TaskSaga-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const t = params.get("token");
          if (t) {
            setToken(t);
            await saveToken(t);
            window.history.replaceState({}, document.title, "/");
          } else {
            const stored = await getToken();
            setToken(stored);
          }
        } else {
          const stored = await getToken();
          setToken(stored);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady && (fontsLoaded || fontError)) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded, fontError]);

  if (!isReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigator token={token} setToken={setToken} />
    </View>
  );
}