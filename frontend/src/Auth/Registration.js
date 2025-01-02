import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userRegistrationService } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(1, "Too short")
    .max(50, "First Name must be less than 50 characters")
    .required("First Name is required")
    .test(
      "no-only-spaces",
      "Firstname cannot contain only spaces",
      (value) => value.trim().length > 0
    ),
  lastName: Yup.string()
    .min(1, "Too short")
    .max(50, "Last Name must be less than 50 characters")
    .required("Last Name is required")
    .test(
      "no-only-spaces",
      "Lastname cannot contain only spaces",
      (value) => value.trim().length > 0
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Registration = () => {
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const handleSubmit = async (values) => {
    const registered = await userRegistrationService(values);

    if (registered) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center  mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-600">
            Create Account
          </h1>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.firstName && touched.firstName
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.lastName && touched.lastName
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none`}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={`w-full px-3 py-2 bg-gray-700 text-white border rounded-md 
                    ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-600 focus:border-yellow-500"
                    } 
                    transition-colors duration-300 focus:outline-none`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-green-600 
                  text-white font-semibold rounded-md hover:from-yellow-600 hover:to-green-700 
                  transition-all duration-300 transform hover:scale-105 focus:outline-none 
                  focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
