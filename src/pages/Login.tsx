import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function Login() {
  const [passwordInput, setPasswordInput] = useState("");

  // Regex checks
  const hasLetter = /[a-zA-Z]/.test(passwordInput);
  const hasNumber = /[0-9]/.test(passwordInput);
  const hasSpecial = /[!@#$%^&*]/.test(passwordInput);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login Form Submitted:", values);
    },
  });

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              formik.handleChange(e);
              setPasswordInput(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}

          {/* Live Condition Checkboxes */}
          <div className="mt-3 space-y-1 text-sm text-gray-700">
            {hasLetter && (
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly />
                <span>Contains a letter </span>
              </div>
            )}

            {hasNumber && (
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly />
                <span>Contains a number </span>
              </div>
            )}

            {hasSpecial && (
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly />
                <span>Contains a special character </span>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
