import { atom } from "recoil";

export interface Course {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  price: string;
  published: boolean;
}
export const courseState = atom<{
  isLoading: boolean;
  course?: Course | null;
}>({
  key: "courseState",
  default: {
    isLoading: false,
    course: null,
  },
});
