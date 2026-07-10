import { getcurrentuser } from "@/lib/getCurrentUser";
import { DB } from "@/lib/mongodb";
import ResumeModel from "@/models/resumemodel";
import {} from "@/types/ai.types";
import { ApiResponse } from "@/types/api.typs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await DB();

    // console.log(params);

    const user = await getcurrentuser();
    // console.log("userr in get resume", user);

    const { resumeId } = await params;
    // console.log("in get resume ", resumeId);

    const resume = await ResumeModel.findOne({
      _id: resumeId,
      //   user_id: user.userId,
    });


    if (!resume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 },
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in get resume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await DB();

    const user = await getcurrentuser();

    console.log("loggedin user", user);

    const body = await req.json();
    console.log("body-->", body);

    const { resumeId } = await params;

    console.log("resume id", resumeId);

    const updatedResume = await ResumeModel.findByIdAndUpdate(
      {
        _id: resumeId,
        user_id: user.userId,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedResume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "resume failed to update",
        },
        { status: 400 },
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: updatedResume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in updatedResume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  const { resumeId } = await params;

  await ResumeModel.findByIdAndDelete(resumeId);

  return NextResponse.json({
    success: true,
  });
}
