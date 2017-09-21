"use strict";

const PlacaRegister = (update) => {
  const vehicle_data= $('<section id="vehicle-data" class="container validation-vehicle"></section>');
  var name = state.user.nombres;
  const welcome = $('<p class="dataUser__welcome" style="text-transform: capitalize;">¡Hola '+name.toLowerCase()+' !</p><p class="dataUser__text">Para continuar con la cotización de tu seguro vehicular ingresa tu Número de Placa:</p>');

  const contentplaca = $('<div class="input-field col s12 dataUser__input"></div>');

  const label= $('<label for="vehicle-plate" class="active">PLACA</label>');
  const vehicle_plate = $('<input id="vehicle-plate" type="text" placeholder="Ingresa tu Número de Placa" maxlength="6">');

  const contentButton = $('<div class="input-field col s12 continue"></div>');
  const search_btn= $('<button id="search" type="button" name="button" class="btn-large dataUser__button">BUSCAR</button>');
  const continue_btn= $('<button id="continue" type="button" name="button" class="btn-large dataUser__button">CONTINUAR</button>');

  const result= $('<p id="result"></p>');

  const progressBar = $(`<div class="progress__register">
    <ul class="estado-3pasos estado-login">
        <li class="paso-1"><span><img class="breadcrumb p1" src="assets/img/usuario.svg" alt="user"></li>
        <li class="paso-2"><span><img class="breadcrumb p2" src="assets/img/auto.svg" alt="auto"></span></li>
        <li class="paso-3"><span><img class="breadcrumb" src="assets/img/plan.svg" alt="check"></span></li>
        <li class="paso-4"><span><img class="breadcrumb" src="assets/img/confirmacion.svg" alt="confirmacion"></li>
    </ul>
  </div>`);

  contentButton.append(search_btn);
  contentButton.append(continue_btn);

  contentplaca.append(label);
  contentplaca.append(vehicle_plate);

  vehicle_data.append(welcome);
  vehicle_data.append(contentplaca);
  vehicle_data.append(contentButton);
  vehicle_data.append(result);

  vehicle_plate.on("keypress", (e)=> {
    let tecla= e.keyCode;
    if (tecla > 47 && tecla < 58) {
      return true;
    }else if (tecla > 64 && tecla < 91) {
      return true;
    }else if (tecla > 96 && tecla < 123) {
      return true;
    }else {
      return false;
    }
  });
  vehicle_plate.on("keyup", (e)=> {
    if ($(e.currentTarget).val().length == 6) {
      search_btn.prop("disabled", false);
    }else {
      search_btn.prop("disabled", true);
      continue_btn.hide();
      search_btn.show();
    }
  });
  search_btn.on('click', (e) => {
    check_vehicle(vehicle_plate.val());
  });
  continue_btn.on('click', _ => {
    state.screen = Planes;
    const root =$('#root');
    render(root);
  });
  continue_btn.hide();
  search_btn.prop('disabled', true);
  vehicle_data.append(progressBar);
  return vehicle_data;
}
const check_vehicle= (placa) => {
  const report= $('#result');
  report.empty();
  let url= 'https://rasveuswap01-test01.azurewebsites.net/Laboratoria/v1/vehiculo/' + placa.toUpperCase() ;
  $.getJSON(url, (response)=>{
    state.vehicle= response;
    if (state.vehicle.anioFabricacion == 2017) {
      const vehicle_description= $('<span style="font-weight:bold;">'+ state.vehicle.marca + ' ' + state.vehicle.modelo + ' de ' + state.vehicle.anioFabricacion +'</span>');
      report.text("Tienes un ");
      report.append(vehicle_description);
      $('#search').hide();
      $('#continue').show();
    }else {
      console.log("menor del 2017");
      report.text('Válido sólo para vehículos 0 Km');
      state.vehicle= null;
      $('#continue').hide();
      $('#search').show();
    }
  }).fail(function() {
    report.text('Nro de placa no encontrado');
  });
}
