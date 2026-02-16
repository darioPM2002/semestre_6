import React from "react";
import { bancos } from "./clases/bancos.js";

const ListaBancos = () => {
  return (
    <ul>
      {bancos.map((a) => (
        <li key={a.id}>
          {a.name} - {a.country}
        </li>
      ))}
    </ul>
  );
};

export default ListaBancos;
