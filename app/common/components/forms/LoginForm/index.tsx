"use client";
import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { LOGIN_SUCCESS_URL } from "@/app/common/constants";
import { initialValues, validationSchema } from "./form.constants";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then(res =>
            res.json().then(v => {
              if (v.success) router.replace(LOGIN_SUCCESS_URL);
              else {
                setSubmitting(false);
                setError(String(v.error));
              }
            })
          )
          .catch(e => {
            setSubmitting(false);
            console.log(e?.message ?? e);
            setError("An error occurred. Please try again later.");
          });
      }}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className='mt-6 w-full max-w-md flex flex-col gap-4'
        >
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {!!errors.email && !!touched.email && (
              <p className='text-danger'>{errors.email}</p>
            )}
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              name='password'
              type='password'
              placeholder='Enter your password'
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {!!errors.password && !!touched.password && (
              <p className='text-danger'>{errors.password}</p>
            )}
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
          {!!error && <p className='text-danger'>{error}</p>}
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
