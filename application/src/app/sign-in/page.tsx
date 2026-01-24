"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@src/components/InputField";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type Inputs = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: Inputs) => {
    setLoading(true);
    try {
      // 1. Login
      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        throw new Error(errorData?.errors?.[0]?.msg || "Login failed");
      }

      const loginData = await loginRes.json();
      const user = loginData.user;
      
      // Store token and user
      Cookies.set("token", loginData.token);
      Cookies.set("log-user", JSON.stringify(user));

      // 2. Fetch Permissions (Menu)
      const roleRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loginData.token}`
        },
        body: JSON.stringify({ role: user.role, userId: user.id }),
      });

      if (!roleRes.ok) {
         // Even if role fetch fails, we might still want to proceed or handle gracefully
         console.error("Failed to fetch menu permissions");
      } else {
         const roleData = await roleRes.json();
         if(roleData.userpermission) {
             Cookies.set("log-menu", JSON.stringify(roleData.userpermission));
         }
      }

      // Redirect
      router.push("/");
      router.refresh(); 

    } catch (err: any) {
      console.error(err);
      setError("root", { message: err.message });
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-xl font-bold mb-8">Sign In</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
          <InputField
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          
          {errors.root && (
             <div className="text-red-500 text-sm">{errors.root.message}</div>
          )}

          <button
            className="bg-blue-400 text-white p-3 rounded-md hover:bg-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;