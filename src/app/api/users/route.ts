import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const body: {
    first_name: string;
    last_name: string;
    username: string;
    gender: string;
    avatar_url: string;
  } = await request.json();
  const { first_name, last_name, username, gender, avatar_url } = body;

  return NextResponse.json({
    data: { first_name, last_name, username, gender, avatar_url },
  });
}
