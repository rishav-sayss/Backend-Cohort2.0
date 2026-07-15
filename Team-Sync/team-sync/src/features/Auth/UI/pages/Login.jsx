import React from "react";
import { useForm } from "react-hook-form";
import { Cloud, SquareTerminal, LogIn, Zap } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";
 

export default function Login() {

 const {register, handleSubmit, loginsubmit ,errors ,watch,isSubmitting, isSubmitSuccessful }  =  useAuth()

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#111116] border border-neutral-800/80 rounded-2xl px-10 pt-10 pb-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center mb-4 shadow-lg shadow-violet-900/40">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Synthetix AI</h1>
            <p className="text-neutral-400 text-sm mt-1">Sign in to your workspace</p>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#18181f] py-3 text-xs font-semibold tracking-wide text-neutral-200 hover:bg-neutral-900 transition-colors"
            >
              <Cloud className="w-4 h-4" />
              GOOGLE
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#18181f] py-3 text-xs font-semibold tracking-wide text-neutral-200 hover:bg-neutral-900 transition-colors"
            >
              <SquareTerminal className="w-4 h-4" />
              GITHUB
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-neutral-800" />
            <span className="text-xs text-neutral-500 whitespace-nowrap">or continue with email</span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

          <form onSubmit={handleSubmit(loginsubmit)} noValidate>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold tracking-wide text-neutral-300 mb-2"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`w-full bg-[#0d0d12] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-violet-400 ${
                  errors.email ? "border-red-500/70" : "border-neutral-800"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold tracking-wide text-neutral-300"
                >
                  PASSWORD
                </label>
                <a href="#" className="text-xs text-violet-300 hover:text-violet-200">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-[#0d0d12] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-violet-400 ${
                  errors.password ? "border-red-500/70" : "border-neutral-800"
                }`}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

            {/* Stay signed in */}
            <div className="mb-6">
              <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
                <input
                  type="checkbox"
                  {...register("stayLoggedIn")}
                  className="w-[18px] h-[18px] rounded-md border border-neutral-700 bg-[#0d0d12] accent-violet-500 cursor-pointer"
                />
                <span className="text-sm text-neutral-300">Stay signed in</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              {!isSubmitting && <LogIn className="w-4 h-4" />}
            </button>
          </form>

          {/* Divider + sign up */}
          <div className="h-px bg-neutral-800 my-7" />
          <p className="text-center text-sm text-neutral-400">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-violet-300 hover:text-violet-200 font-semibold">
              Sign Up
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-neutral-500 space-y-2">
          <p>© 2024 Synthetix AI. Enterprise Intelligence Platforms.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="hover:text-neutral-300">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}