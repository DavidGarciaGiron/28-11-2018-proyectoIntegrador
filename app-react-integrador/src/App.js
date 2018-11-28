import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = ({
        clientes: [],
        pos: null,
        titulo: 'Nuevo',
        id_cliente: 1,
        nombre: '',
        correo: '',
        dni: 0,
        password: '',
        direccion: '',
        latitud: '0',
        longitud: '0'
      })

      this.cambioNombre = this.cambioNombre.bind(this);
      this.cambioCorreo = this.cambioCorreo.bind(this);
      this.cambioDni = this.cambioDni.bind(this);
      this.cambioPassword = this.cambioPassword.bind(this);
      this.cambioDireccion = this.cambioDireccion.bind(this);
      this.cambioLatitud = this.cambioLatitud.bind(this);
      this.cambioLongitud = this.cambioLongitud.bind(this);
      this.mostrar = this.mostrar.bind(this);
      this.eliminar = this.eliminar.bind(this);
      this.guardar = this.guardar.bind(this);
  }

  componentWillMount() {
      axios.get('https://integrador4tociclo-vicse.c9users.io/api/clientes/')
        .then((cli) => {
          this.setState({
            clientes: cli.data
          })
        });
    }

  render() {
      return (
        <div>
          <h3>Pagina Principal</h3>
          <hr/>
          <br/>
          <br/>

          <table border="1">
          <thead>
            <tr>
              <th>nombre</th>
              <th>correo</th>
              <th>dni</th>
              <th>password</th>
              <th>direccion</th>
              <th>latitud</th>
              <th>longitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clientes.map(cliente => {
              return (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.dni}</td>
                  <td>{cliente.password}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.latitud}</td>
                  <td>{cliente.longitud}</td>
                  <td>
                    <button onClick={()=>this.mostrar(cliente.id_cliente)}>Editar</button>
                    <button onClick={()=>this.eliminar(cliente.id_cliente)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>

          <hr />
          <h1>{this.state.titulo}</h1>
          <form onSubmit={this.guardar}>
            <input type="hidden" value={this.state.id_cliente} />
            <p>Ingrese nombre: <input type="text" value={this.state.nombre} onChange={this.cambioNombre} /></p>
            <p>Ingrese correo: <input type="email" value={this.state.correo} onChange={this.cambioCorreo} /></p>
            <p>Ingrese dni: <input type="text" value={this.state.dni} onChange={this.cambioDni} /></p>
            <p>Ingrese password: <input type="password" value={this.state.password} onChange={this.cambioPassword} /></p>
            <p>Ingrese direccion: <input type="text" value={this.state.direccion} onChange={this.cambioDireccion} /></p>
            <p>Ingrese latitud: <input type="number" value={this.state.latitud} onChange={this.cambioLatitud} /></p>
            <p>Ingrese longitud: <input type="number" value={this.state.longitud} onChange={this.cambioLongitud} /></p>

            <p><input type="submit" /></p>
            </form>
        </div>
      );
    }

    cambioNombre(e) {
      this.setState( {
        nombre: e.target.value
      })
    }

    cambioCorreo(e) {
      this.setState( {
        correo: e.target.value
      })
    }

    cambioDni(e) {
      this.setState( {
        dni: e.target.value
      })
    }

    cambioPassword(e) {
      this.setState( {
        password: e.target.value
      })
    }

    cambioDireccion(e) {
      this.setState( {
        direccion: e.target.value
      })
    }

    cambioLatitud(e) {
      this.setState( {
        latitud: e.target.value
      })
    }

    cambioLongitud(e) {
      this.setState( {
        longitud: e.target.value
      })
    }

    mostrar(cod){
      axios.get('https://integrador4tociclo-vicse.c9users.io/api/clientes/'+cod+'/')
      .then(cli => {
        this.setState( {
          titulo: 'Editar',
          id_cliente: cli.data.id_cliente,
          nombre: cli.data.nombre,
          correo: cli.data.correo,
          dni: cli.data.dni,
          password: cli.data.password,
          direccion: cli.data.direccion,
          latitud: cli.data.latitud,
          longitud: cli.data.longitud,
        })
      });
    }

    guardar(e){
      e.preventDefault();
      let cod = this.state.id_cliente;
      let datos = {
        nombre: this.state.nombre,
        correo: this.state.correo,
        dni: this.state.dni,
        password: this.state.password,
        direccion: this.state.direccion,
        latitud: this.state.latitud,
        longitud: this.state.longitud,
      }
      if(cod>0){ //Editamos un Registro
        axios.put('https://integrador4tociclo-vicse.c9users.io/api/clientes/'+cod+'/', datos)
        .then(cli => {

          var temp = this.state.clientes;
          this.setState( {
            pos: null,
            titulo: 'Nuevo',
            id_cliente: 0,
            nombre: '',
            correo: '',
            dni: '',
            password: '',
            direccion: '',
            latitud: 0,
            longitud: 0,
            clientes: temp
          });
        }).catch((error)=>{
          console.log(error.toString());
        });
      }else{ // Nuevo Registro
        axios.post('https://integrador4tociclo-vicse.c9users.io/api/clientes/', datos)
        .then(cli => {
          this.state.clientes.push(cli.data);
          var temp = this.state.clientes;
          this.setState( {
            id_cliente: 0,
            nombre: '',
            correo: '',
            dni: '',
            password: '',
            direccion: '',
            latitud: 0,
            longitud: 0,
            clientes: temp
          });
        }).catch((error)=>{
          console.log(error.toString());
        });
      }
    }

    eliminar(cod){
      axios.delete('https://integrador4tociclo-vicse.c9users.io/api/clientes/'+cod+'/')
      .then(cli => {
        var temp = this.state.clientes.filter((serie)=>serie.id_cliente !== cod);
        this.setState({
          clientes: temp
        })
      });
    }
}

export default App;
