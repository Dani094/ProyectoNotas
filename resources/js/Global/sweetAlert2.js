import Swal from "sweetalert2";


export const sweetPositive = (message) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: message, 
        showConfirmButton: false,
        timer: 1500
      });
};

export const sweetDelete = (id, onDelete) => {
    Swal.fire({
      title: `¿Seguro que quieres eliminar la Nota ${id}?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire({
          title: "Eliminada!",
          text: "La nota se ha eliminado.",
          icon: "success",
          timer: 2000
        });
      }
    });
  };