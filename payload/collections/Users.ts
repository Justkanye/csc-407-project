import { CollectionConfig } from "payload/types";

import { isAdmin, isAdminOrTeacher } from "../accessControls";

export const Admins: CollectionConfig = {
  slug: "admins",
  labels: {
    singular: "Admin or Teacher",
    plural: "Admins and Teachers",
  },
  admin: {
    useAsTitle: "name",
  },
  auth: true,
  access: {
    read: isAdminOrTeacher,
    create: isAdmin,
    update: ({ req, data }) => {
      const user = req.user;
      if (user.role === "admin") return true;
      return data.id === user.id;
    },
    delete: () => false,
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: ["Admin", "Teacher"].map(role => ({
        label: role,
        value: role.toLowerCase(),
      })),
      defaultValue: "teacher",
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export const Students: CollectionConfig = {
  slug: "students",
  admin: {
    useAsTitle: "matricNo",
  },
  access: {
    read: ({ req }) => !!req.user,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Student",
          value: "student",
        },
      ],
      required: true,
      defaultValue: "student",
      hidden: true,
    },
    {
      name: "matricNo",
      type: "text",
      required: true,
      unique: true,
      label: "Matric Number",
    },
    {
      name: "part",
      type: "number",
      required: true,
      min: 1,
      max: 7,
    },
    {
      name: "department",
      type: "text",
      required: true,
    },
    {
      name: "faculty",
      type: "text",
      required: true,
    },
    {
      name: "courses",
      type: "relationship",
      relationTo: "course_results",
      hasMany: true,
    },
    // {
    //   name: "profilePicture",
    //   type: "upload",
    //   relationTo: "images",
    // }
  ],
  auth: true,
};
