"use client";

// Importing Sass file
import "../../../styles/signup.scss";

// Importing important libraries
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { Context } from "@/components/client/clientComponent";
import { useFormik } from "formik";
import { loginSchema, signupSchema } from "@/schema/signup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "@/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// Main Login Page Function
function Page() {
  // Get Context Variables
  const { user, setUser } = useContext(Context);

  // Define variable to dispatch an action
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  // Defined Initial Values of FormData
  const initialValues = {
    email: "",
    password: "",
  };

  // Using Formik to handle Form Validation
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log("task 1", values);
        mutation.mutate({
          email: values.email,
          password: values.password,
        });
        action.resetForm();
      },
    });

  // Using Mutation from React-Query To Execute Post Request
  const mutation = useMutation({
    mutationFn: (formData) => {
      console.log("task 2", formData);
      return dispatch(loginAction(formData));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["signup"]);
      console.log("Task 7 ---success");
    },
  });

  // Getting server returned values from auth reducer
  const {
    message,
    user: loggedInUser,
    error,
    loading,
  } = useSelector((state) => state.auth);

  if (message || loggedInUser || error || loading)
    console.log("Task 5", "reducer data");

  // Using useEffect hook because if whenever state changes of mentioned values it runs
  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error, loggedInUser]);

  // Checking if user and userId is present in our context user, if yes then we will redirect user to the home page
  if (user && user._id) {
    console.log("Task 6 --- completed");
    redirect("/");
  }

  return (
    <div className="signup">
      <section>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "2%",
          }}
        >
          Anontalks
        </h1>
        <form onSubmit={handleSubmit} style={{ marginTop: "5vh" }}>
          <input
            type={"email"}
            placeholder="Email"
            name="email"
            id="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && touched.email ? (
            <p className="input-err-p">{errors.email}</p>
          ) : null}
          <input
            type={"password"}
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.password && touched.password ? (
            <p className="input-err-p">{errors.password}</p>
          ) : null}

          <button type="submit">
            {loading ? "Please wait..." : "Sign in"}
          </button>
          <p>OR</p>
          <div className="login-with-fb-div" style={{ marginTop: "-10px" }}>
            <button>Login with facebook</button>
          </div>
          <p>
            Don't have an account? <Link href={"/auth/signup"}>Sign up</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Page;
