"use server";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";


const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email,
        password,
      });

    } catch (error) {
      const someError = error as CredentialsSignin;
      return someError.cause?.err?.toString();
    };
    redirect("/");
}

const register = async (formData: FormData) => {
    const firstName = formData.get('firstname') as string; 
    const lastName = formData.get('lastname') as string; 
    const email = formData.get('email') as string; 
    const password = formData.get('password') as string; 

    if (!firstName || !lastName || !email || !password){
        throw new Error('Please fill all fields');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await hash(password, 12);
    // Create new user
    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        },
    });

    if (!newUser) {
        throw new Error('Failed to create user');
    }

    redirect('/login');

}

const fetchUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export { login, register, fetchUsers }

