import { useState } from 'react';
import './MenuModif.css';
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from '../boton/Boton';
import Subtitulo from '../subtitulo/Subtitulo';
import MenuService from '../menuModif/MenuService'; 

function MenuModif() {
  const [menu, setMenu] = useState({
    title: "",
    category: "",
    img: "",
    description: "",
    ingredients: "",
    price: "",
    valoration: "",
    tipo: "",
  });
  const [menuId, setMenuId] = useState(""); // Estado para almacenar el ID del menú a actualizar o eliminar

  const btnClick = async (e, action) => {
    e.preventDefault();

    if (action === "create") {
      try {
        const newMenu = await MenuService.createMenu(menu);
        console.log("Menú creado:", newMenu);
        
        setMenu({
          title: "",
          category: "",
          img: "",
          description: "",
          ingredients: "",
          price: "",
          valoration: "",
          tipo: "",
        });
      } catch (error) {
        console.error("Error al crear el menú:", error);
      }
    } else if (action === "update") {
      if (menuId) {
        const confirmAction = window.confirm("¿Estás seguro de que deseas actualizar este menú?");
        if (confirmAction) {
          try {
            const updatedMenu = await MenuService.updateMenuById(menuId, menu);
            console.log("Menú actualizado:", updatedMenu);
            
            setMenu({
              title: "",
              category: "",
              img: "",
              description: "",
              ingredients: "",
              price: "",
              valoration: "",
              tipo: "",
            });
            setMenuId("");
          } catch (error) {
            console.error("Error al actualizar el menú:", error);
          }
        }
      } else {
        alert("Debes ingresar un ID para actualizar un menú.");
      }
    } else if (action === "delete") {
      if (menuId) {
        const confirmAction = window.confirm("¿Estás seguro de que deseas eliminar este menú?");
        if (confirmAction) {
          try {
            await MenuService.deleteMenu(menuId);
            console.log("Menú eliminado");
            
            setMenu({
              title: "",
              category: "",
              img: "",
              description: "",
              ingredients: "",
              price: "",
              valoration: "",
              tipo: "",
            });
            setMenuId("");
          } catch (error) {
            console.error("Error al eliminar el menú:", error);
          }
        }
      } else {
        alert("Debes ingresar un ID para eliminar un menú.");
      }
    }
  };

  const onChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='conteinerGeneral'>
      <div className='cargarMenu'>
        <Subtitulo clase={"subtitulo"} texto={"Carga de menú"} />
        <form className='formulario'>
          <FormularioInput id={"menuId"} tipo={"text"} texto={"ID del menú (para actualizar o eliminar)"} value={menuId} onChan={(e) => setMenuId(e.target.value)} />
          <FormularioInput id={"title"} tipo={"text"} texto={"Nombre del menú"} value={menu.title} onChan={onChange} />
          <FormularioInput id={"category"} tipo={"text"} texto={"Categoría del menú"} value={menu.category} onChan={onChange} />
          <FormularioInput id={"img"} tipo={"text"} texto={"Enlace de la imagen del menú"} value={menu.img} onChan={onChange} />
          <FormularioInput id={"description"} tipo={"text"} texto={"Descripción del menú"} value={menu.description} onChan={onChange} />
          <FormularioInput id={"ingredients"} tipo={"text"} texto={"Ingredientes del menú"} value={menu.ingredients} onChan={onChange} />
          <FormularioInput id={"price"} tipo={"number"} texto={"Precio del menú"} value={menu.price} onChan={onChange} />
          <FormularioInput id={"valoration"} tipo={"number"} texto={"Valoración del menú"} value={menu.valoration} onChan={onChange} />
          <FormularioInput id={"tipo"} tipo={"text"} texto={"Tipo del menú"} value={menu.tipo} onChan={onChange} />
          
          <div className="boton-container">
            <Boton btn={{ id: "crear", clase: "comun", texto: "Crear menú" }} btnClick={(e) => btnClick(e, "create")} />
            <Boton btn={{ id: "actualizar", clase: "comun", texto: "Actualizar menú" }} btnClick={(e) => btnClick(e, "update")} />
            <Boton btn={{ id: "borrar", clase: "comun", texto: "Borrar menú" }} btnClick={(e) => btnClick(e, "delete")} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default MenuModif;