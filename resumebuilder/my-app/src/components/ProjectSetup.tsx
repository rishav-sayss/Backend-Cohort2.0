"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FolderKanban,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import { generateProjectDescriptionApi, getAllResumesApi } from "@/Apis/resume.api";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface Project {
  title: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

interface FormValues {
  projects: Project[];
}

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8];
const CURRENT_STEP = 4;
const PROGRESS_PCT = Math.round((CURRENT_STEP / STEPS.length) * 100);

export default function ProjectsStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projects: [{ title: "", techStack: "", description: "", githubUrl: "", liveUrl: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  useEffect(() => { fetchResume(); }, []);

  const fetchResume = async () => {
    try {
       const data = await getAllResumesApi("")
      if (data.resume.projects?.length) {
        reset({
          projects: data.resume.projects.map((project: Project & { techStack: string | string[] }) => ({
            ...project,
            techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
          })),
        });
      }
    } catch (error) { console.log(error); }
  };

 const generateDescription = async (index: number) => {
  try {
const project = watch(`projects.${index}`);

const aiResponse = await generateProjectDescriptionApi({
  projectTitle: project.title,
  techStack: project.techStack
    .split(",")
    .map((tech: string) => tech.trim())
    .filter(Boolean),
});

setValue(
  `projects.${index}.description`,
  aiResponse.data.projectDescription
);
  } catch (error) {
    console.log(error);
  }
};

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedProjects = values.projects.map((p) => ({
        ...p,
        techStack: p.techStack.split(",").map((t) => t.trim()),
      }));
      await axios.patch(`/api/resume/${resumeId}`, { projects: formattedProjects });
      onNext();
    } catch (error) { console.log(error); }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .proj-input:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .proj-input::placeholder { color: #a1aab8; }
        .proj-textarea:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .proj-textarea::placeholder { color: #a1aab8; }
        .step-dot-active { background: linear-gradient(135deg,#7c3aed,#4f46e5); color:#fff; box-shadow:0 0 0 3px rgba(124,58,237,0.2); }
        .step-dot-done { background:#ede9fe; color:#7c3aed; }
        .step-dot-todo { background:#f1f5f9; color:#94a3b8; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .anim-fade-up { animation: fadeUp 0.45s ease both; }
        .btn-primary { background: linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%); transition: filter 0.2s, transform 0.15s; }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .entry-card { border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 24px; position: relative; background: #fafbff; transition: border-color 0.2s; }
        .entry-card:hover { border-color: #c4b5fd; }
        .ai-btn { background: linear-gradient(135deg,#f5f3ff,#ede9fe); border: 1.5px solid #c4b5fd; color: #7c3aed; transition: all 0.2s; }
        .ai-btn:hover { background: #ede9fe; }
      `}</style>

      <div className="min-h-screen flex flex-col" style={{ background: "#f4f3ff" }}>

        {/* Sticky Progress */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b"
          style={{ borderColor: "#e2e8f0", boxShadow: "0 1px 8px rgba(124,58,237,0.07)" }}>
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
            <div className="flex items-center gap-2">
              {STEPS.map((s) => (
                <div key={s} className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all
                  ${s < CURRENT_STEP ? "step-dot-done" : s === CURRENT_STEP ? "step-dot-active" : "step-dot-todo"}`}>
                  {s < CURRENT_STEP ? <CheckCircle2 size={13} /> : s}
                </div>
              ))}
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full" style={{ background: "#e2e8f0" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${PROGRESS_PCT}%`, background: "linear-gradient(90deg,#7c3aed,#4f46e5)" }} />
              </div>
              <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#7c3aed" }}>
                Step {CURRENT_STEP} of {STEPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex items-start justify-center py-10 px-4">
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden flex anim-fade-up"
            style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.13)", minHeight: 600 }}>

            {/* Left Panel */}
            <div className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden"
              style={{ width: "34%", background: "linear-gradient(145deg,#7c3aed 0%,#4f46e5 55%,#3730a3 100%)" }}>
              <div className="absolute" style={{ width: 240, height: 240, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.12)", top: -60, right: -70 }} />
              <div className="absolute" style={{ width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: 70, left: -50 }} />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8"
                  style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)" }}>
                  <FolderKanban size={34} color="rgba(255,255,255,0.9)" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>Projects</h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)", lineHeight: "1.6" }}>
                  Showcase your best work. Projects demonstrate real-world impact.
                </p>
                <div className="mt-6 mb-5" style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
                {[
                  "Highlight 2–4 of your best projects",
                  "Include tech stack for ATS keywords",
                  "Add live & GitHub links for visibility",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full"
                      style={{ background: "rgba(255,255,255,0.22)" }}>
                      <CheckCircle2 size={10} color="white" />
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.5" }}>{tip}</p>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-auto rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <p className="text-xs font-semibold text-white mb-0.5">Step 4 of 8 — Halfway there!</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>Projects set you apart from the competition.</p>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <div className="h-full rounded-full" style={{ width: `${PROGRESS_PCT}%`, background: "rgba(255,255,255,0.85)" }} />
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 bg-white p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}>
                  <FolderKanban size={11} /> Projects
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: "#0f172a", letterSpacing: "-0.025em" }}>
                      Your Best Work
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>Add projects that showcase your skills.</p>
                  </div>
                  <button type="button"
                    onClick={() => append({ title: "", techStack: "", description: "", githubUrl: "", liveUrl: "" })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "#ede9fe", color: "#7c3aed", border: "1.5px solid #c4b5fd" }}>
                    <Plus size={15} /> Add Project
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-5">
                <div className="flex flex-col gap-5 overflow-y-auto pr-1" style={{ maxHeight: 440 }}>
                  {fields.map((field, index) => (
                    <div key={field.id} className="entry-card">
                      {fields.length > 1 && (
                        <button type="button" onClick={() => remove(index)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg"
                          style={{ color: "#ef4444", background: "#fff5f5" }}>
                          <Trash2 size={14} />
                        </button>
                      )}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: "#7c3aed", color: "white" }}>{index + 1}</div>
                        <span className="text-xs font-semibold" style={{ color: "#7c3aed" }}>Project #{index + 1}</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <ProjInput label="Project Title" placeholder="e.g. ResumeAI Builder"
                          register={register(`projects.${index}.title`)} />
                        <ProjInput label="Tech Stack (comma-separated)" placeholder="React, Node.js, MongoDB"
                          register={register(`projects.${index}.techStack`)} />
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold" style={{ color: "#374151" }}>GitHub URL</label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94a3b8" }}><GitBranch size={14} /></div>
                            <input {...register(`projects.${index}.githubUrl`)} placeholder="github.com/you/project" type="url"
                              className="proj-input w-full rounded-xl py-2.5 pl-9 pr-3.5 text-sm"
                              style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold" style={{ color: "#374151" }}>Live URL</label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94a3b8" }}><ExternalLink size={14} /></div>
                            <input {...register(`projects.${index}.liveUrl`)} placeholder="https://yourproject.com" type="url"
                              className="proj-input w-full rounded-xl py-2.5 pl-9 pr-3.5 text-sm"
                              style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold" style={{ color: "#374151" }}>Description</label>
                          <button type="button" onClick={() => generateDescription(index)}
                            className="ai-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold">
                            <Sparkles size={12} /> Generate with AI
                          </button>
                        </div>
                        <textarea rows={4} {...register(`projects.${index}.description`)}
                          placeholder="Describe what the project does, your role, and impact..."
                          className="proj-textarea w-full rounded-xl p-3.5 text-sm resize-none transition-all"
                          style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1" />
                <div style={{ height: 1, background: "#f1f5f9" }} />

                <div className="flex items-center gap-3">
                  <button type="button" onClick={onBack}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ border: "1.5px solid #e2e8f0", color: "#475569", background: "white" }}>
                    <ArrowLeft size={15} /> Back
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-60">
                    {isSubmitting
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                      : <>Save &amp; Continue <ArrowRight size={15} /></>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProjInput({ label, placeholder, register }: { label: string; placeholder: string; register: object }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: "#374151" }}>{label}</label>
      <input {...(register as object)} placeholder={placeholder}
        className="proj-input w-full rounded-xl py-2.5 px-3.5 text-sm transition-all"
        style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }} />
    </div>
  );
}