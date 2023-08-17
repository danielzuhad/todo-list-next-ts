"use client";

import Swal from "sweetalert2";

export const handleSubmit = async () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Task Created",
    showConfirmButton: false,
    timer: 1500,
  });
  //   Swal.fire({
  //     position: "center",
  //     icon: "error",
  //     title: "Task Created",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
};
