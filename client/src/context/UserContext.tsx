import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TUserContextValues = {
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UserContext = createContext<TUserContextValues | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setUserId(userId);
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used inside of it's Provider's scope");
  return context;
}
