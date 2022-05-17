import { getData } from "./getData.js";

class Prestamo{
    constructor(monto,cuotas,interes,amort,montoCompuesto){
        this.monto = monto; 
        this.cuotas = cuotas;
        this.interes = interes;  
        this.amort = amort;
        this.montoCompuesto = montoCompuesto;        

    }
  amortizacion() {   
          let exponente = Math.pow((1 + this.interes),-(this.cuotas));  
          let anualidad = this.monto * (  this.interes / (1 - exponente) ); 
          return Math.round(anualidad);
  }  
  amortizacionCapital(){
          let MC = this.monto * (1 + this.interes);
          let result = MC - this.monto ;
          return result;
  }
}
document.getElementById('formTask').addEventListener('submit', savePrestamo);
function savePrestamo(e){   
    let monto = document.getElementById('monto').value;
    let cuotas = document.getElementById('cuotas').value;
    let interes = 0.03;
    let amort = 0;
    let montoCompuesto = 0;
  //pasar primer variable.  
    const pasarVariable = new Prestamo(monto,cuotas,interes,amort,montoCompuesto);
    const resultado = pasarVariable.amortizacion();    
    const MC = pasarVariable.amortizacionCapital();  
    const task = new Prestamo(monto,cuotas,interes,resultado,MC);
 
    if(camposCorrectos(task)) {
        let tasks = localStorage.getItem('tasks');
        tasks = tasks === null && [] ;        
        if (tasks){          
            tasks.push(task);              
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }else{       
            tasks =  JSON.parse(localStorage.getItem('tasks'));       
            tasks.push(task);
                    
            localStorage.setItem('tasks',JSON.stringify(tasks))
        } 
      }       
    getTasks();
    e.preventDefault();
}
const Tasas = async () =>{  
  const MostarTasas = await getData();
  MostarTasas.forEach(tasas => {
  let tasasView = document.getElementById('tasas');  
  tasasView.innerHTML += `
                    <tbody>
                      <tr class="table-info">
                        <td>TNA:</td>
                        <td>${tasas.TNA} %</td>                       
                      </tr> 
                      <tr class="table-info">
                        <td>CFT:</td>
                        <td>${tasas.CFT} %</td>                       
                      </tr> 
                      <tr class="table-info">
                        <td>TEA:</td>
                        <td>${tasas.TEA} %</td>                       
                      </tr>  
                      <tr class="table-info">
                        <td>CFTNA:</td>
                        <td>${tasas.CFTNA} %</td>                       
                      </tr>
                      <tr class="table-info">
                        <td>TEM:</td>
                        <td>${tasas.TEM} %</td>                       
                      </tr>                     
                    </tbody>  
        `;
  })
}
function getTasks(){    
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');   
    tasksView.innerHTML = ''; 
    tasks.forEach(function(tasks){
      let monto = tasks.monto; 
      tasksView.innerHTML += `<div class="mb-3 alert alert-success"  >
               <div>
                       <p>Monto a Pagar $: ${tasks.monto} </p>                 
                       <p>En cantidad de años: ${tasks.cuotas} <p>                       
                       <p>Total a pagar por mes $: ${tasks.amort} <p>                       
                       <p>Interes $: ${tasks.montoCompuesto} <p>
                      </div>
       </div>`; 
       const botonBorrar = document.createElement("button");
       botonBorrar.innerText= "Borrar";
       botonBorrar.className = "btn btn-danger";
       botonBorrar.addEventListener("click", () => {
         deleteTask(monto);
       })
       tasksView.appendChild(botonBorrar);    
       const br = document.createElement("br");
       br.innerText  
    });
}
function deleteTask(monto) {
  Swal.fire({
    title: 'Estas seguro que deseas eliminar la cotizacion?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      for(let i = 0; i < tasks.length ; i++){
         if(tasks[i].monto == monto){
             tasks.splice(i,1);
         }
      }
      Swal.fire(
        'Su cotizacion fue eliminada',
        'Realizado'
      )
      localStorage.setItem('tasks', JSON.stringify(tasks));
      getTasks();
    }
  })
}

getTasks();
Tasas();