import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Registration = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      department: "",
      favoriteFoods: [] as string[],
      photo: null as File | null,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(/[a-zA-Z]/, "Must include at least one letter")
        .matches(/[0-9]/, "Must include at least one number")
        .matches(/[@$!%*#?&]/, "Must include at least one special character"),
      gender: Yup.string().required("Gender is required"),
      department: Yup.string().required("Department is required"),
      favoriteFoods: Yup.array().min(1, "Select at least one food"),
      photo: Yup.mixed().required("Photo is required"),
    }),

    onSubmit: (values) => {
      console.log("🟢 Registration submitted:", {
        ...values,
        photo: values.photo?.name || "No photo",
      });
      alert("Registration successful! ✅\n(Check console for details)");
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex gap-8">
              {["Male", "Female"].map((gender) => (
                <label key={gender} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    onChange={formik.handleChange}
                    checked={formik.values.gender === gender}
                  />
                  {gender}
                </label>
              ))}
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.gender}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Department
            </label>
            <select
              name="department"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
            >
              <option value="">Select Department</option>
              <option value="Law">Law</option>
              <option value="Medicine">Medicine</option>
              <option value="Architecture">Architecture</option>
              <option value="Accounting">Accounting</option>
              <option value="Engineering">Humanities</option>
            </select>
            {formik.touched.department && formik.errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.department}
              </p>
            )}
          </div>

          {/* Favorite Foods */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Favorite Foods
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Rice", "Beans", "Spaghetti", "Yam"].map((food) => (
                <label key={food} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="favoriteFoods"
                    value={food}
                    onChange={formik.handleChange}
                    checked={formik.values.favoriteFoods.includes(food)}
                  />
                  {food}
                </label>
              ))}
            </div>
            {formik.touched.favoriteFoods && formik.errors.favoriteFoods && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.favoriteFoods}
              </p>
            )}
          </div>

          {/* Upload Photo */}
          <div>
            <div className="flex flex-col items-center gap-2 mt-4">
              {/* Image Preview */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border shadow"
                />
              )}

              {/* Filename */}
              {formik.values.photo && (
                <span className="text-sm text-gray-700">
                  {formik.values.photo.name}
                </span>
              )}

              {/* Upload Button */}
              <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 mt-2">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Error message */}
            {formik.touched.photo && formik.errors.photo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.photo}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
