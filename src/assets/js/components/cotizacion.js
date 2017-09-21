const Cotizacion = (update) => {
    const parent = $('<section class="container show-price"></section>');
    const cotizacion = $('<div class="row"></div>');
    const welcome = $('<p class="dataUser__welcome">¡Perfecto '+state.user.nombres+', estás a un paso de terminar!</p><p class="dataUser__text">Acabas de escoger:</p>');

    const plan = $('<span>Plan: '+state.selectedPlan+'</span><br>');
    const placa = $('<span>Placa: '+state.vehicle.placa+'</span><br>');
    const marca = $('<span>Marca: '+state.vehicle.marca+'</span><br>');
    const modelo = $('<span>Modelo: '+state.vehicle.modelo+'</span><br>');
    const ano = $('<span>Año: '+state.vehicle.anioFabricacion+'</span><br>');
    var coberturas = [];
    for (var i = 0; i < state.plan[state.idPlan].coberturas.length; i++) {
      coberturas.push(state.plan[state.idPlan].coberturas[i].descripcion);
    }
    const descripcion = $('<p>Este Plan incluye '+ (coberturas.join(', ')).toLowerCase() +'</p><br><p>Si estás conforme con  este plan, continúa con el pago.</p>');

    const continua = $('<button type="button" class="btn-large dataUser__button">CONTINUAR</button>');

    cotizacion.append(welcome);
    cotizacion.append(plan);
    cotizacion.append(placa);
    cotizacion.append(marca);
    cotizacion.append(modelo);
    cotizacion.append(ano);
    cotizacion.append(descripcion);

    continua.on('click', ()=>{
        state.screen = PagosCulqi;
        update();
    });

    cotizacion.append(continua);
    parent.append(cotizacion);

    return parent;
}
