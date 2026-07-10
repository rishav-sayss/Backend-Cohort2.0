import axios from "axios";

export const getAllResumesApi = async (p0: string) => {
  const response = await axios.get("/api/resume");
  return response.data;
};

export const createResumeApi = async (payload: {
  title: string;
  jobTitle: string;
  experienceLevel: string;
}) => {
  const response = await axios.post("/api/resume/create", payload);
  return response.data;
};
 
export const generateProjectDescriptionApi = async (payload: {
  projectTitle: string;
  techStack: string[];
}) => {
  const response = await axios.post("/api/ai/generate-project-description", payload);
  return response.data;
};


export const deleteResumeApi = async (resumeId: string) => {
  const response = await axios.delete(`/api/resume/${resumeId}`);

  return response.data;
};