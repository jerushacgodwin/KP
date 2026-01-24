"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@src/components/InputField";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  remember: z.boolean().optional(),
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
      const loginRes = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        throw new Error(errorData?.errors?.[0]?.msg || "Login failed");
      }

      const loginData = await loginRes.json();

      if (loginData.message === 'Success' && loginData.redirect) {
          router.push(loginData.redirect);
          router.refresh();
      } else {
          router.push("/");
          router.refresh();
      } 

    } catch (err: any) {
      console.error(err);
      setError("root", { message: err.message });
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
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="remember" 
              {...register("remember")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
          </div>

          {errors.root && (
             <div className="text-red-500 text-sm">{errors.root.message}</div>
          )}

          <button
            type="submit"
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