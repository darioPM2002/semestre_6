import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const dataInicial = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@gmail.com", password: "1234" },
  { id: 2, nombre: "Ana López", correo: "ana@gmail.com", password: "abcd" },
];

export const UsuariosManual = () => {
  const [data, setData] = React.useState(dataInicial);
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [form, setForm] = React.useState({
    id: "",
    nombre: "",
    correo: "",
    password: "",
  });

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setForm({ id: "", nombre: "", correo: "", password: "" });
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = (dato) => {
    const nuevaLista = data.map((usuario) =>
      usuario.id === dato.id ? dato : usuario
    );
    setData(nuevaLista);
    setModalActualizar(false);
  };

  const eliminar = (dato) => {
    if (
      window.confirm(
        "¿Estás seguro que deseas eliminar el usuario " + dato.nombre + "?"
      )
    ) {
      setData(data.filter((usuario) => usuario.id !== dato.id));
    }
  };

  const insertar = () => {
    const nuevoUsuario = {
      ...form,
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
    };
    setData([...data, nuevoUsuario]);
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
        <h2>Registro de Usuarios</h2>
        <br />
        <Button color="success" onClick={mostrarModalInsertar}>
          Crear Usuario
        </Button>
        <br />
        <br />
        <Table className="text-center" style={{ maxWidth: 900 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => mostrarModalActualizar(usuario)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={() => eliminar(usuario)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal Insertar */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <h4>Nuevo Usuario</h4>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>ID:</label>
            <input
              className="form-control"
              readOnly
              value={data.length > 0 ? data[data.length - 1].id + 1 : 1}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="email"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Contraseña:</label>
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={insertar}>
            Guardar
          </Button>
          <Button color="secondary" onClick={cerrarModalInsertar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal Editar */}
      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <h4>Editar Usuario</h4>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>ID:</label>
            <input
              className="form-control"
              readOnly
              value={form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Contraseña:</label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => editar(form)}>
            Actualizar
          </Button>
          <Button color="secondary" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};