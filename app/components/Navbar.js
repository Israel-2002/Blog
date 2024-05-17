"use client";

import Image from "next/image";
import Container from "./Container";
import logo from "../../public/logo.svg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const signOutHandler = () => {
    signOut({ redirect: false });
    toast.success("Signed out");
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav className="py-4 border-b border-b-secondary fixed top-0 left-0 bg-primary z-40 w-full">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={logo} width={40} height={40} alt="logo image" />
          </Link>

          <div className="md:hidden">
            {!isOpen ? (
              <RiMenuLine
                size={24}
                className="text-secondary"
                onClick={toggleMenu}
              />
            ) : (
              <RiCloseLine
                size={24}
                className="text-secondary"
                onClick={toggleMenu}
              />
            )}

            {isOpen && (
              <div className="absolute top-20 right-4 w-3/5 shadow-lg bg-primary z-50">
                <ul className="flex flex-col">
                  <li
                    className="border-b border-b-accent py-4 block px-8"
                    onClick={toggleMenu}
                  >
                    <Link href="/">Blogs</Link>
                  </li>
                  <li
                    className="border-b border-b-accent py-4 block px-8"
                    onClick={toggleMenu}
                  >
                    <Link href={currentUser ? "/create" : "/login"}>
                      Create Blog
                    </Link>
                  </li>
                  {!currentUser ? (
                    <li className="py-4 block px-8" onClick={toggleMenu}>
                      <Link href="/login">Sign In</Link>
                    </li>
                  ) : (
                    <li className="py-4 block px-8" onClick={toggleMenu}>
                      <button onClick={signOutHandler}>Sign Out</button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <ul className="md:flex gap-8 hidden">
            <li>
              <Link href="/">Blogs</Link>
            </li>
            <li>
              <Link href={currentUser ? "/create" : "/login"}>Create Blog</Link>
            </li>
            {!currentUser ? (
              <li>
                <Link href="/login">Sign In</Link>
              </li>
            ) : (
              <li>
                <button onClick={signOutHandler}>Sign Out</button>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
