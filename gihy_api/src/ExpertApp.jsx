import { useState } from 'react';
import { AddCategory } from './components/AddCategory'
import { GifGrid } from './components/GifGrid';

// Estilos para el grid responsivo
const gridStyles = `
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
  justify-items: center;      /* Centra los items en el grid */
  justify-content: center;    /* Centra el grid dentro del contenedor */
}
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
}
.card img {
  width: 100%;
  height: auto;
  display: block;
}
`;

// Inyecta los estilos en el documento solo una vez
if (typeof document !== 'undefined' && !document.getElementById('gif-grid-styles')) {
  const style = document.createElement('style');
  style.id = 'gif-grid-styles';
  style.innerHTML = gridStyles;
  document.head.appendChild(style);
}

export const ExpertApp = () => {
    const [categories, setCategories] = useState(['star wars']);
    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) return;
        setCategories([newCategory, ...categories]);
    }
    return (
        <>
            <h1>GifExpertApp</h1>
            <AddCategory onNewCategory={(value) => onAddCategory(value)} />
            {
                categories.map((category) => (
                    <GifGrid key={category} category={category} />
                ))
            }
        </>
    )
}
