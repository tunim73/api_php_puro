import { useCallback, useEffect, useState } from "react";
import { userApi } from "services";
import { User } from "types";

export const useSubscribersDashboard = () => {
  const [users, setusers] = useState<User[]>([]);

  const fetcher = useCallback(async () => {
    const users = await userApi.findAllSubscribers();

    if (!users) return;
    setusers(users);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { users, fetcher };
};
