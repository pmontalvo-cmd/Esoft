import React, { useState } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentManagement() {

  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [takes_math, setTakes_math] = useState(0);
  const [takes_lenguage, setTakes_lenguage] = useState(0);
  const [alumnosList, setAlumnos] = useState([]);

  // CREATE
  const add = () => {
    API.post("/create", {
      first_name,
      middle_name,
      last_name,
      username,
      password,
      age,
      grade,
      takes_math,
      takes_lenguage
    }).then(() => {
      limpiarCampos();
      getAlumnos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: `<i>El alumno ${first_name} fue registrado con éxito</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch((error) => {
      console.error(error);
      Swal.fire("Error", "No se pudo registrar", "error");
    });
  };

  // READ
  const getAlumnos = () => {
    API.get("/alumnos")
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // UPDATE
  const update = () => {
    API.put("/update", {
      id,
      first_name,
      middle_name,
      last_name,
      username,
      password,
      age,
      grade,
      takes_math,
      takes_lenguage
    }).then(() => {
      limpiarCampos();
      getAlumnos();
      Swal.fire({
        title: "<strong>Actualización exitosa</strong>",
        html: `<i>El alumno ${first_name} fue actualizado</i>`,
        icon: 'success',
        timer: 3000
      });
    }).catch((error) => {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar", "error");
    });
  };

  // DELETE
  const deleteAlumno = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html: `<i>¿Desea eliminar a <strong>${val.first_name}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete(`/delete/${val.id}`)
          .then(() => {
            limpiarCampos();
            getAlumnos();
            Swal.fire("Eliminado", "Alumno eliminado correctamente", "success");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const limpiarCampos = () => {
    setFirst_name("");
    setMiddle_name("");
    setLast_name("");
    setUsername("");
    setPassword("");
    setAge("");
    setGrade("");
    setTakes_math(0);
    setTakes_lenguage(0);
    setEditar(false);
  };

  const editarAlumno = (val) => {
    setEditar(true);
    setId(val.id);
    setFirst_name(val.first_name);
    setMiddle_name(val.middle_name);
    setLast_name(val.last_name);
    setUsername(val.username);
    setPassword(val.password);
    setAge(val.age);
    setGrade(val.grade);
    setTakes_math(val.takes_math);
    setTakes_lenguage(val.takes_lenguage);
  };

  return (
    // 👇 TODO lo de abajo se queda igual
    <div className='container'>
      ...
    </div>
  );
}

export default StudentManagement;