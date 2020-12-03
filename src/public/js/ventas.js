const urlIngresos = 'api-ingresos'

function datosIngresos(){
    $.ajax({
        url: urlIngresos,
        method: 'GET',
        dataType: 'json',

        success: function(ingresos){
            listarIngresos(ingresos)
        },
    })
}

function listarIngresos(ingresos){
    let i
    
    $('#listadoIngresos').children('tbody').html('')
    if(ingresos.length > 0){
        let filaIngreso
        for(i = 0; i < ingresos.length; i++){
            let botones

            if(ingresos[i].User !== null){
                if(ingresos[i].estado === 'Aprobado'){
                    botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosIngreso('+ingresos[i].id+')">Detalles</button> <button type="button" class="btn btn-danger btn-sm" onclick="anularIngreso('+ingresos[i].id+')">Anular Ingreso</button></td></tr>'
                }else{
                    botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosIngreso('+ingresos[i].id+')">Detalles</button>'
                }

                filaIngreso += '<tr><td>'+ingresos[i].fecha_hora+'</td><td>'+ingresos[i].User.Persona.nombre+'</td><td>'+ingresos[i].tipo_comprobante+': '+ingresos[i].serie_comprobante+':'+ingresos[i].num_comprobante+'</td><td>'+ingresos[i].impuesto+'</td><td>'+ingresos[i].total+'</td><td>'+ingresos[i].estado+'</td><td>'+botones+'</td>'
            }
        }

        $('#listadoIngresos').children('tbody').html(filaIngreso)
    }else{
        $('#listadoIngresos').children('tbody').html('<tr><td colspan="7" class="text-center">No se encontro ningun ingreso.</td></tr>')
    }
}

function agregarIngreso(){
    $('#divFormulario').show('ease') 
    $('#divFormulario .title').text('Registrar Ingreso')
    $('#btnRegistrarIngreso').val('Registrar Ingreso')
    limpiarFormularioIngreso()
}

function cancelarRegistroIngreso(){
    $('#divFormulario').hide('ease')
    limpiarFormularioIngreso()
}

function limpiarFormularioIngreso(){
    $('#idIngreso').val('')
    $('#proveedor').val('')
    $('#tipoComprobante').val('')
    $('#serieComprobante').val('')
    $('#numComprobante').val('')
    $('#productos').val(0)
    $('#cantidad').val('')
    $('#precio').val('')

    $('#productos').parent().show()
    $('#cantidad').parent().show()
    $('#precio').parent().show()
    $('#btnAgregarProducto').parent().show()
    $('#listadoProductos').children('tbody').html('')

    $('#btnRegistrarIngreso').text('Registrar Ingreso')
    $('#divFormulario').children('.title').text('Registrar Ingreso')
}

function registrarIngreso(){
    const proveedor = $('#proveedor').val()
    const tipoComprobante = $('#tipoComprobante').val()
    const serieComprobante = $('#serieComprobante').val()
    const numComprobante = $('#numComprobante').val()
    const producto = $('.producto')
    const cantidad = $('.cantidad')
    const precio = $('.precio')
    const impuesto = $('#impuesto').val()
    const total = $('#total').val()

    let i
    const productos = []
    const cantidades = []
    const precios = []

    for(i = 0; i < producto.length; i++){
        productos.push($(producto[i]).val())
        cantidades.push($(cantidad[i]).val())
        precios.push($(precio[i]).val())
    }

    if(proveedor !== '' && tipoComprobante !== '' && serieComprobante !== '' && numComprobante !== '' && productos.length !== 0 && cantidades.length !== 0 && precios !== 0){
        let datos = {
            "idproveedor": proveedor,
            "tipo_comprobante": tipoComprobante,
            "serie_comprobante": serieComprobante,
            "num_comprobante": numComprobante,
            "articulos": productos,
            "cantidades": cantidades,
            "precios": precios,
            "impuesto": impuesto,
            "total": total
        }
        
        datos = JSON.stringify(datos)
        $.ajax({
            url: urlIngresos+'/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'json',
    
            success: function(respuesta){
                
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Ingreso Registrado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioIngreso()
                    datosIngresos()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Ingreso no se pudo registrar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function listaProveedores(){
    $.ajax({
        url: urlIngresos+'/listaproveedores',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            let opcionesProveedores = ''
            let i
            for(i = 0; i < respuesta.length; i++){
                opcionesProveedores += '<option value="'+respuesta[i].id+'">'+respuesta[i].nombre+'</option>'
            } 
            $('#proveedor').html(opcionesProveedores)  
        }
    })
}

function listaProductos(){
    $.ajax({
        url: urlIngresos+'/listaproductos',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            let opcionesProductos = ''
            let i
            for(i = 0; i < respuesta.length; i++){
                opcionesProductos += '<option value="'+respuesta[i].id+'">'+respuesta[i].nombre+'</option>'
            } 
            $('#productos').html(opcionesProductos)  
        }
    })
}

function agregarProducto(){
    const producto = $('#productos').val()
    const cantidad = $('#cantidad').val()
    const precio = $('#precio').val()

    if(producto !== 0 && cantidad !== '' && precio !== ''){
        $.ajax({
            url: urlIngresos+'/producto/'+producto,
            method: 'GET',
            dataType: 'json',

            success: function(respuesta){

                let filaProducto = '<tr><td><button class="btn btn-warning btn-sm" onclicka="eliminarArticulo('+respuesta.id+')"><span class="fa fa-times"></span></button></td><td><input type="hidden" class="producto" value="'+respuesta.id+'">'+respuesta.codigo+' '+respuesta.nombre+'</td><td><input type="hidden" class="cantidad" value="'+cantidad+'">'+cantidad+'</td><td><input type="hidden" class="precio" value="'+precio+'">'+precio+'</td><td class="subTotal">'+(cantidad*precio).toFixed(2)+'</td></tr>'

                $('#listadoProductos').children('tbody').append(filaProducto)

                if($('.subTotal').length > 0){
                    const subTotal = $('.subTotal')
                    let i 
                    let total = 0
                    let impuesto = 0

                    for(i = 0; i < subTotal.length; i++){
                        total += parseFloat($(subTotal[i]).text())
                    }

                    impuesto = total * 0.16
                    total += impuesto

                    $('#productos').val(1)
                    $('#cantidad').val('')
                    $('#precio').val('')

                    $('#impuesto').val(impuesto.toFixed(2))
                    $('#datoImpuesto').text('Bs/'+impuesto.toFixed(2))
                    $('#total').val(total.toFixed(2))
                    $('#datoTotal').text('Bs/'+total.toFixed(2))
                }
            }
        })
    }
}

function mostrarDatosIngreso(id){
    $.ajax({
        url: urlIngresos+'/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta){

                $('#divFormulario').hide('ease')
                $('#productos').parent().hide()
                $('#cantidad').parent().hide()
                $('#precio').parent().hide()
                $('#btnAgregarProducto').parent().hide()

                $('#proveedor').val(respuesta[0].idproveedor)
                $('#tipoComprobante').val(respuesta[0].tipo_comprobante)
                $('#serieComprobante').val(respuesta[0].serie_comprobante)
                $('#numComprobante').val(respuesta[0].num_comprobante)
                $('#datoImpuesto').text('Bs/'+respuesta[0].impuesto)
                $('#datoTotal').text('Bs/'+respuesta[0].total)

                let i
                let listaProductos

                for(i = 0; i < respuesta.length; i++){
                    const detalle = respuesta[i].DetalleI
                    listaProductos += '<tr><td></td><td>'+detalle.Articulo.codigo+' '+detalle.Articulo.nombre+'</td><td>'+detalle.cantidad+'</td><td>'+detalle.precio+'</td><td>'+(detalle.cantidad*detalle.precio).toFixed(2)+'</td></tr>'
                }

                $('#listadoProductos').children('tbody').html(listaProductos)
                $('#divFormulario').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos del ingreso !!</label>')
            }
        }
    })
}

function anularIngreso(id){
    $.ajax({
        url: urlIngresos+'/anular/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Ingreso Anulado !!</label>')
                setTimeout(function(){
                    $('.alerta').html('')
                },5000)
                datosIngresos()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Ingreso no se pudo anular !!</label>')
            }
        }
    })
}

function buscarIngreso(){
    const ingreso = $('#buscarIngreso').val()

    if(ingreso !== ''){
        $.ajax({
            url: urlIngresos+'/buscar/'+ingreso,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(ingresos){
                $('.alerta-buscador').html('')
                listarIngresos(ingresos)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar !!')
    }
}