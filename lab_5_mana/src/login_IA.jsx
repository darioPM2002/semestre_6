import React, { useState, useMemo } from "react";
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
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import "./usuarios";

const dataInicial = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@gmail.com", password: "1234" },
  { id: 2, nombre: "Ana López", correo: "ana@gmail.com", password: "abcd" },
];

const initialFormState = {
  id: "",
  nombre: "",
  correo: "",
  password: "",
};

export const UsuariosIA = () => {
  const [data, setData] = useState(dataInicial);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const nextId = useMemo(() => {
    return data.length > 0 ? Math.max(...data.map((u) => u.id)) + 1 : 1;
  }, [data]);

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.correo)) {
      newErrors.correo = "Correo inválido";
    }

    if (!form.password || form.password.length < 4) {
      newErrors.password = "Mínimo 4 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openInsertModal = () => {
    setForm({ ...initialFormState, id: nextId });
    setModal("insertar");
  };

  const openEditModal = (usuario) => {
    setForm(usuario);
    setModal("editar");
  };

  const closeModal = () => {
    setModal(null);
    resetForm();
  };

  const handleInsert = () => {
    if (!validate()) return;
    setData([...data, form]);
    closeModal();
  };

  const handleEdit = () => {
    if (!validate()) return;
    const updated = data.map((usuario) =>
      usuario.id === form.id ? form : usuario
    );
    setData(updated);
    closeModal();
  };

  const handleDelete = (usuario) => {
    if (window.confirm(`¿Eliminar a ${usuario.nombre}?`)) {
      setData(data.filter((u) => u.id !== usuario.id));
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <Container className="py-5 d-flex justify-content-center">
      <div className="banorte-card w-100" style={{ maxWidth: 1100 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="banorte-title mb-1">
              Gestión de Usuarios
            </h2>
            <small className="text-muted">
              Administración interna de accesos
            </small>
          </div>

          <Button className="btn-banorte" onClick={openInsertModal}>
            + Nuevo Usuario
          </Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Buscar usuario por nombre..."
            style={{ maxWidth: 350 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table
          bordered={false}
          responsive
          className="table-banorte align-middle"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fw-semibold">{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      className="me-2"
                      color="light"
                      onClick={() => openEditModal(usuario)}
                    >
                      ✏️
                    </Button>
                    <Button
                      size="sm"
                      color="light"
                      onClick={() => handleDelete(usuario)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modal !== null} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal}>
          {modal === "insertar" ? "Nuevo Usuario" : "Editar Usuario"}
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>ID</Label>
            <Input value={form.id} readOnly />
          </FormGroup>

          <FormGroup>
            <Label>Nombre</Label>
            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              invalid={!!errors.nombre}
            />
            <FormFeedback>{errors.nombre}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Correo</Label>
            <Input
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              invalid={!!errors.correo}
            />
            <FormFeedback>{errors.correo}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              invalid={!!errors.password}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn-banorte"
            onClick={modal === "insertar" ? handleInsert : handleEdit}
          >
            Guardar
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};