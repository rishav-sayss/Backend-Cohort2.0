import React from "react";
import { User, Mail, Lock, Sparkles, Check } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";

function getPasswordStrength(password = "") {
  let score = 0;
  if (password.length >= 8) score++;
  // if (/[A-Z]/.test(password)) score++;
  // if (/[0-9]/.test(password)) score++;
  // if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0-4
}

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong password"];
const strengthColors = [
  "bg-neutral-700",
  "bg-red-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-violet-400",
];

export default function Register() {
  const { register, handleSubmit, registersubmit ,errors ,watch ,isSubmitting, isSubmitSuccessful } = useAuth();

  const password = watch("password");
  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-white flex flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left panel */}
        <div className="relative lg:w-1/2 min-h-[320px] lg:min-h-screen overflow-hidden bg-[#0d1220] flex flex-col justify-between p-8 lg:p-10">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 30% 55%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 45% 40%, rgba(56,120,200,0.25), transparent 55%), #070a14",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
              viewBox="0 0 640 900"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="300" cy="470" r="160" fill="url(#coreGlow)" />
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2 + (i % 7);
                const len = 120 + ((i * 37) % 260);
                const x2 = 300 + Math.cos(angle) * len;
                const y2 = 470 + Math.sin(angle) * len * 0.85;
                const hue =
                  i % 3 === 0 ? "#93c5fd" : i % 3 === 1 ? "#c4b5fd" : "#f9a8d4";
                return (
                  <line
                    key={i}
                    x1="300"
                    y1="470"
                    x2={x2}
                    y2={y2}
                    stroke={hue}
                    strokeWidth={i % 5 === 0 ? 1.4 : 0.6}
                    opacity={0.5}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0f] hidden lg:block" />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              Synthetix AI
            </span>
          </div>

          <div className="relative z-10 mt-16 lg:mt-0">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-violet-300 mb-4">
              <Sparkles className="w-4 h-4" />
              NEXT-GEN INTELLIGENCE
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Accelerate your team&apos;s
              <br />
              intelligence.
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed mb-10">
              Connect your enterprise data to our specialized AI models and
              unlock unparalleled strategic insights in seconds.
            </p>

            <div className="flex gap-10">
              <div>
                <div className="text-xl font-bold">99.9%</div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  Uptime SLA
                </div>
              </div>
              <div>
                <div className="text-xl font-bold">ISO</div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  27001 Certified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Create your account</h2>
            <p className="text-neutral-400 text-sm mb-8">
              Experience the future of collaborative data intelligence.
            </p>

            <form onSubmit={handleSubmit(registersubmit)} noValidate>
              {/* Full Name */}
              <div className="mb-5">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className={`w-full bg-[#131318] border rounded-xl pl-11 pr-4 py-3.5 text-sm placeholder-neutral-500 outline-none transition-colors focus:border-violet-400 ${
                      errors.fullName
                        ? "border-red-500/70"
                        : "border-neutral-800"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
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
                    className={`w-full bg-[#131318] border rounded-xl pl-11 pr-4 py-3.5 text-sm placeholder-neutral-500 outline-none transition-colors focus:border-violet-400 ${
                      errors.email ? "border-red-500/70" : "border-neutral-800"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Use at least 8 characters",
                      },
                    })}
                    className={`w-full bg-[#131318] border rounded-xl pl-11 pr-4 py-3.5 text-sm placeholder-neutral-500 outline-none transition-colors focus:border-violet-400 ${
                      errors.password
                        ? "border-red-500/70"
                        : "border-neutral-800"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Strength meter */}
              <div className="mb-6">
                <div className="flex gap-1.5 mt-3 mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password && i < strength
                          ? strengthColors[strength]
                          : "bg-neutral-800"
                      }`}
                    />
                  ))}
                </div>
                {password && (
                  <p className="text-xs text-violet-300">
                    {strengthLabels[strength]}
                  </p>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <CheckboxVisual name="agree" register={register} />
                  <span className="text-sm text-neutral-400">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-violet-300 hover:text-violet-200 underline underline-offset-2"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-violet-300 hover:text-violet-200 underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.agree && (
                  <p className="text-red-400 text-xs mt-1.5 ml-8">
                    {errors.agree.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl py-3.5 font-semibold text-[#1a0b2e] bg-gradient-to-r from-violet-500 to-violet-300 hover:from-violet-400 hover:to-violet-200 transition-colors disabled:opacity-60"
              >
                {isSubmitting
                  ? "Creating account..."
                  : isSubmitSuccessful
                    ? "Account created!"
                    : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="h-px flex-1 bg-neutral-800" />
              <span className="text-[11px] tracking-widest text-neutral-500">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#131318] py-3 text-sm font-medium hover:bg-neutral-900 transition-colors"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#131318] py-3 text-sm font-medium hover:bg-neutral-900 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-violet-300" />
                SSO
              </button>
            </div>

            <p className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-violet-300 hover:text-violet-200 font-medium"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <span className="font-bold text-white">Synthetix AI</span>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:text-neutral-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-neutral-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-neutral-300">
            Security
          </a>
          <a href="#" className="hover:text-neutral-300">
            System Status
          </a>
        </div>
        <span>© 2024 Synthetix AI. Enterprise Intelligence Platforms.</span>
      </footer>
    </div>
  );
}

/** Custom-styled checkbox wired to react-hook-form's register(). */
function CheckboxVisual({ name, register }) {
  const {
    onChange,
    onBlur,
    name: fieldName,
    ref,
  } = register(name, {
    required: "You must agree to continue",
  });

  const [checked, setChecked] = React.useState(false);

  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        id={fieldName}
        name={fieldName}
        ref={ref}
        onBlur={onBlur}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange(e);
        }}
        className="sr-only"
      />
      <span
        onClick={() => document.getElementById(fieldName)?.click()}
        className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
          checked
            ? "bg-violet-500 border-violet-500"
            : "border-neutral-700 bg-[#131318]"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </span>
    </span>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.4 27 36 24 36c-5.2 0-9.6-3.4-11.2-8.1l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.6 5.4C41.5 36.1 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
