import { getcurrentuser } from "@/lib/getCurrentUser";
import { DB } from "@/lib/mongodb";
import ResumeModel from "@/models/resumemodel";
import { ApiResponse } from "@/types/api.typs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DB();

    const userId = await getcurrentuser();

    const newResume = await ResumeModel.create({
      user_id: userId,
      title: "",
      summary: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      education: [],
      certifications: [],
      skills: [],
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume created successfully",
        data: newResume,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in create resume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
