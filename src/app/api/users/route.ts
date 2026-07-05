import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 実務ではここでDBやAPIを叩いてユーザーを作成する処理を行う
  const body = await req.json();

  console.log("新規ユーザー:", body);

  return NextResponse.json({ message: "OK" });
}
