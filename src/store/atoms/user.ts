import { atom } from "recoil";

const userState = atom<{
  isLoading: boolean;
  userEmail: string | null;
}>({
  key: "userState",
  default: { isLoading: true, userEmail: null },
});

export default userState;
