import { useState } from "react";
import "./modernForm.css";

export const ModernForm = () => {

  const [formState, setFormState] = useState({
    matricula: "",
    nombre: "",
    apellidos: "",
    edad: "",
    universidad: "",
    carrera: ""
  });

  const [submitted, setSubmitted] = useState(null);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(formState);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Registro Estudiantil</h2>

        <form onSubmit={onSubmit}>
          <input type="text" name="matricula" placeholder="Matrícula" value={formState.matricula} onChange={onInputChange}/>
          <input type="text" name="nombre" placeholder="Nombre" value={formState.nombre} onChange={onInputChange}/>
          <input type="text" name="apellidos" placeholder="Apellidos" value={formState.apellidos} onChange={onInputChange}/>
          <input type="text" name="edad" placeholder="Edad" value={formState.edad} onChange={onInputChange}/>
          <input type="text" name="universidad" placeholder="Universidad" value={formState.universidad} onChange={onInputChange}/>
          <input type="text" name="carrera" placeholder="Carrera" value={formState.carrera} onChange={onInputChange}/>
          <button type="submit">Enviar</button>
        </form>

        {submitted && (
          <div className="result">
            <h3>Información enviada</h3>
            <p><strong>Matrícula:</strong> {submitted.matricula}</p>
            <p><strong>Nombre:</strong> {submitted.nombre}</p>
            <p><strong>Apellidos:</strong> {submitted.apellidos}</p>
            <p><strong>Edad:</strong> {submitted.edad}</p>
            <p><strong>Universidad:</strong> {submitted.universidad}</p>
            <p><strong>Carrera:</strong> {submitted.carrera}</p>
          </div>
        )}
      </div>
    </div>
  );
};