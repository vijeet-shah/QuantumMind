import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: params.courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("Already purchased course", { status: 401 });
    }

    const newPurchase = await db.purchase.create({
      data: {
        userId,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(newPurchase);
  } catch (error) {
    console.log("[COURSE_CHECKOUT]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
