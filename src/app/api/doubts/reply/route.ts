import { createResponse } from "@/actions/doubts";
import getCurrentUser from "@/actions/getCurrentUser";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { doubtId, description } = await request.json();

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    const doubt = await createResponse(doubtId, description);
    return NextResponse.json(doubt);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
