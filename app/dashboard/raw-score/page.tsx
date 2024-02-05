import Image from "next/image";
import { notFound } from "next/navigation";

import { CourseResult } from "@/payload/payload-types";
import { getPayloadClient } from "@/payload/getPayload";
import { getCurrentStudent } from "@/app/common/utils/getCurrentStudent";

export const metadata = {
  title: "View Semester Raw Score",
};

const StudentRawScorePage = async () => {
  const { student } = await getCurrentStudent({ nullUserRedirect: "/login" });
  const studentCourses = (
    student.courses ? student.courses.filter(c => typeof c !== "string") : []
  ) as CourseResult[];
  const totalUnits = studentCourses.reduce((prev, current) => {
    const currentCourseUnit =
      typeof current.course === "string" ? 0 : current.course.unit;
    return prev + currentCourseUnit;
  }, 0);

  return (
    <section className='flex-1 py-6 px-4'>
      <h2 className='text-primary text-3xl font-bold'>View Raw Score</h2>
      <p className='text-base mt-1 max-w-xl text-danger'>
        Always Calculate your GPA and CGPA every Semester with the result below
        to know your current status
      </p>
      <hr className='my-4 bg-[#818181]' />
      <div className='flex justify-between'>
        <div className='text-primary text-sm flex flex-col gap-2'>
          <p>
            Registration Number:{" "}
            <span className='font-semibold'>{student.matricNo}</span>
          </p>
          <p>
            Name: <span className='font-semibold'>{student.name}</span>
          </p>
          <p>
            Session/Semester:{" "}
            <span className='font-semibold'>
              HARMATTAN SEMESTER 2022/2023 SESSION
            </span>
          </p>
          <p>
            Current Part: <span className='font-semibold'>{student.part}</span>
          </p>
          <p>
            Faculty: <span className='font-semibold'>{student.faculty}</span>
          </p>
          <p>
            Department:{" "}
            <span className='font-semibold'>{student.department}</span>
          </p>
        </div>
        <div className='self-center'>
          <Image
            alt='Student'
            src='/images/placeholder.png'
            width={110}
            height={135}
          />
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-xl text-primary mb-6 border-primary border-b-2 w-fit font-bold'>
          List of Registered Courses
        </h3>
        <table className='w-full my-2 text-sm'>
          <thead className='bg-[#D8E3FF] text-primary'>
            <tr>
              <th className='pl-4 py-6 text-left'>Course Code</th>
              <th className='py-6 text-left'>Course Title</th>
              <th className='py-6 text-left'>Course Unit</th>
              <th className='py-6 text-left'>CA Score</th>
              <th className='py-6 text-left'>Exam Score</th>
              <th className='pr-4 py-6 text-left'>Total</th>
            </tr>
          </thead>
          <tbody className='text-primary text-sm'>
            {studentCourses.map((courseResult, i) => {
              return (
                <tr
                  className={i % 2 !== 0 ? "bg-[#F6F6F6]" : ""}
                  key={courseResult.id}
                >
                  <td className='p-2 pl-4'>
                    {typeof courseResult.course !== "string" &&
                      courseResult.course.code}
                  </td>
                  <td className='p-2'>
                    {typeof courseResult.course !== "string" &&
                      courseResult.course.title}
                  </td>
                  <td className='p-2'>
                    {typeof courseResult.course !== "string" &&
                      courseResult.course.unit}
                  </td>
                  <td className='p-2'>{courseResult.caScore}</td>
                  <td className='p-2'>{courseResult.examScore}</td>
                  <td className='p-2 pr-4'>{courseResult.totalScore}</td>
                </tr>
              );
            })}
            <tr className='bg-[#F5F8FF] font-semibold text-base text-primary'>
              <td colSpan={2} className='p-3 pl-4'>
                Total Number of Units Registered
              </td>
              <td colSpan={4} className='p-3'>
                {totalUnits}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-8 p-3 bg-[#F5F8FF] text-primary text-base'>
        <h3 className='font-semibold'>C) RESULTS SUMMARY</h3>
        <div className='bg-[#D8E3FF] flex items-center justify-between p-4'>
          <h6 className='font-bold'>Previous</h6>
          <h6 className='font-bold'>Present</h6>
          <h6 className='font-bold'>Cummulative</h6>
        </div>
        <table className='w-full mt-2'>
          <thead className='bg-[#D8E3FF]'>
            <tr className='font-semibold'>
              <th className='p-2'>TNU</th>
              <th className='p-2'>TCP</th>
              <th className='p-2'>GPA</th>
              <th className='p-2'>TNU</th>
              <th className='p-2'>TCP</th>
              <th className='p-2'>GPA</th>
              <th className='p-2'>TNU</th>
              <th className='p-2'>TCP</th>
              <th className='p-2'>GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td className='p-2'>0</td>
              <td className='p-2'>0</td>
              <td className='p-2'>3.72</td>
              <td className='p-2'>18</td>
              <td className='p-2'>67</td>
              <td className='p-2'>3.72</td>
              <td className='p-2'>18</td>
              <td className='p-2'>67</td>
              <td className='p-2'>3.72</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentRawScorePage;
