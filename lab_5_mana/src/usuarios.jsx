import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table,Button,Container,FormGroup,
Modal,ModalHeader,ModalBody,ModalFooter,
} from "reactstrap";
const dataInicial = [
    { id: 1, nombre: 'Jorge Carranza', empresa: 'Tec' },
    { id: 2, nombre: 'Ramon Velez', empresa: 'Banorte' },
    { id: 3, nombre: 'Hugo Sanchez', empresa: 'Real Madrid' },
    { id: 4, nombre: 'Rafael Marquez', empresa: 'Barcelona' },
    { id: 5, nombre: 'Carlos Alcaraz', empresa: 'Mallorca' },
    { id: 6, nombre: 'N. Djokovic', empresa: 'Serbia' },
    { id: 7, nombre: 'Sergio Perez', empresa: 'Cadillac' },
    { id: 8, nombre: 'Max Verstapen', empresa: 'Oracle Red Bull Racing' },
    { id: 9, nombre: 'Carlos Sainz', empresa: 'Williams Racing' },
];

export const Usuarios = () => {
    const [data, setData] = React.useState(dataInicial);
    const [modalActualizar, setModalActualizar] = React.useState(false);
    const [modalInsertar, setModalInsertar] = React.useState(false);
    const [form, setForm] = React.useState({ id: "", nombre: "", empresa: "" });

    const mostrarModalActualizar = (dato) => {
        setForm(dato);
        setModalActualizar(true);
    };

    const cerrarModalActualizar = () => {
        setModalActualizar(false);
    };

    const mostrarModalInsertar = () => {
        setForm({ id: "", nombre: "", empresa: "" });
        setModalInsertar(true);
    };

    const cerrarModalInsertar = () => {
        setModalInsertar(false);
    };

    const editar = (dato) => {
        const newData = data.map(registro =>
            registro.id === dato.id ? dato : registro
        );
        setData(newData);
        setModalActualizar(false);
    };

    const eliminar = (dato) => {
        if (window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id)) {
            setData(data.filter(registro => registro.id !== dato.id));
            setModalActualizar(false);
        }
    };

    const insertar = () => {
        const valorNuevo = { ...form, id: data.length + 1 };
        setData([...data, valorNuevo]);
        setModalInsertar(false);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Container className="d-flex flex-column align-items-center">
                <br />
                <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
                <br />
                <br />
                <Table className="text-center" style={{ maxWidth: 800 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.empresa}</td>
                                <td>
                                    <Button color="primary" onClick={() => mostrarModalActualizar(dato)}>Editar</Button>{" "}
                                    <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar nombre</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id: </label>
                        <input className="form-control" readOnly type="text" value={data.length + 1} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Empresa: </label>
                        <input className="form-control" name="empresa" type="text" onChange={handleChange} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={insertar}>Insertar</Button>
                    <Button className="btn btn-danger" onClick={cerrarModalInsertar}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label> Id:</label>
                        <input className="form-control" readOnly type="text" value={form.id} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input className="form-control" name="nombre" type="text" onChange={handleChange} value={form.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <label>Empresa:</label>
                        <input className="form-control" name="empresa" type="text" onChange={handleChange} value={form.empresa} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => editar(form)}>Editar</Button>
                    <Button color="danger" onClick={cerrarModalActualizar}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
