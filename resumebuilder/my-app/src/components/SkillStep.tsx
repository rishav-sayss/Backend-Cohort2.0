"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle2,
  Zap,
  Plus,
} from "lucide-react";
import { getAllResumesApi } from "@/Apis/resume.api";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8];
const CURRENT_STEP = 3;
const PROGRESS_PCT = Math.round((CURRENT_STEP / STEPS.length) * 100);

export default function SkillsStep({ resumeId, onNext, onBack }: Props) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => { fetchResume(); }, []);

  const fetchResume = async () => {
    try {
      const data = await getAllResumesApi(`/api/resume/${resumeId}/`)
      setSkills(data.resume.skills || []);
    } catch (error) { console.log(error); }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); addSkill(); }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const generateSkills = async () => {
    try {
      setAiLoading(true);
       const resumeData = await getAllResumesApi(`/api/resume/${resumeId}/`)
      //  console.log(resumeData)
      const resume = resumeData.resumes;
     
      const { data } = await axios.post("/api/ai/generate-skills", {
        jobTitle: resume.jobTitle || "web developer",
        experienceLevel: resume.experienceLevel || "mid-level",
      });
      setSkills(data.data.skills);
    } catch (error) { console.log(error); }
    finally { setAiLoading(false); }
  };

  const saveSkills = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/resume/${resumeId}`, { skills });
      onNext();
    } catch (error) { console.log(error); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .skill-input:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .skill-input::placeholder { color: #a1aab8; }
        .step-dot-active { background: linear-gradient(135deg,#7c3aed,#4f46e5); color:#fff; box-shadow:0 0 0 3px rgba(124,58,237,0.2); }
        .step-dot-done { background:#ede9fe; color:#7c3aed; }
        .step-dot-todo { background:#f1f5f9; color:#94a3b8; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes popIn { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
        .anim-fade-up { animation: fadeUp 0.45s ease both; }
        .skill-chip { animation: popIn 0.2s ease both; }
        .btn-primary { background: linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%); transition: filter 0.2s, transform 0.15s; }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.98); }
        .ai-btn { background: linear-gradient(135deg,#f5f3ff,#ede9fe); border: 1.5px solid #c4b5fd; color: #7c3aed; transition: all 0.2s; }
        .ai-btn:hover { background: #ede9fe; }
        .add-btn { background: linear-gradient(135deg,#7c3aed,#4f46e5); transition: filter 0.2s; }
        .add-btn:hover { filter: brightness(1.1); }
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
            style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.13)", minHeight: 560 }}>

            {/* Left Panel */}
            <div className="relative hidden md:flex flex-col justify-between p-10 overflow-hidden"
              style={{ width: "34%", background: "linear-gradient(145deg,#7c3aed 0%,#4f46e5 55%,#3730a3 100%)" }}>
              <div className="absolute" style={{ width: 240, height: 240, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.12)", top: -60, right: -70 }} />
              <div className="absolute" style={{ width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: 70, left: -50 }} />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8"
                  style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)" }}>
                  <Zap size={34} color="rgba(255,255,255,0.9)" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>Skills</h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.72)", lineHeight: "1.6" }}>
                  Skills are the most-scanned section by ATS systems. Choose wisely!
                </p>
                <div className="mt-6 mb-5" style={{ height: 1, background: "rgba(255,255,255,0.15)" }} />
                {[
                  "Add 8–15 relevant technical skills",
                  "Use AI to generate role-specific skills",
                  "Mix hard & soft skills for balance",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center w-4 h-4 rounded-full"
                      style={{ background: "rgba(255,255,255,0.22)" }}>
                      <CheckCircle2 size={10} color="white" />
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.5" }}>{tip}</p>
                  </div>
                ))}

                {/* Skills count */}
                <div className="mt-6 py-3 px-4 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="text-3xl font-extrabold text-white">{skills.length}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>skills added</p>
                </div>
              </div>

              <div className="relative z-10 mt-auto rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <p className="text-xs font-semibold text-white mb-0.5">Step 3 of 8</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>Skills boost your ATS score significantly.</p>
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
                  <Zap size={11} /> Skills
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold" style={{ color: "#0f172a", letterSpacing: "-0.025em" }}>
                      Your Skill Set
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                      Type a skill and press Enter or &quot;Add&quot;, or let AI generate them.
                    </p>
                  </div>
                  <button onClick={generateSkills} disabled={aiLoading}
                    className="ai-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60">
                    {aiLoading
                      ? <><span className="w-3.5 h-3.5 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />Generating...</>
                      : <><Sparkles size={13} /> AI Generate</>}
                  </button>
                </div>
              </div>

              {/* Input row */}
              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94a3b8" }}>
                    <Plus size={16} />
                  </div>
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. React, TypeScript, Node.js..."
                    className="skill-input w-full rounded-xl py-3 pl-10 pr-4 text-sm transition-all"
                    style={{ border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a" }}
                  />
                </div>
                <button onClick={addSkill} type="button"
                  className="add-btn px-5 py-3 rounded-xl text-white text-sm font-semibold">
                  Add
                </button>
              </div>

              {/* Skills Area */}
              <div className="flex-1 rounded-2xl p-5 min-h-48"
                style={{ background: "#fafbff", border: "1.5px dashed #c4b5fd" }}>
                {skills.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-2" style={{ color: "#a78bfa" }}>
                    <Sparkles size={28} style={{ opacity: 0.5 }} />
                    <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>
                      No skills yet — add manually or use AI Generate
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill) => (
                      <div key={skill} className="skill-chip flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold"
                        style={{ background: "#ede9fe", color: "#6d28d9", border: "1.5px solid #c4b5fd" }}>
                        {skill}
                        <button onClick={() => removeSkill(skill)}
                          className="hover:text-red-500 transition-colors ml-0.5">
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {skills.length > 0 && (
                <p className="text-xs mt-2" style={{ color: "#94a3b8" }}>
                  {skills.length} skill{skills.length !== 1 ? "s" : ""} added
                  {skills.length < 8 && <span style={{ color: "#f59e0b" }}> — aim for at least 8</span>}
                  {skills.length >= 8 && <span style={{ color: "#10b981" }}> — great coverage! ✓</span>}
                </p>
              )}

              {/* Footer */}
              <div style={{ height: 1, background: "#f1f5f9", marginTop: 16, marginBottom: 16 }} />
              <div className="flex items-center gap-3">
                <button onClick={onBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ border: "1.5px solid #e2e8f0", color: "#475569", background: "white" }}>
                  <ArrowLeft size={15} /> Back
                </button>
                <button onClick={saveSkills} disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-60">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                    : <>Save &amp; Continue <ArrowRight size={15} /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}