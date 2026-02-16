import{bancos} from "./bancos.js"
console.log(bancos)
const getBancoiD = (id)=> bancos.find((banco=>banco.id===id));
console.log(getBancoiD(1))