import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'

{/*Ejercicio Entregable — useState + useEffect
Lista de usuarios desde una API
Crea un componente que:
Muestre datos de usuarios desde: https://jsonplaceholder.typicode.com/users
- Guarde los datos obtenidos en un estado.
- Muestre en pantalla una tabla de nombres de los usuarios.
- Cada usuario debe tener un botón para eliminarlo de la lista (solo localmente).
- (Opcional) Agregá un campo de búsqueda para filtrar usuarios por nombre en tiempo real.
*/}

function App() {

  const [usuarios, setUsuarios] = useState([]);

  
  //Función que elimina un usuario de la lista
  const eliminarUsuario = (id) => {

    const deleteUsers = usuarios.filter((usuario) => usuario.id !== id);   // Método que filtra el array de usuarios, dejando fuera el que tenga el id recibido


    setUsuarios(deleteUsers); // Se actualiza el array sin el usuario eliminado
  }

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Actualiza el estado 'usuarios' con los datos obtenidos
      setUsuarios(data);
      console.log(data);
    } catch (err) {

      console.error("error: ", err);
    }
  };


  //Llama a la funcion fetchUsuarios para cargar los datos iniciales en useEffect
  useEffect(() => {

    fetchUsuarios();

  }, []);

  return (
    <>
      <div>
        <h1>Listado de Usuarios </h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {usuarios.map(usuario => (
              <li
                key={usuario.id}
                style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '5px' }}
              >
                <h3>{usuario.name}</h3>
<button onClick={() => eliminarUsuario(usuario.id)}>Eliminar usuario</button>
              </li>
            ))}
          </ul>
      </div>
    </>
  )
}

export default App