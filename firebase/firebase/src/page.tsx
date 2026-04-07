'use client'
import { useEffect, useState } from 'react'
import { db } from './firebase.config'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

type Proyecto = {
  id: string;
  solicitante: string;
  dga: string;
  contacto: string;
  patrocinador: string;
  socioNegocio: string;
  cr: string;
  iniciativa: string;
  departamentos: string;
  tipo: string;
};

export default function Home() {
  const emptyForm = {
    solicitante: '',
    dga: '',
    contacto: '',
    patrocinador: '',
    socioNegocio: '',
    cr: '',
    iniciativa: '',
    departamentos: '',
    tipo: '',
  };

  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState<Proyecto[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateDoc(doc(db, 'proyectos', editingId), form);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'proyectos'), {
          ...form,
          createdAt: new Date()
        });
      }

      setForm(emptyForm);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: Proyecto) => {
    setForm(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'proyectos', id));
    fetchItems();
  };

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'proyectos'));
    setItems(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Proyecto, 'id'>),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2">Formulario</h1>
        <p className="text-gray-500 mb-8">Ingrese la información del proyecto</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <Input label="Solicitante" name="solicitante" value={form.solicitante} onChange={handleChange} />
            <Input label="Información de contacto" name="contacto" value={form.contacto} onChange={handleChange} />
            <Input label="Socio de negocio" name="socioNegocio" value={form.socioNegocio} onChange={handleChange} />
            <Input label="Nombre de la iniciativa" name="iniciativa" value={form.iniciativa} onChange={handleChange} />
            <Input label="Tipo de iniciativa" name="tipo" value={form.tipo} onChange={handleChange} />
          </div>

          <div className="space-y-5">
            <Input label="DGA" name="dga" value={form.dga} onChange={handleChange} />
            <Input label="Patrocinador" name="patrocinador" value={form.patrocinador} onChange={handleChange} highlight />
            <Input label="CR" name="cr" value={form.cr} onChange={handleChange} />
            <Input label="Departamentos impactados" name="departamentos" value={form.departamentos} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          {editingId && (
            <button
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
              }}
              className="px-5 py-2 rounded-lg bg-gray-400 text-white"
            >
              Cancelar
            </button>
          )}

          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 transition"
          >
            {editingId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <p className="font-bold text-lg text-gray-800">{item.iniciativa}</p>
            <p className="text-sm text-gray-500">{item.solicitante} • {item.dga}</p>
            <p className="text-sm mt-2 text-gray-600">{item.tipo}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, highlight = false }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-lg border ${
          highlight ? 'border-blue-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-red-400`}
      />
    </div>
  );
}