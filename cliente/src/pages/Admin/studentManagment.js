import React, { useState } from 'react';
import API from '../services/api';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../api";

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
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE ALUMNOS
        </div>

        <div className="card-body">

          <input className="form-control mb-2" placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)} />

          <input className="form-control mb-2" placeholder="Middle Name"
            value={middle_name}
            onChange={(e) => setMiddle_name(e.target.value)} />

          <input className="form-control mb-2" placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)} />

          <input className="form-control mb-2" placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input className="form-control mb-2" placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <input type="number" className="form-control mb-2" placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)} />

          <input type="number" className="form-control mb-2" placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)} />

          <button className="btn btn-secondary m-1"
            onClick={() => setTakes_math(takes_math === 1 ? 0 : 1)}>
            {takes_math === 1 ? "Math ON" : "Math OFF"}
          </button>

          <button className="btn btn-secondary m-1"
            onClick={() => setTakes_lenguage(takes_lenguage === 1 ? 0 : 1)}>
            {takes_lenguage === 1 ? "Language ON" : "Language OFF"}
          </button>

        </div>

        <div className="card-footer">
          {editar ? (
            <>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </>
          ) : (
            <button className='btn btn-success' onClick={add}>Registrar</button>
          )}
        </div>
      </div>

      <button className='btn btn-primary mt-3' onClick={getAlumnos}>Cargar Alumnos</button>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Username</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Math</th>
            <th>Language</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnosList.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td>{val.first_name}</td>
              <td>{val.username}</td>
              <td>{val.age}</td>
              <td>{val.grade}</td>
              <td>{val.takes_math}</td>
              <td>{val.takes_lenguage}</td>
              <td>
                <button className="btn btn-info m-1"
                  onClick={() => editarAlumno(val)}>Editar</button>
                <button className="btn btn-danger m-1"
                  onClick={() => deleteAlumno(val)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default StudentManagement;