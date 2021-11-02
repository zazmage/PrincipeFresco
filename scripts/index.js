import RestFetch from "../helpers/RestFetch.js";
import { eraseContent } from "../helpers/auxFunctions.js";

const d = document;

const drawCardTemp = (data) => {
  const $template = d.querySelector("#template-card").content,
    $fragment = d.createDocumentFragment(),
    $cardContainer = d.querySelector("#items");

  for (const el of data) {
    const { id, Nombre, Precio, Imagen, Decripcion } = el;
    $template.querySelector(".card-img-top").setAttribute("src", Imagen);
    $template.querySelector(".card-img-top").dataset.id = id;
    $template.querySelector(".card-img-top").dataset.nombre = Nombre;
    $template.querySelector(".card-img-top").dataset.precio = Precio;
    $template.querySelector(".card-img-top").dataset.imagen = Imagen;
    $template.querySelector(".card-img-top").dataset.descripcion = Decripcion;
    $fragment.appendChild(d.importNode($template, true));
  }
  $cardContainer.appendChild($fragment);
};

d.addEventListener("DOMContentLoaded", async () => {
  // GET
  const ropa = await RestFetch.getData("http://localhost:4000/dataRopa");
  drawCardTemp(ropa);
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".card-img-top")) {
    d.querySelector(".imagen-modal").setAttribute(
      "src",
      e.target.dataset.imagen
    );
    d.querySelector(".titulo-modal").textContent = e.target.dataset.nombre;
    d.querySelector(".descripcion-modal").textContent =
      e.target.dataset.descripcion;
    d.querySelector(
      ".precio-modal"
    ).textContent = `$ ${e.target.dataset.precio}`;
  }
});
