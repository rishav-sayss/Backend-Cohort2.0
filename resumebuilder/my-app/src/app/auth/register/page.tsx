"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";
import { registerApi } from "@/Apis/auth.api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMsg(null);
    try {
     let res =  await registerApi(data);
     console.log("register user " , res)
      // Successful registration redirects to login page
      router.push("/auth/login");
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message || 
        error?.message || 
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Left Section - AI Resume Builder Branding Showcase */}
      <div className="hidden md:flex w-full md:w-1/2 lg:w-[55%] bg-gradient-to-br from-violet-600 via-indigo-800 to-blue-700 p-12 lg:p-16 text-white flex-col justify-between relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-60 -mb-60" />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <Sparkles className="w-5 h-5 text-indigo-200 animate-pulse" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
            ResumeAI
          </span>
        </div>

        {/* Center Content & Features Showcase */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Build your professional resume in minutes.
          </h1>
          <p className="mt-4 text-lg text-indigo-100/90 leading-relaxed font-light">
            Empower your job search with our AI assistant. Get past recruitment filters, auto-optimize your language, and land more interviews.
          </p>

          {/* Feature List */}
          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="mt-1 p-1 bg-white/10 rounded-lg border border-white/10 group-hover:bg-white/20 transition-all duration-200">
                <CheckCircle2 className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">ATS Optimization</h3>
                <p className="text-sm text-indigo-200/80 mt-1">
                  Cross-reference your resume against target job descriptions automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="mt-1 p-1 bg-white/10 rounded-lg border border-white/10 group-hover:bg-white/20 transition-all duration-200">
                <CheckCircle2 className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">AI Content Suggestions</h3>
                <p className="text-sm text-indigo-200/80 mt-1">
                  Generate context-aware bullet points, summary profiles, and matching skills.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="mt-1 p-1 bg-white/10 rounded-lg border border-white/10 group-hover:bg-white/20 transition-all duration-200">
                <CheckCircle2 className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Premium PDF Templates</h3>
                <p className="text-sm text-indigo-200/80 mt-1">
                  Recruiter-approved templates designed for maximum readability and clean output.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Dashboard (ATS Score widget) */}
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-2xl relative max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">ATS Match Score</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Audit
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" className="stroke-white/10" strokeWidth="6" fill="none" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="32" 
                    className="stroke-indigo-400 transition-all duration-1000 ease-out" 
                    strokeWidth="6" 
                    fill="none"
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - 0.94)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-base font-bold text-white">94%</div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-white">Excellent Content Strength</h4>
                <p className="text-xs text-indigo-200/80 mt-1">
                  ✓ Keyword density optimized
                </p>
                <p className="text-xs text-indigo-200/80 mt-0.5">
                  ✓ Structure aligns with recruiter standards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright/link */}
        <div className="relative z-10 text-sm text-indigo-200/70 font-light">
          © {new Date().getFullYear()} ResumeAI. Empowering your next career move.
        </div>
      </div>

      {/* Right Section - Simplified Signup Card Canvas */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-8 lg:p-12 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(67,56,202,0.04)] p-8 sm:p-10">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              Create Account 🚀
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Get started with your professional resume today.
            </p>
          </div>

          {/* Error alert if registration fails */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-3 text-sm text-red-700 animate-fadeIn">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
              <div>
                <span className="font-semibold">Failed to register:</span> {errorMsg}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  disabled={isSubmitting}
                  {...register("name", {
                    required: "Full Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-800"
                />
              </div>
              {errors.name && (
                <span className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-medium">
                  <AlertCircle size={13} />
                  {errors.name.message}
                </span>
              )}
            </div>

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
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
                  {/* Small loading spinner */}
                  <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <>
                  Create Free Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?
            <Link
              href="/auth/login"
              className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}