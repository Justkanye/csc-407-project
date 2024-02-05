import Link from "next/link";
import Image from "next/image";
import type { PropsWithChildren } from "react";

import { sideNavLinks } from "../common/constants";
import ChevronDownIcon from "../common/components/icons/ChevronDownIcon";
import { getCurrentStudent } from "../common/utils/getCurrentStudent";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { student } = await getCurrentStudent({ nullUserRedirect: "/login" });
  return (
    <div className='bg-white text-primary'>
      <header className='bg-[#D8E3FF]'>
        <div className='p-4 flex items-center gap-2'>
          <Image alt='OAU Logo' src='/icon.png' width={89} height={82} />
          <div>
            <h1 className='text-3xl font-bold'>Obafemi Awolowo University</h1>
            <h3 className='text-2xl font-medium'>Student Information Portal</h3>
          </div>
        </div>
        <nav className='bg-[#1E40AF] py-2 px-4 text-white flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <Link href='#' className='hover:text-[#FFC700]'>
              Home
            </Link>
            <div className='flex items-center text-[#FFC700]'>
              <Link href='#'>Students</Link>
              <ChevronDownIcon className='stroke-[#FFC700]' />
            </div>
            <div className='flex items-center group hover:text-[#FFC700]'>
              <Link href='#'>Staff</Link>
              <ChevronDownIcon className='stroke-white group-hover:stroke-[#FFC700]' />
            </div>
            <Link href='#' className='hover:text-[#FFC700]'>
              FAQs
            </Link>
            <Link href='#' className='hover:text-[#FFC700]'>
              Contact Us
            </Link>
          </div>
          <p>
            <span className='max-md:hidden'>Welcome, {student.name},</span>
            <a
              className='hover:underline hover:text-[#FFC700] ml-1'
              href='/api/logout'
            >
              Sign out
            </a>
          </p>
        </nav>
      </header>
      <main className='flex'>
        <aside className='w-72 bg-[#F5F8FF] pt-6 pb-4 max-md:hidden'>
          <h4 className='text-2xl font-semibold text-primary text-center'>
            Profile Menu
          </h4>
          <hr className='bg-[#B5B5B5] my-3' />
          <nav>
            <ul className='space-y-1'>
              {sideNavLinks.map(l => (
                <li key={l.toLowerCase().replaceAll(" ", "-")}>
                  <a
                    className={
                      "block p-2 hover:bg-primary hover:text-white" +
                      (l === "View Semester Raw Score"
                        ? " bg-primary text-white hover:bg-[#1E40AF]"
                        : "")
                    }
                    href='#'
                  >
                    {l}
                  </a>
                </li>
              ))}
              <li className='mt-8'>
                <a
                  className='block p-2 hover:bg-danger hover:text-white'
                  href='/api/logout'
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        {children}
      </main>
    </div>
  );
}
