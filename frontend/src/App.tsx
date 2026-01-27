import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { VerifyPage } from "./pages/VerifyPage";

const App = () => {
  return (
    <div>
      <h1>Tasksaga Auth</h1>
      <RegisterPage />
      <LoginPage />
      <VerifyPage />
    </div>
  );
};
export default App;