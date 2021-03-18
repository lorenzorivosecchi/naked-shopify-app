import { localStorageKeys } from "src/utils/constants";
import useLogout from "src/utils/hooks/useLogout";

const LogoutButton: React.FC<{}> = () => {
  const [logout] = useLogout();
  return (
    <button
      onClick={() => {
        logout({
          variables: {
            accessToken: localStorage.getItem(localStorageKeys.CUSTOMER_TOKEN),
          },
        });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
