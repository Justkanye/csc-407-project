import { CollectionConfig } from "payload/types";

import { isAdmin, isAdminOrTeacher } from "../accessControls";

export const CourseResults: CollectionConfig = {
  slug: "course_results",
  admin: {
    hidden: true,
  },
  hooks: {
    afterChange: [({ doc }) => {}],
  },
  access: {
    read: () => true,
    create: isAdminOrTeacher,
    update: isAdminOrTeacher,
    delete: isAdmin,
  },
  fields: [
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
    },
    {
      name: "student",
      type: "relationship",
      relationTo: "students",
      required: true,
    },
    {
      name: "caScore",
      type: "number",
      min: 0,
      label: "CA Score",
    },
    {
      name: "examScore",
      type: "number",
      min: 0,
      label: "Exam Score",
    },
    {
      name: "totalScore",
      type: "number",
      min: 0,
      max: 100,
      label: "Total Score",
    },
  ],
};
