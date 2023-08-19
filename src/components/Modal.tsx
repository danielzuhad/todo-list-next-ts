"use client";
import { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TaskType } from "@/app/types";
import { FunctionComponent } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const modalVariants = cva(
  " w-[100vw] h-[100vh] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(49,49,49,0.8)] flex justify-center items-center",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ModalProps
  extends TaskType,
    VariantProps<typeof modalVariants> {
  className?: string;
  title: string;
}

const Modal: FunctionComponent<ModalProps> = ({ title, variant, ...props }) => {
  const [done, setDone] = useState(props.isDone);

  return (
    <div className={cn(modalVariants({ variant }))}>
      <div className="rounded-md duration-300 inline-flex h-[80vh] md:w-[70vw] sm:w-[80vw] lg:w-[50vw] bg-white p-3 flex-col  items-center">
        <div className="flex w-[90%] items-center justify-between my-5">
          {/* <h2>{title}</h2> */}
          <h2 className="text-[2em] font-bold">Berangkat</h2>
          <TiDeleteOutline size={50} />
        </div>
        <div className="flex items-center justify-between w-[50%]">
          {/* <h3>{props.task}</h3> */}
          <h3 className="font-semibold">Makan</h3>
          <AiOutlineCheckSquare size={50} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
