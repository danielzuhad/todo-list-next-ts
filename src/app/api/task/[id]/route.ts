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

export const POST = async (req: Request) => {
  const id = req.url.split("task/")[1];
  const todoId = parseInt(id);
  const { task } = await req.json();

  try {
    const newTask = await prisma.task.create({
      data: { task: task, todoId: todoId },
    });

    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = req.url.split("task/")[1];
  const taskId = parseInt(id);
  try {
    const deleteTask = await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task Terhapus" });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const id = req.url.split("task/")[1];
  const todoId = parseInt(id);
  const { task, isDone } = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: todoId },
      data: { task: task, isDone: isDone },
    });

    if (!updatedTask) {
      return NextResponse.json({ message: "Id Tidak Ditemukan" });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
