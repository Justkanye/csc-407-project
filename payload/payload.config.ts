import path from "path";
import dotenv from "dotenv";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";

import { Courses } from "./collections/Courses";
import { Admins, Students } from "./collections/Users";
import { CourseResults } from "./collections/CourseResults";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    bundler: webpackBundler(),
    meta: {
      favicon: "/icon.png",
      ogImage: "/icon.png",
      titleSuffix: " | OAU Admin Portal",
    },
    user: Admins.slug,
  },
  collections: [Admins, Students, Courses, CourseResults],
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? "",
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
