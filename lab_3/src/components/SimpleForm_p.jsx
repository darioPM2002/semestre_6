import { useState } from 'react';
import "../css/estilo_1.css";

export const SimpleForm1 = () => {

    const [formState, setFormState] = useState({
        matricula: '',
        nombre: '',
        apellidos: '',
        edad: '',
        universidad: '',
        carrera: ''
    });

    const [submittedData, setSubmittedData] = useState(null);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formState);
    };

    return (
        <div className="liquid-glass">
            <h2>Formulario de Registro</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="matricula"
                    placeholder="Matrícula"
                    value={formState.matricula}
                    onChange={onInputChange}
                />

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formState.nombre}
                    onChange={onInputChange}
                />

                <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={formState.apellidos}
                    onChange={onInputChange}
                />

                <input
                    type="text"
                    name="edad"
                    placeholder="Edad"
                    value={formState.edad}
                    onChange={onInputChange}
                />

                <input
                    type="text"
                    name="universidad"
                    placeholder="Universidad"
                    value={formState.universidad}
                    onChange={onInputChange}
                />

                <input
                    type="text"
                    name="carrera"
                    placeholder="Carrera"
                    value={formState.carrera}
                    onChange={onInputChange}
                />

                <button type="submit">Enviar</button>
            </form>

            {submittedData && (
                <div>
                    <h3>Datos ingresados:</h3>
                    <p>Matrícula: {submittedData.matricula}</p>
                    <p>Nombre: {submittedData.nombre}</p>
                    <p>Apellidos: {submittedData.apellidos}</p>
                    <p>Edad: {submittedData.edad}</p>
                    <p>Universidad: {submittedData.universidad}</p>
                    <p>Carrera: {submittedData.carrera}</p>
                </div>
            )}
        </div>
    );
};