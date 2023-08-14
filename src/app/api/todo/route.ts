import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  const { title } = await req.json();
  try {
    const todos = await prisma.todo.create({
      data: { title },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
