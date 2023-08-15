import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("todo/")[1];
  const todoId = parseInt(id);
  try {
    const todos = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todos) {
      return NextResponse.json({ message: "Id Tidak Ditemukan" });
    }

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const id = req.url.split("todo/")[1];
  const todoId = parseInt(id);
  const { title } = await req.json();

  try {
    const todos = await prisma.todo.update({
      where: { id: todoId },
      data: { title },
    });

    if (!todos) {
      return NextResponse.json({ message: "Id Tidak Ditemukan" });
    }

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = req.url.split("todo/")[1];
  const todoId = parseInt(id);

  try {
    const todos = await prisma.todo.delete({
      where: { id: todoId },
    });

    if (!todos) {
      return NextResponse.json({ message: "Id Tidak Ditemukan" });
    }

    return NextResponse.json({ message: "Id Terhapus" });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
