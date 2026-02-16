const estudiante={
    matricula: "A01785420",
    nombre: "Dario Peña",
    edad: "23",
    direccion:{
        ciudad: "monterrey",
        cp: 42321,

    }
};
console.table(estudiante);
console.log(estudiante);

const estudiante2 ={...estudiante};
estudiante.nombre="Nancy";