"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  X,
} from "lucide-react";
import { generateExperienceApi } from "@/Apis/ai.apis";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8];
const CURRENT_STEP = 5;
const PROGRESS_PCT = Math.round((CURRENT_STEP / STEPS.length) * 100);

const EMPLOYMENT_TYPES = ["Full Time", "Part Time", "Internship", "Contract", "Freelance"];

export default function ExperienceStep({ resumeId, onNext, onBack }: Props) {
  const router = useRouter();

  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiItemIndex, setAiItemIndex] = useState<number | null>(null);
  const [modalJobRole, setModalJobRole] = useState("");
  const [modalExpLevel, setModalExpLevel] = useState("Mid-Level");
  const [modalYears, setModalYears] = useState(3);
  const [modalTechStack, setModalTechStack] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalError, setModalError] = useState("");

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      if (data.resume.experience?.length) {
        reset({
          experience: data.resume.experience,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open the AI Modal with prepopulated values
  const openAiModal = async (index: number) => {
    try {
      const exp = watch(`experience.${index}`);
      setAiItemIndex(index);
      setModalJobRole(exp.role || "");
      
      // Try to fetch experienceLevel from the resume object if it's set
      try {
        const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);
        const resume = resumeData.resume;
        if (resume.experienceLevel) {
          setModalExpLevel(resume.experienceLevel);
        }
      } catch (e) {
        console.log("Failed to load resume experienceLevel", e);
      }
      
      setModalYears(3); // default years
      setModalTechStack(""); // default blank stack
      setModalError("");
      setIsAiModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerate = async () => {
    if (aiItemIndex === null) return;
    if (!modalJobRole.trim()) {
      setModalError("Job Role is required");
      return;
    }
    if (!modalTechStack.trim()) {
      setModalError("Tech Stack is required");
      return;
    }

    try {
      setIsGenerating(true);
      setModalError("");
      
      const techStackArr = modalTechStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const response = await generateExperienceApi({
        jobRole: modalJobRole,
        experienceLevel: modalExpLevel,
        yearsOfExperience: Number(modalYears),
        techStack: techStackArr,
      });

      if (response.success && response.data?.workExperienceDescription) {
        setValue(`experience.${aiItemIndex}.description`, response.data.workExperienceDescription);
        setIsAiModalOpen(false);
      } else {
        setModalError(response.message || "Failed to generate description");
      }
    } catch (error: any) {
      console.log(error);
      setModalError(error?.response?.data?.message || "Something went wrong during generation");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        experience: values.experience,
      });
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .exp-input:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .exp-input::placeholder { color: #a1aab8; }
        .exp-textarea:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .exp-textarea::placeholder { color: #a1aab8; }
        .step-dot-active { background: linear-gradient(135deg,#7c3aed,#4f46e5); color:#fff; box-shadow:0 0 0 3px rgba(124,58,237,0.2); }
        .step-dot-done { background:#ede9fe; color:#7c3aed; }
        .step-dot-todo { background:#f1f5f9; color:#94a3b8; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .anim-fade-up { animation: fadeUp 0.45s ease both; }
        .btn-primary { background: linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%); transition: filter 0.2s, transform 0.15s; }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .entry-card { border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 24px; position: relative; background: #fafbff; }
        .entry-card:hover { border-color: #c4b5fd; transition: border-color 0.2s; }
        .ai-btn { background: linear-gradient(135deg,#f5f3ff,#ede9fe); border: 1.5px solid #c4b5fd; color: #7c3aed; transition: all 0.2s; }
        .ai-btn:hover { background: #ede9fe; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ background: "#f4f3ff" }}>
        
        {/* Sticky Progress */}
        <div 
          className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b"
          style={{ borderColor: "#e2e8f0", boxShadow: "0 1px 8px rgba(124,58,237,0.07)" }}
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
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
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full" style={{ background: "#e2e8f0" }}>
                <div 
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${PROGRESS_PCT}%`, background: "linear-gradient(90deg,#7c3aed,#4f46e5)" }} 
                />
              </div>
              <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#7c3aed" }}>
                Step {CURRENT_STEP} of {STEPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-start justify-center py-10 px-4">
          <div 
            className="w-full max-w-5xl rounded-3xl overflow-hidden flex anim-fade-up"
            style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.13)", minHeight: 620 }}
          >
            {/* Left Decorative Panel */}
            <div 
              className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden"
              style={{ width: "38%", background: "linear-gradient(145deg,#7c3aed 0%,#4f46e5 55%,#3730a3 100%)" }}
            >
              <div className="absolute" style={{ width: 260, height: 260, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.12)", top: -60, right: -80 }} />
              <div className="absolute" style={{ width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: 60, left: -50 }} />
              <div className="absolute" style={{ width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", bottom: 20, right: 20 }} />

              <div className="relative z-10">
                <div 
                  className="flex items-center justify-center mb-8"
                  style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)" }}
                >
                  <Briefcase size={38} color="rgba(255,255,255,0.9)" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>Work Experience</h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)", lineHeight: "1.6" }}>
                  Highlight your professional journey and impact at each role. Make it count!
                </p>
                <div className="mt-8 mb-6" style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
                {[
                  "List your most recent role first",
                  "Use AI to craft compelling descriptions",
                  "Quantify achievements where possible",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.22)" }}>
                      <CheckCircle2 size={10} color="white" />
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.5" }}>{tip}</p>
                  </div>
                ))}
              </div>

              <div 
                className="relative z-10 mt-auto rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                <p className="text-xs font-semibold text-white mb-0.5">Step 5 of {STEPS.length}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>Experience section makes your resume stand out.</p>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <div className="h-full rounded-full" style={{ width: `${PROGRESS_PCT}%`, background: "rgba(255,255,255,0.85)" }} />
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 bg-white p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <div 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  <Briefcase size={11} /> Work Experience
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: "#0f172a", letterSpacing: "-0.025em" }}>
                      Professional History
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>Add your work experience — most recent first.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => append({ company: "", role: "", employmentType: "", startDate: "", endDate: "", currentlyWorking: false, description: "" })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "#ede9fe", color: "#7c3aed", border: "1.5px solid #c4b5fd" }}
                  >
                    <Plus size={15} /> Add Role
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-5">
                <div className="flex flex-col gap-5 overflow-y-auto pr-1" style={{ maxHeight: 440 }}>
                  {fields.map((field, index) => (
                    <div key={field.id} className="entry-card">
                      {fields.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => remove(index)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg"
                          style={{ color: "#ef4444", background: "#fff5f5" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: "#7c3aed", color: "white" }}
                        >
                          {index + 1}
                        </div>
                        <span className="text-xs font-semibold" style={{ color: "#7c3aed" }}>Role #{index + 1}</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        {/* Company Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Company Name</label>
                          <input 
                            {...register(`experience.${index}.company`)}
                            placeholder="e.g. Google"
                            className="exp-input w-full rounded-xl py-2.5 px-3.5 text-sm transition-all"
                            style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }}
                          />
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Job Role / Position</label>
                          <input 
                            {...register(`experience.${index}.role`)}
                            placeholder="e.g. Software Engineer"
                            className="exp-input w-full rounded-xl py-2.5 px-3.5 text-sm transition-all"
                            style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }}
                          />
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Employment Type</label>
                          <select 
                            {...register(`experience.${index}.employmentType`)}
                            className="exp-input w-full rounded-xl py-2.5 px-3.5 text-sm transition-all appearance-none"
                            style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }}
                          >
                            <option value="">Select type</option>
                            {EMPLOYMENT_TYPES.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>

                        {/* Start Date */}
                        <div className="relative flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">Start Date</label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <Calendar size={14} />
                            </div>
                            <input 
                              type="date" 
                              {...register(`experience.${index}.startDate`)}
                              className="exp-input w-full rounded-xl py-2.5 pl-9 pr-3.5 text-sm"
                              style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} 
                            />
                          </div>
                        </div>

                        {/* End Date */}
                        <div className="relative flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">End Date</label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <Calendar size={14} />
                            </div>
                            <input 
                              type="date" 
                              {...register(`experience.${index}.endDate`)}
                              disabled={watch(`experience.${index}.currentlyWorking`)}
                              className="exp-input w-full rounded-xl py-2.5 pl-9 pr-3.5 text-sm disabled:opacity-50"
                              style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} 
                            />
                          </div>
                        </div>

                        {/* Currently Working Checkbox */}
                        <div className="flex flex-col gap-1.5 justify-end">
                          <label 
                            className="flex items-center gap-2.5 cursor-pointer py-2.5 px-3.5 rounded-xl border"
                            style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
                          >
                            <input 
                              type="checkbox" 
                              {...register(`experience.${index}.currentlyWorking`)}
                              className="w-4 h-4 accent-violet-600" 
                            />
                            <span className="text-sm text-slate-700">Currently Working Here</span>
                          </label>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-slate-700">Description</label>
                          <button 
                            type="button" 
                            onClick={() => openAiModal(index)}
                            className="ai-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                          >
                            <Sparkles size={12} /> Generate with AI
                          </button>
                        </div>
                        <textarea 
                          rows={4} 
                          {...register(`experience.${index}.description`)}
                          placeholder="Describe your responsibilities and achievements..."
                          className="exp-textarea w-full rounded-xl p-3.5 text-sm resize-none transition-all"
                          style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1" />
                <div style={{ height: 1, background: "#f1f5f9" }} />

                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={onBack}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all border"
                    style={{ color: "#475569", background: "white" }}
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Save &amp; Continue <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* AI Generation Modal */}
        {isAiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div 
              className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              style={{ 
                border: "1px solid rgba(124,58,237,0.15)",
                animation: "fadeUp 0.3s ease-out"
              }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div 
                    className="flex items-center justify-center rounded-xl"
                    style={{ width: 36, height: 36, background: "#f5f3ff", color: "#7c3aed" }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Generate with AI</h3>
                    <p className="text-xs text-slate-500">Provide details to craft your work experience description</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setIsAiModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                {modalError && (
                  <div className="p-3.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-200 animate-fade-in">
                    {modalError}
                  </div>
                )}

                {/* Job Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 text-left">Job Role</label>
                  <input 
                    type="text" 
                    value={modalJobRole}
                    onChange={(e) => setModalJobRole(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="border rounded-xl p-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200 transition-all"
                  />
                </div>

                {/* Experience Level */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 text-left">Experience Level</label>
                  <select 
                    value={modalExpLevel}
                    onChange={(e) => setModalExpLevel(e.target.value)}
                    className="border rounded-xl p-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200 transition-all bg-white"
                  >
                    <option value="Fresher">Fresher (0-1 years)</option>
                    <option value="Junior">Junior (1-3 years)</option>
                    <option value="Mid-Level">Mid-Level (3-6 years)</option>
                    <option value="Senior">Senior (6+ years)</option>
                  </select>
                </div>

                {/* Years of Experience */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 text-left">Years of Experience</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="40"
                    value={modalYears}
                    onChange={(e) => setModalYears(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="e.g. 3"
                    className="border rounded-xl p-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200 transition-all"
                  />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 text-left">Tech Stack (comma-separated)</label>
                  <input 
                    type="text" 
                    value={modalTechStack}
                    onChange={(e) => setModalTechStack(e.target.value)}
                    placeholder="e.g. React, TypeScript, Tailwind CSS, Next.js"
                    className="border rounded-xl p-3 text-sm focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200 transition-all"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border bg-white hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-60 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Generate Description
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}