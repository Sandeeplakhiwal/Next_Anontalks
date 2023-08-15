"use client";

// Importing Sass file
import "../../../styles/signup.scss";

// Importing important libraries
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { Context } from "@/components/client/clientComponent";
import { useFormik } from "formik";
import { signupSchema } from "@/schema/signup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupAction } from "@/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// Main Signup Page Function
function Page() {
  // Get Context Variables
  const { user, setUser } = useContext(Context);

  // Define variable to dispatch an action
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  // Defined Initial Values of FormData
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Using Formik to handle Form Validation
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        console.log("task 1", values);
        mutation.mutate({
          name: values.name,
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
      return dispatch(signupAction(formData));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["signup"]);
    },
  });

  // Getting server returned values from auth reducer
  const {
    message,
    user: registeredUser,
    error,
    loading,
  } = useSelector((state) => state.auth);

  if (message || user || error || loading)
    console.log("Task 5", "reducer data");

  // Using useEffect hook because if whenever state changes of mentioned values it runs
  useEffect(() => {
    if (registeredUser) {
      setUser(registeredUser);
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);

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
            // textDecoration: "underline",
            marginBottom: "2%",
          }}
        >
          Anontalks
        </h1>

        <p>Signup to chat with your friends</p>

        <div className="login-with-fb-div">
          <button>Login with facebook</button>
        </div>

        <p className="signup-or">OR</p>

        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            placeholder="Username"
            name="name"
            id="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.name && touched.name ? (
            <p className="input-err-p">{errors.name}</p>
          ) : null}

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

          <input
            type={"password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="input-err-p">{errors.confirmPassword}</p>
          ) : null}

          <button type="submit">{loading ? "Loading..." : "Signup"}</button>

          <p>OR</p>

          <Link href={"/auth/signin"}>Login into existing account</Link>
        </form>
      </section>
    </div>
  );
}

export default Page;
