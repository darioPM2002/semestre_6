import { useEffect, useState } from "react";
import "./proyectos.css";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  const [form, setForm] = useState({
    nombreProyecto: "",
    tipoIniciativa: "",
    CR: "",
    patrocinador: "",
    socioNegocio: "",
    descripcionGeneral: ""
  });

  const cargarProyectos = () => {
    fetch("http://localhost:3000/api/proyectos")
      .then(res => res.json())
      .then(data => setProyectos(data));
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/proyectos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      nombreProyecto: "",
      tipoIniciativa: "",
      CR: "",
      patrocinador: "",
      socioNegocio: "",
      descripcionGeneral: ""
    });

    cargarProyectos();
  };

  return (
    <div className="container">
      <h1>Proyectos</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input name="nombreProyecto" placeholder="Nombre del proyecto" value={form.nombreProyecto} onChange={handleChange} required />
        <input name="tipoIniciativa" placeholder="Tipo de iniciativa" value={form.tipoIniciativa} onChange={handleChange} />
        <input name="CR" placeholder="CR" value={form.CR} onChange={handleChange} />
        <input name="patrocinador" placeholder="Patrocinador" value={form.patrocinador} onChange={handleChange} />
        <input name="socioNegocio" placeholder="Socio de negocio" value={form.socioNegocio} onChange={handleChange} />
        <textarea name="descripcionGeneral" placeholder="Descripción general" value={form.descripcionGeneral} onChange={handleChange} />
        <button type="submit">Agregar proyecto</button>
      </form>

      <div className="lista">
        {proyectos.map(p => (
  <div className="card" key={p.folio}>
    <h3>{p.nombreproyecto}</h3>
    <p>{p.tipoiniciativa}</p>
    <p>{p.descripciongeneral}</p>
  </div>
))}
      </div>
    </div>
  );
}

export default Proyectos;