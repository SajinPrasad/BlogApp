import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginService } from "../services/authServices";
import { setToken } from "../features/authSlice";
import { setUser } from "../features/userSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [accessToken])

  const handleLogin = async (values) => {
    const response = await loginService(values);
    if (response) {
      dispatch(
        setToken({
          refreshToken: response.refresh,
          accessToken: response.access,
        })
      );
      dispatch(
        setUser({
          id: response.id,
          email: response.email,
          username: response.username,
        })
      );
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center  mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-600">
            Login to Your Account
          </h1>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
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
                    name="password"
                    id="password"
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

                <div className="flex justify-between items-center">
                  {/* <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-gray-400"
                    >
                      Remember me
                    </label>
                  </div> */}
                  <div>
                    <a
                      href="#"
                      className="text-sm text-yellow-500 hover:text-yellow-600 transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-green-600 
                text-white font-semibold rounded-md hover:from-yellow-600 hover:to-green-700 
                transition-all duration-300 transform hover:scale-105 focus:outline-none 
                focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
                disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-400">
                    Don't have an account?
                    <a
                      href="/register"
                      className="ml-1 text-yellow-500 hover:text-yellow-600 transition-colors"
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
