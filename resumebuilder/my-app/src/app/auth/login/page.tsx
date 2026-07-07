"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";
import { loginApi } from "@/Apis/auth.api";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg(null);
    try {
      await loginApi(data);
      // Successful login redirects to resume builder dashboard
      router.push("/resume");
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message || 
        error?.message || 
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Left Section - AI Resume Builder Branding Showcase (Summarized & Compact) */}
      <div className="hidden md:flex w-full md:w-[45%] lg:w-[40%] bg-gradient-to-br from-violet-600 via-indigo-800 to-blue-700 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none -mr-30 -mt-30" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
            ResumeAI
          </span>
        </div>

        {/* Center Content & Features Showcase */}
        <div className="relative z-10 my-auto py-8">
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
            Build your professional resume in minutes.
          </h1>
          <p className="mt-3 text-sm text-indigo-100/80 leading-relaxed font-light">
            Empower your job search with our AI assistant to land more interviews.
          </p>

          {/* Summarized Feature Checklist */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
              <span className="text-sm font-medium text-white/95">ATS Optimization Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
              <span className="text-sm font-medium text-white/95">AI-Powered Content Suggestions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-indigo-300 shrink-0" />
              <span className="text-sm font-medium text-white/95">Recruiter-Approved PDF Templates</span>
            </div>
          </div>

          {/* Compact Match Score Widget */}
          <div className="mt-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 shadow-xl flex items-center gap-4 max-w-xs">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="22" className="stroke-white/10" strokeWidth="4" fill="none" />
                <circle 
                  cx="28" 
                  cy="28" 
                  r="22" 
                  className="stroke-indigo-400" 
                  strokeWidth="4" 
                  fill="none"
                  strokeDasharray={2 * Math.PI * 22}
                  strokeDashoffset={2 * Math.PI * 22 * (1 - 0.94)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-xs font-bold text-white">94%</div>
            </div>
            <div>
              <h4 className="font-semibold text-xs text-white">ATS Score: Excellent</h4>
              <p className="text-[11px] text-indigo-200/80 mt-0.5">
                Optimized keyword density
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 text-xs text-indigo-200/60 font-light">
          © {new Date().getFullYear()} ResumeAI.
        </div>
      </div>

      {/* Right Section - Login Card Canvas */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-8 lg:p-12 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(67,56,202,0.04)] p-8 sm:p-10">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              Login 👋
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Access your resume dashboard.
            </p>
          </div>

          {/* Error alert if login fails */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 text-sm text-red-700 animate-fadeIn">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
              <div>
                <span className="font-semibold">Login failed:</span> {errorMsg}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  disabled={isSubmitting}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-800"
                />
              </div>
              {errors.email && (
                <span className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-medium">
                  <AlertCircle size={13} />
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={isSubmitting}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-medium">
                  <AlertCircle size={13} />
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging In...
                </span>
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?
            <Link
              href="/auth/register"
              className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}