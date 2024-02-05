import type { Payload } from "payload";

import { courseDataArray } from "./courses";

const randScore = (min = 25, max = 78) => {
  return Math.floor(Math.max(min, Math.random() * max));
};

export const seed = async (payload: Payload): Promise<void> => {
  // create admin
  await payload.create({
    collection: "admins",
    data: {
      name: "Admin",
      role: "admin",
      email: "admin@gmail.com",
      password: "admin123",
    },
  });

  // create student
  const student = await payload.create({
    collection: "students",
    data: {
      name: "Agbaje Enoch Okikijesu",
      matricNo: "CSC/2017/031",
      email: "agbajeenoch@gmail.com",
      password: "CSC/2017/031",
      department: "Computer Science and Engineering",
      faculty: "Technology",
      part: 4,
      role: "student",
    },
  });

  // create courses
  const courses = await Promise.all(
    courseDataArray.map(data =>
      payload.create({
        collection: "courses",
        data,
      })
    )
  );

  const results = await Promise.all(
    Array(courses.length)
      .fill(0)
      .map((_, i) => {
        const caScore = randScore(12, 35);
        const examScore = randScore(20, 48);
        const totalScore = caScore + examScore;
        return payload.create({
          collection: "course_results",
          data: {
            student: student.id,
            course: courses[i].id,
            caScore,
            examScore,
            totalScore,
          },
        });
      })
  );

  await payload.update({
    collection: "students",
    id: student.id,
    data: {
      courses: results.map(({ id }) => id),
    },
  });
};
