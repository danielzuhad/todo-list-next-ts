// taskHandler.ts
import Swal from "sweetalert2";

export const handleSubmit = async (title: string) => {
  try {
    if (title !== "") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task Created",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Title is empty",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
