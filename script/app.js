import { getData } from "./getData.js";
import { Prestamo } from "./clases.js";

document.getElementById('formTask').addEventListener('submit', savePrestamo);
function savePrestamo(e){ 
    let monto = document.getElementById('monto').value;
    let cuotas = document.getElementById('cuotas').value;
    let interes = 0.03;
    let amort = 0;
    let montoCompuesto = 0;
    let amortMensual = 0;
    let saldo = 0; 
    const pasarVariable = new Prestamo(monto,cuotas,interes,amort,montoCompuesto,amortMensual,saldo);
    const resultado = pasarVariable.amortizacion();    
    const MC = pasarVariable.amortizacionCapital();  
    const AM = pasarVariable.amortizacionMensual(resultado,MC);
    const saldoResult = pasarVariable.saldoCalculo(monto,AM);
    const task = new Prestamo(monto,cuotas,interes,resultado,MC,AM, saldoResult );   
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
    tasasView.innerHTML += ` <table class="table" ">
                            <thead>
                              <th>TNA</th>
                              <th>CFT</th>
                              <th>TEA</th>
                              <th>CFTNA</th>
                              <th>TEM</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${tasas.TNA} %</td>                       
                                <td>${tasas.CFT} %</td>                 
                                <td>${tasas.TEA} %</td>                       
                                <td>${tasas.CFTNA} %</td>                       
                                <td>${tasas.TEM} %</td>   
                              </tr>                                                      
                          </tbody>
                          </table>  
                          <p>${tasas.Descripcion}</p>`;
                          
  })
}

function getTasks(){    
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');       
    tasksView.innerHTML = ''; 
    tasks.forEach(function(tasks){    
      let monto = tasks.monto;   
      tasksView.innerHTML += `<br>
                              <div class="mb-3 alert alert-success"  >
                                <table id="lista-tabla" class="table">
                                                  <thead>
                                                      <tr>
                                                          <th>Monto Solicitado</th>
                                                          <th>A??os</th>
                                                          <th>Capital</th>
                                                          <th>Inter??s</th>
                                                          <th>Amortizacion</th>
                                                          <th>Saldo Restante</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                  <tr>
                                                  <td>${tasks.monto} $</td>                 
                                                  <td>${tasks.cuotas} </td>                       
                                                  <td>${tasks.amort} $<t/d>                       
                                                  <td>${tasks.montoCompuesto} $</td>
                                                  <td>${tasks.amortMensual} $</td>
                                                  <td>${tasks.saldo} $</td>
                                                </tr>
                                                </tbody>
                                    </table>
                                </div>`;              
      const botonBorrar = document.createElement("button");
      botonBorrar.innerText= "Borrar";
      botonBorrar.className = "btn btn-danger";
      botonBorrar.addEventListener("click", () => {deleteTask(monto);})
      tasksView.appendChild(botonBorrar);    
      const br = document.createElement("br");
      tasksView.appendChild(br);

      br.innerText  
    });  
}

function deleteTask(monto) {
  Swal.fire({
    title: 'Estas seguro que deseas eliminar la cotizacion?',
    text: "??No podr??s revertir esto!",
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