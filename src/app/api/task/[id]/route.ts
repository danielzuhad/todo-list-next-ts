import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("task/")[1];
  const todoId = parseInt(id);
  try {
    const tasks = await prisma.task.findMany({
      where: { todoId: todoId },
    });

    if (!tasks) {
      return NextResponse.json({ message: "Id Tidak Ditemukan" });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
