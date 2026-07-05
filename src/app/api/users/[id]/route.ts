import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log("削除されたID:", id);

  // 実務ではここで DB から削除する
  return NextResponse.json({ message: "deleted" });
}
