import {  bancos} from "./clases/bancos.js";

const BancoComponente = ()=>{
  return (
    <ul>
      {bancos.map((a) => 
        <li key={a.id}>
          {a.name} - {a.country}
        </li>
      ))}
    </ul>
  );
};

export default BancoComponente;
