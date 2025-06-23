import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { initializeUser } from "../utils/auth";

export default function MainWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  useEffect(() => {
    const handler = async () => {
      setLoading(true);

      await initializeUser(setUser);

      setLoading(false);
    };
    handler();
  }, [setUser]);

  return <>{loading ? null : children}</>;
}
