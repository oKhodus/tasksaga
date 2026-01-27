import { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { getToken } from "./src/auth/storage";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setLoading(false);
    };

    loadToken();
  }, []);

  if (loading) return null;

  return <AppNavigator token={token} setToken={setToken} />;
}
