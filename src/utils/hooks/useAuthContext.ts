import { AuthContext } from "src/utils/context/auth";
import { useContext } from "react";

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within the AuthProvider component"
    );
  }
  return context;
}
