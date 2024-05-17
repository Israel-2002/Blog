"use client";

import Link from "next/link";
import Container from "../components/Container";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <section className="py-32">
      <Container>
        <div className="mb-12">
          <h2 className="font-krooner text-6xl md:text-7xl lg:text-8xl text-center capitalize">
            Create an account
          </h2>
          <p className="text-center mt-4 text-lg lg:text-xl text-accent">
            Come join us, we have some gists for you!
          </p>
        </div>

        <RegisterForm />

        <p className="text-center mt-8">
          Already have an account?{" "}
          <span className="text-accent cursor-pointer">
            <Link href="/login">Sign In</Link>
          </span>
        </p>
      </Container>
    </section>
  );
};

export default Register;
