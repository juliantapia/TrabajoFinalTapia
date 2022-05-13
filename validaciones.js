function camposCorrectos({monto, cuotas}){
    if(monto == "" || monto.trim() == ""){
      Swal.fire({
        title: 'Error!',
        text: 'El Monto No Puede Estar Vacio',       
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      return false;
    }
    if (cuotas == "" || cuotas.trim() == "") {
      Swal.fire({
        title: 'Error!',
        text: 'Cantidad de Cutoas No Puede Estar Vacio',       
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      return false;
    }
    return true;
  }