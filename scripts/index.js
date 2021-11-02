import RestFetch from "../helpers/RestFetch.js";
import { eraseContent } from "../helpers/auxFunctions.js";

const d = document;

// Pintar las cartas en la página principal
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

// Encargado de cargar el modal con la información del producto
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

    // Agregar producto al local storage (carrito)
    d.querySelector("#boton-agregar").addEventListener("click", () => {
      const newPayment = {
        id: e.target.dataset.id,
        Nombre: e.target.dataset.nombre,
        Precio: e.target.dataset.precio,
        Decription: e.target.dataset.descripcion,
      };
      let paymentInfo = [];
      if (localStorage.getItem("payment-info")) {
        paymentInfo = JSON.parse(localStorage.getItem("payment-info"));
        paymentInfo.push(newPayment);
        localStorage.setItem("payment-info", JSON.stringify(paymentInfo));
      } else {
        paymentInfo.push(newPayment);
        localStorage.setItem("payment-info", JSON.stringify(paymentInfo));
      }
    });
  }

  // Vaciar el carrito - eliminar del local storage
  d.querySelector("#vaciar").addEventListener("click", () => {
    d.querySelector("#tabla").innerHTML = "";
    d.querySelector("#total").innerHTML = "";
    localStorage.setItem("payment-info", "");
  });

  // Abre el carrito y pinta los productos agregados desde el localstorage
  d.querySelector("#boton-carrito").addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("payment-info"));
    let contador = 0;
    let contenido = "";
    carrito.forEach((el) => {
      contador += Number(el.Precio);
      contenido += `
      <tr>
        <th scope="row">${el.id}</th>
        <td>${el.Nombre}</td>
        <td>${el.Precio}</td>
      </tr>`;
    });
    contenido += `<tr>
    <th></th>
    <td></td>
    <td></td>
    <td>
    ${contador}
    </td>
    </tr>`;
    d.querySelector("#tabla").innerHTML = contenido;
    d.querySelector("#total").innerHTML = contador;
  });

  // Ejecuta la petición DELETE, elimina un producto
  d.querySelector("#boton-eliminar").addEventListener("click", () => {
    if (!e.target.id.value) {
      RestFetch.deleteData(
        "http://localhost:4000/dataRopa",
        e.target.dataset.id
      );
    }
  });
});
