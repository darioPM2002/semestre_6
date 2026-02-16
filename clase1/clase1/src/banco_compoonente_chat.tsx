import { bancos } from "./clases/bancos";

const BancoComponentechat = () => {
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

export default BancoComponentechat;
