"use client";

import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  Link2,
  GitBranch,
  CheckCircle2,
} from "lucide-react";

interface Props {
  resumeId: string | null;
  onNext: () => void;
}

interface PersonalInfoForm {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8];
const CURRENT_STEP = 1;
const PROGRESS_PCT = Math.round((CURRENT_STEP / STEPS.length) * 100);

export default function PersonalInfoStep({ resumeId, onNext }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PersonalInfoForm>();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      reset(data.resume.personalInfo || {});
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: PersonalInfoForm) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        personalInfo: values,
      });
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .input-field:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .input-field::placeholder { color: #a1aab8; }
        .step-dot-active { background: linear-gradient(135deg,#7c3aed,#4f46e5); color:#fff; box-shadow:0 0 0 3px rgba(124,58,237,0.2); }
        .step-dot-done { background:#ede9fe; color:#7c3aed; }
        .step-dot-todo { background:#f1f5f9; color:#94a3b8; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .anim-fade-up { animation: fadeUp 0.45s ease both; }
        .btn-primary { background: linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%); transition: filter 0.2s, transform 0.15s; }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.98); }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ background: "#f4f3ff" }}>

        {/* ── Sticky Progress Bar ───────────────────────── */}
        <div
          className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b"
          style={{ borderColor: "#e2e8f0", boxShadow: "0 1px 8px rgba(124,58,237,0.07)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
            {/* Step dots */}
            <div className="flex items-center gap-2">
              {STEPS.map((s) => (
                <div
                  key={s}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all
                    ${s < CURRENT_STEP ? "step-dot-done" : s === CURRENT_STEP ? "step-dot-active" : "step-dot-todo"}`}
                >
                  {s < CURRENT_STEP ? <CheckCircle2 size={13} /> : s}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full" style={{ background: "#e2e8f0" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${PROGRESS_PCT}%`,
                    background: "linear-gradient(90deg,#7c3aed,#4f46e5)",
                  }}
                />
              </div>
              <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#7c3aed" }}>
                Step {CURRENT_STEP} of {STEPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Content ──────────────────────────────── */}
        <div className="flex-1 flex items-start justify-center py-10 px-4">
          <div
            className="w-full max-w-5xl rounded-3xl overflow-hidden flex anim-fade-up"
            style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.13)", minHeight: 620 }}
          >
            {/* ── Left Decorative Panel ─── */}
            <div
              className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden"
              style={{
                width: "38%",
                background: "linear-gradient(145deg,#7c3aed 0%,#4f46e5 55%,#3730a3 100%)",
              }}
            >
              {/* Decorative circles */}
              <div
                className="absolute"
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  top: -60,
                  right: -80,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  bottom: 60,
                  left: -50,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  bottom: 20,
                  right: 20,
                }}
              />

              {/* Top content */}
              <div className="relative z-10">
                {/* Avatar */}
                <div
                  className="flex items-center justify-center mb-8"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <User size={38} color="rgba(255,255,255,0.9)" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                  Personal Information
                </h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)", lineHeight: "1.6" }}>
                  Tell recruiters who you are and how they can reach you. Make a great first impression!
                </p>

                {/* Divider */}
                <div className="mt-8 mb-6" style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />

                {/* Tips */}
                {[
                  "Use a professional email address",
                  "Add your LinkedIn for credibility",
                  "Include a portfolio to stand out",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <div
                      className="mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full"
                      style={{ background: "rgba(255,255,255,0.22)" }}
                    >
                      <CheckCircle2 size={10} color="white" />
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.5" }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom badge */}
              <div
                className="relative z-10 mt-auto rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                <p className="text-xs font-semibold text-white mb-0.5">Step 1 of 8</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Just getting started — you&apos;re on the right track!
                </p>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${PROGRESS_PCT}%`, background: "rgba(255,255,255,0.85)" }}
                  />
                </div>
              </div>
            </div>

            {/* ── Right Form Panel ─── */}
            <div className="flex-1 bg-white p-8 md:p-10 flex flex-col">
              {/* Heading */}
              <div className="mb-8">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  <User size={11} /> Personal Info
                </div>
                <h1
                  className="text-2xl font-extrabold"
                  style={{ color: "#0f172a", letterSpacing: "-0.025em" }}
                >
                  Let&apos;s start with the basics
                </h1>
                <p className="text-sm mt-1.5" style={{ color: "#64748b" }}>
                  Fill in your contact details. Fields marked <span style={{ color: "#7c3aed" }}>*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-5">
                {/* Row 1 – Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="fullName"
                    label="Full Name"
                    required
                    icon={<User size={16} />}
                    placeholder="John Doe"
                    register={register("fullName", { required: "Full name is required" })}
                    error={errors.fullName?.message}
                  />
                  <InputField
                    id="email"
                    label="Email Address"
                    required
                    icon={<Mail size={16} />}
                    placeholder="john@example.com"
                    register={register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                    type="email"
                  />
                </div>

                {/* Row 2 – Phone + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="phone"
                    label="Phone Number"
                    icon={<Phone size={16} />}
                    placeholder="+91 98765 43210"
                    register={register("phone")}
                  />
                  <InputField
                    id="location"
                    label="Location"
                    icon={<MapPin size={16} />}
                    placeholder="Bhopal, India"
                    register={register("location")}
                  />
                </div>

                {/* Row 3 – LinkedIn + GitHub */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="linkedin"
                    label="LinkedIn"
                    icon={<Link2 size={16} />}
                    placeholder="linkedin.com/in/johndoe"
                    register={register("linkedin")}
                    type="url"
                  />
                  <InputField
                    id="github"
                    label="GitHub"
                    icon={<GitBranch size={16} />}
                    placeholder="github.com/johndoe"
                    register={register("github")}
                    type="url"
                  />
                </div>

                {/* Row 4 – Portfolio (full width) */}
                <InputField
                  id="portfolio"
                  label="Portfolio Website"
                  icon={<Globe size={16} />}
                  placeholder="https://johndoe.dev"
                  register={register("portfolio")}
                  type="url"
                />

                {/* Spacer */}
                <div className="flex-1" />

                {/* Divider */}
                <div style={{ height: 1, background: "#f1f5f9" }} />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Save &amp; Continue
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs" style={{ color: "#94a3b8" }}>
                  Your data is saved automatically and securely.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── InputField Sub-Component ──────────────────────────────── */
interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  register: object;
  error?: string;
  type?: string;
  required?: boolean;
}

function InputField({
  id,
  label,
  placeholder,
  icon,
  register,
  error,
  type = "text",
  required = false,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold"
        style={{ color: "#374151" }}
      >
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: "#7c3aed" }}>
            *
          </span>
        )}
      </label>

      <div className="relative">
        {/* Icon */}
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: error ? "#ef4444" : "#94a3b8" }}
        >
          {icon}
        </div>

        <input
          id={id}
          type={type}
          {...(register as object)}
          placeholder={placeholder}
          className="input-field w-full rounded-xl py-3 pl-10 pr-4 text-sm transition-all"
          style={{
            border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
            background: error ? "#fff5f5" : "#f8fafc",
            color: "#0f172a",
          }}
        />
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}