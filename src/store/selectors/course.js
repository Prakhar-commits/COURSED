import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const courseDetails = selector({
  key: "courseDetails",
  get: ({ get }) => {
    const state = get(courseState);
    return state.course;
  },
});

export const isCourseLoading = selector({
  key: "isCourseLoading",
  get: ({ get }) => {
    const state = get(courseState);
    return state.isLoading;
  },
});

export const courseTitle = selector({
  key: "courseTitle",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.title;
    }
    return "";
  },
});

export const courseDescription = selector({
  key: "courseDescription",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.description;
    }
    return "";
  },
});
