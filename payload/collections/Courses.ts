import { CollectionConfig } from "payload/types";

import { isAdminOrTeacher, isAdmin } from "../accessControls";

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "code",
  },
  access: {
    read: () => true,
    create: isAdminOrTeacher,
    update: isAdminOrTeacher,
    delete: isAdmin,
  },
  fields: [
    {
      name: "code",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "title",
      required: true,
      type: "text",
    },
    {
      name: "unit",
      required: true,
      type: "number",
      min: 1,
      max: 8,
    },
  ],
};
