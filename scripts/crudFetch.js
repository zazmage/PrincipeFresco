import RestFetch from "../helpers/RestFetch.js";
import { eraseContent } from "../helpers/auxFunctions.js";
const d = document;
d.addEventListener("submit", async (e) => {
  if (e.target.matches("#main-form")) {
    e.preventDefault();
    // POST
    if (!e.target.id.value) {
      if (
        e.target.nombre.value &&
        e.target.precio.value &&
        e.target.imagen.value &&
        e.target.textDescrpcion.value
      ) {
        RestFetch.postData("http://localhost:4000/dataRopa", {
          Nombre: e.target.nombre.value,
          Precio: e.target.precio.value,
          Imagen: e.target.imagen.value,
          Decripcion: e.target.textDescrpcion.value,
        });
      } else {
        alert("Faltan datos");
      }
    }
  }
});
