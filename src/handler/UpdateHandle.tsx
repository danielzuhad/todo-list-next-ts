"use client";
import { useDispatch } from "react-redux";
import { BsCheckSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { AppThunkDispatch } from "@/redux/store";
import { fetchTodos } from "@/app/api/fetch";

type UpdateHandleProps = {
  idProps: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setInputActive: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

export const UpdateHandle = ({
  idProps,
  setTitle,
  setInputActive,
  title,
}: UpdateHandleProps) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleUpdate = async (id: number) => {
    if (title === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Title is empty",
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      console.log("Response:", response);

      dispatch(fetchTodos());
      setTitle("");
      setInputActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BsCheckSquare
      size={22}
      className="hover:scale-125 ml-5"
      onClick={() => handleUpdate(idProps)}
    />
  );
};
