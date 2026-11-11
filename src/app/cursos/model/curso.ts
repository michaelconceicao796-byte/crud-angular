import { Lesson } from "./lesson";

export interface Curso {
  _id: number | string;
  name: string;
  category: string;
  lessons: Lesson[];
}
