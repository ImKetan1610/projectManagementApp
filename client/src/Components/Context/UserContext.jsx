import { createContext, useState } from "react";

// Create the context with a default value of undefined for both user and setUser
export const context = createContext(undefined);

function MyContextApp({ children }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    isAuthorize: false,
  });

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
}

export default MyContextApp;
