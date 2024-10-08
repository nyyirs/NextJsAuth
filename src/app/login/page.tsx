"use client";

import { useState } from "react";
import { login } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const result = await login(formData);
    setErrorMessage(result?.toString() || "");

  };

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <form className="my-8" action={handleSubmit}>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          name="email"
        />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="*************"
          type="password"
          name="password"
          className="mb-6"
        />

        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Login &rarr;
        </button>
        <p className="text-right text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
          Don't have account? <Link href="/register">Register</Link>
        </p>
      </form>      
    </div>
  );
};

export default Login;