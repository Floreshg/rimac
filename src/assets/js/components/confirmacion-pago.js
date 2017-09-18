"use strict";

const Shopping_thanks = (update) => {
  const message= $('<section class="container payment-confirmation">Gracias por tu compra!</section>');
  const title= $('<p>Tu compra ha sido exitosa</p>');
  const text= $('<div></div>');
  const garages_btn= $('<button id="continue" type="button" class="btn-large dataUser__button">TALLERES</button>');
  const progressBar = $(`<div class="progress__register">
    <ul class="estado-3pasos estado-login">
        <li class="paso-1"><span><img class="breadcrumb p1" src="assets/img/usuario.svg" alt="user"></li>
        <li class="paso-2"><span><img class="breadcrumb p2" src="assets/img/auto.svg" alt="auto"></span></li>
        <li class="paso-3"><span><img class="breadcrumb p3" src="assets/img/plan.svg" alt="check"></span></li>
        <li class="paso-4"><span><img class="breadcrumb" src="assets/img/confirmacion.svg" alt="confirmacion"></li>
    </ul>
  </div>`);

  message.append(title);
  text.append('<p>Acabas de asegurar tu vehículo con la mejor opción.</p>');
  text.append('<p>Te invitamos a conocer dónde puedes encontrar el Taller más cercano para tu vehículo asegurado.</p>');
  message.append(text);
  message.append(garages_btn);
  message.append(progressBar);

  garages_btn.on('click', _ => {
      state.screen = Garages;
       $.getJSON(`https://rasveuswap01-test01.azurewebsites.net/Laboratoria/v1/taller/4`, (json) => {
        state.garage = json;
        update();
           $('select').material_select();
        });

   /* update();*/
  });
  return message;
}
