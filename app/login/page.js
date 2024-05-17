"use client";

import Link from "next/link";
import Container from "../components/Container";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className="py-32">
      <Container>
        <div className="mb-12">
          <h2 className="font-krooner text-6xl md:text-7xl lg:text-8xl text-center capitalize">
            Welcome back
          </h2>
          <p className="text-center mt-4 text-lg lg:text-xl text-accent">
            Good to see you again!
          </p>
        </div>

        <LoginForm />

        <p className="text-center mt-8">
          Don&apos;t have an account?{" "}
          <span className="text-accent cursor-pointer">
            <Link href="/register">Sign Up</Link>
          </span>
        </p>
      </Container>
    </section>
  );
};

export default Login;
