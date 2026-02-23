import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../api";

function StudentManagement() {
  let[id,setId]=useState(0)
  let[editar,setEditar]=useState(false)
  let[first_name,setFirst_name]=useState("");
  let[middle_name,setMiddle_name]=useState("");
  let[last_name,setLast_name]=useState("");
  let[username,setUsername]=useState("");
  let[password,setPassword]=useState("");
  let[age,setAge]=useState("");
  let[grade,setGrade]=useState("");
  let[takes_math,setTakes_math]=useState(0);
  let[takes_lenguage,setTakes_lenguage]=useState(0);
  let[alumnosList, setAlumnos]= useState([]);

  console.log(api.defaults.baseURL);


// CREATE USER
  const add=()=>{api.post("/create",
  {first_name:first_name,
    middle_name:middle_name,
    last_name:last_name,
    username:username,
    password:password,
    age:age, grade:grade,
    takes_math:takes_math,
    takes_lenguage:takes_lenguage}
    ).then(()=>{
      limpiarCampos();
      getAlumnos();
      Swal.fire({
        title:"<strong>Registro exitoso</strong>",
        html:"<i>El alumno "+ first_name+" fue registrado con exito</i>",
        icon:'success',
        timer:3000
    })});}

// GET ALL USERS
    const getAlumnos = () => {api.get("/alumnos").then((response) => {
        setAlumnos(response.data);
        (console.log((response.data)));});}

// UPDATE USER
    const update=()=>{api.put("/update",
      {id:id,
        first_name:first_name,
        middle_name:middle_name,
        last_name:last_name,
        username:username,
        password:password,
        age:age,
        grade:grade,
        takes_math:takes_math,
        takes_lenguage:takes_lenguage}
        ).then(()=>{
          limpiarCampos();
          getAlumnos();
          Swal.fire({
            title:"<strong>Registro exitoso</strong>",
            html:"<i>El alumno "+ first_name+" fue registrado con exito</i>",
            icon:'success',
            timer:3000
        })});}

// DELETE USER
  const deleteAlumno = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html:"<i>Realmente desea eliminar a <strong>"+ val.first_name +"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/delete/${val.id}`).then(() => {
          limpiarCampos();
          getAlumnos();
          Swal.fire(
            "Eliminado",
            val.first_name+" fue eliminado.",
            "success"
          );
        });
      }
    });}
const limpiarCampos=()=>{
  setFirst_name("");
  setMiddle_name("");
  setLast_name("");
  setUsername("");
  setPassword("");
  setAge("");
  setGrade("");
  setTakes_math("");
  setTakes_lenguage("");
  setEditar(false);
}






const editarAlumno  = (val)=>{
  setEditar(true);
  setFirst_name(val.first_name);
  setMiddle_name(val.middle_name);
  setLast_name(val.last_name);
  setUsername(val.username);
  setPassword(val.password);
  setAge(val.age);
  setGrade(val.grade);
  setTakes_math(val.takes_math);
  setTakes_lenguage(val.takes_lenguage);
  setId(val.id);}
  return (
      <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          GESTION DE ALUMNOS
        </div>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">First_name:</span>
            <input type="text"
              onChange={(event) => {
                setFirst_name(event.target.value);
              }}


              className="form-control" value={first_name} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Middle_name:</span>
            <input type="text"
              onChange={(event) => {
                setMiddle_name(event.target.value);
              }}


              className="form-control" value={middle_name} placeholder="Segundo Nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>




          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Last_name:</span>
            <input type="text" value={last_name}
              onChange={(event) => {
                setLast_name(event.target.value);
              }}


              className="form-control" placeholder="Ingrese Apellido" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Username:</span>
            <input type="text" value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}


              className="form-control" placeholder="Nombre de Usuario" aria-label="Username" aria-describedby="basic-addon1" />
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Password:</span>
            <input type="text" value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}


              className="form-control" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1" />
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Age:</span>
            <input type="number" value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}


              className="form-control" placeholder="Ingrese Edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Grade:</span>
            <input type="number" value={grade}
              onChange={(event) => {
                setGrade(event.target.value);
              }}


              className="form-control" placeholder="Grado" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

<h4>Courses Taken</h4>
<div className="d-flex justify-content-center mb-3">
  <button 
    className={`btn ${takes_math === 1 ? "btn-outline-primary" : "btn-outline-secondary"} focus-ring`} 
    onClick={() => setTakes_math(takes_math === 0 ? 1 : 0)}
  >
    {takes_math === 1 ? "Math ON" : "Math OFF"}
  </button>
</div>

<div className="d-flex justify-content-center mb-3">
  <button 
    className={`btn ${takes_lenguage === 1 ? "btn-outline-primary" : "btn-outline-secondary"} focus-ring`} 
    onClick={() => setTakes_lenguage(takes_lenguage === 0 ? 1 : 0)}
  >
    {takes_lenguage === 1 ? "Language ON" : "Language OFF"}
  </button>
</div>


        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
        </div>
          :<button className='btn btn-success' onClick={add}>Registro</button>
}
</div></div>
<div>
    <button className='btn btn-success' onClick={getAlumnos}>Get</button>
    </div>
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">First_name</th>
            <th scope="col">Middle_name</th>
            <th scope="col">Username</th>
            <th scope="col">Age</th>
            <th scope="col">Grade</th>
            <th scope="col">Takes_math</th>
            <th scope="col">Takes_lenguage</th>
          </tr>
        </thead>
        <tbody>
          {
            alumnosList.map((val, key) => {
              return <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.first_name}</td>
                <td>{val.middle_name}</td>
                <td>{val.username}</td>
                <td>{val.age}</td>
                <td>{val.grade}</td>
                <td>{val.takes_math}</td>
                <td>{val.takes_lenguage}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                    onClick={()=>{
                      editarAlumno(val);
                    }} className="btn btn-info">Editar</button>
                    <button type="button" onClick={()=>{
                      deleteAlumno(val);
                    }} className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }


        </tbody>
      </table></div>
    </div>
  );
}
export default StudentManagement;