import { NextResponse , NextRequest} from "next/server";
import ResumeModel from "@/models/resumemodel";
import { DB } from "@/lib/mongodb";
import { getcurrentuser } from "@/lib/getCurrentUser";
import { ApiResponse } from "@/types/api.typs";

export async function GET() {
  try {
    await DB();

    const resumes = await ResumeModel.find();

    return NextResponse.json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching resumes",
      },
      { status: 500 },
    );
  }
}

 

 
