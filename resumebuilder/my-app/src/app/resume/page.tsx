"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  Trash2,
  Briefcase,
  Sparkles,
  ArrowRight,
  Loader2,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";
import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/Apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
  skills?: string[];
  workExperience?: unknown[];
  projects?: unknown[];
  education?: unknown[];
  summary?: string;
}

// Compute a simple ATS score from filled fields
function computeAtsScore(resume: Resume): number {
  let score = 40;
  if (resume.summary) score += 10;
  if ((resume.skills?.length ?? 0) >= 3) score += 15;
  if ((resume.workExperience?.length ?? 0) >= 1) score += 15;
  if ((resume.projects?.length ?? 0) >= 1) score += 10;
  if ((resume.education?.length ?? 0) >= 1) score += 10;
  return Math.min(score, 100);
}

// SVG circular progress ring
function AtsRing({ score }: { score: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color =
    score >= 80
      ? "#7c3aed"
      : score >= 60
      ? "#6366f1"
      : "#f59e0b";

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <span className="absolute text-xs font-bold text-slate-700">{score}%</span>
    </div>
  );
}

// Experience level badge color
function ExpBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Fresher: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Junior: "bg-sky-50 text-sky-700 border-sky-200",
    "Mid-Level": "bg-violet-50 text-violet-700 border-violet-200",
    Senior: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        map[level] ?? "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {level}
    </span>
  );
}

export default function ResumeDashboard() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Fresher",
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi("");
      setResumes(data.resumes || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.jobTitle.trim()) return;
    setCreating(true);
    try {
      const response = await createResumeApi(formData);
      const resumeId = response.data._id;
      router.push(`/resume/${resumeId}`);
    } catch (error) {
      console.error(error);
      setCreating(false);
    }
  };

  const handleDelete = async (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log( "handeldelete:-" ,resumeId)
    setDeletingId(resumeId);
    try {
      await deleteResumeApi(resumeId);
      await fetchResumes();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const closeModal = () => {
    if (creating) return;
    setShowModal(false);
    setFormData({ title: "", jobTitle: "", experienceLevel: "Fresher" });
  };

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      {/* ── Top Navigation Bar ─────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-[0_1px_3px_rgba(67,56,202,0.05)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">
              Resume<span className="text-violet-600">AI</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-violet-700 bg-violet-50 border border-violet-200">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </button>
          </nav>

          {/* Profile Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              U
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              My Resumes
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage, optimize, and build ATS-friendly resumes with AI.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-150 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create Resume
          </button>
        </div>

        {/* ── Loading Skeleton ─── */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 animate-pulse"
              >
                <div className="h-4 bg-slate-100 rounded w-2/3 mb-3" />
                <div className="h-3 bg-slate-100 rounded w-1/3 mb-6" />
                <div className="h-16 bg-slate-100 rounded-xl mb-4" />
                <div className="h-10 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* ── Empty State ─── */}
        {!loading && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              No resumes yet
            </h2>
            <p className="text-slate-500 mt-2 max-w-sm text-sm leading-relaxed">
              Start your journey by creating your first ATS-optimized resume
              powered by AI.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all duration-150"
            >
              <Plus className="w-4 h-4" />
              Create Your First Resume
            </button>
          </div>
        )}

        {/* ── Resume Grid ─── */}
        {!loading && resumes.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const ats = computeAtsScore(resume);
              return (
                <div
                  key={resume._id}
                  className="group bg-white rounded-2xl border border-slate-200/80 hover:border-violet-200 hover:shadow-[0_10px_30px_rgba(67,56,202,0.08)] transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Card Top Bar (gradient accent) */}
                  <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Top row: Title + ATS ring */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                          {resume.title}
                        </h2>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-1.5 text-sm">
                          <Briefcase className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{resume.jobTitle}</span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <AtsRing score={ats} />
                        <p className="text-[10px] text-center text-slate-400 mt-1 font-medium">
                          ATS Score
                        </p>
                      </div>
                    </div>

                    {/* Experience Badge */}
                    <div className="mb-5">
                      <ExpBadge level={resume.experienceLevel} />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100 mb-4 mt-auto" />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/resume/${resume._id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-150 shadow-sm"
                      >
                        Continue Building
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(resume._id, e)}
                        disabled={deletingId === resume._id}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 active:scale-[0.95] transition-all duration-150 disabled:opacity-50"
                      >
                        {deletingId === resume._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Create Resume Modal ────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_rgba(67,56,202,0.15)] border border-slate-200/80 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create Resume
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  Fill in the details to get started.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              {/* Resume Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Resume Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer Resume"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={creating}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  disabled={creating}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experienceLevel: e.target.value,
                    })
                  }
                  disabled={creating}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all text-sm text-slate-800 appearance-none cursor-pointer"
                >
                  <option>Fresher</option>
                  <option>Junior</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={closeModal}
                disabled={creating}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={
                  creating ||
                  !formData.title.trim() ||
                  !formData.jobTitle.trim()
                }
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}