
class Prestamo{
    constructor(monto,cuotas,interes,amort,montoCompuesto,amortMensual){
        this.monto = monto; 
        this.cuotas = cuotas;
        this.interes = interes;  
        this.amort = amort;
        this.montoCompuesto = montoCompuesto;   
        this.amortMensual = amortMensual;     

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
  amortizacionMensual(PagoMensual,interesMensual){
       return PagoMensual - interesMensual;
  }


}

export {Prestamo}