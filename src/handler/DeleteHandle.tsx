"use client";

import { TiDeleteOutline } from "react-icons/ti";
import { fetchTodos } from "@/app/api/fetch";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@/redux/store";

export const DeleteHandle = ({ idProps }: { idProps: number }) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const handleDelete = async (id: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-green-500 text-white p-2 mx-2 rounded-sm",
        cancelButton: "btn bg-red-500 text-white p-2 mx-2 rounded-sm",
      },
      // buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
      });

      dispatch(fetchTodos());
      swalWithBootstrapButtons.fire(
        "Deleted!",
        "Your Task has been deleted.",
        "success"
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        "Cancelled",
        "Your imaginary Task is safe :)",
        "error"
      );
    }
  };
  return (
    <TiDeleteOutline
      size={33}
      className="hover:scale-125"
      onClick={() => handleDelete(idProps)}
    />
  );
};
