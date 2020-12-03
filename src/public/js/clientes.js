const urlProveedores = 'api-proveedores'

function datosProveedores(){
    $.ajax({
        url: urlProveedores,
        method: 'GET',
        dataType: 'json',

        success: function(proveedores){
            listarProveedores(proveedores)
        },
    })
}

function listarProveedores(proveedores){
    let i
    $('#listadoProveedores').children('tbody').html('')
    if(proveedores.length > 0){
        let filaProveedor
        for(i = 0; i < proveedores.length; i++){
            let botones
            if(proveedores[i].User.condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosProveedor('+proveedores[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="desactivarProveedor('+proveedores[i].id+')">Eliminar</button></td></tr>'
                condicion = 'A'
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosProveedor('+proveedores[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="activarProveedor('+proveedores[i].id+')">Restaurar</button></td></tr>'
                condicion = 'I'
            }

            filaProveedor += '<tr><td>'+proveedores[i].id+'</td><td>'+proveedores[i].nombre+'</td><td>'+proveedores[i].telefono+'</td><td>'+proveedores[i].email+'</td><td>'+botones+'</td>'
        }

        $('#listadoProveedores').children('tbody').html(filaProveedor)
    }else{
        $('#listadoProveedores').children('tbody').html('<tr><td colspan="5" class="text-center">No se encontro ningun proveedor.</td></tr>')
    }
}

function agregarProveedor(){
    $('#divFormulario').show('ease') 
    $('#divFormulario .title').text('Registrar Proveedor')
    $('#btnRegistrarProveedor').val('Registrar Proveedor')
    limpiarFormularioProveedor()
}

function cancelarRegistroProveedor(){
    $('#divFormulario').hide('ease')
    limpiarFormularioProveedor()
}

function limpiarFormularioProveedor(){
    $('#idProveedor').val('')
    $('#numeroDocumentoProveedor').val('')
    $('#nombreProveedor').val('')
    $('#telefonoProveedor').val('')
    $('#emailProveedor').val('')
    $('#direccionProveedor').val('')
}

function registrarProveedor(){
    const numDocumento = $('#numeroDocumentoProveedor').val()
    const nombre = $('#nombreProveedor').val()
    const telefono = $('#telefonoProveedor').val()
    const email = $('#emailProveedor').val()
    const direccion = $('#direccionProveedor').val()

    if(numDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== ''){
        const datos = {
            num_documento: numDocumento,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }
    
        $.ajax({
            url: urlProveedores+'/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Proveedor Registrado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioProveedor()
                    datosProveedores()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Proveedor no se pudo registrar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function mostrarDatosProveedor(id){
    $.ajax({
        url: urlProveedores+'/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta){
                $('#divFormulario').hide('ease')
                $('#idProveedor').val(respuesta.id)
                $('#numeroDocumentoProveedor').val(respuesta.num_documento)
                $('#nombreProveedor').val(respuesta.nombre)
                $('#telefonoProveedor').val(respuesta.telefono)
                $('#emailProveedor').val(respuesta.email)
                $('#direccionProveedor').val(respuesta.direccion)

                $('#divFormulario .title').text('Actualizar Proveedor')
                $('#btnRegistrarProveedor').val('Actualizar Proveedor')
                $('#divFormulario').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos del proveedor !!</label>')
            }
        }
    })
}

function editarProveedor(){

    const id = $('#idProveedor').val()
    const numDocumento = $('#numeroDocumentoProveedor').val()
    const nombre = $('#nombreProveedor').val()
    const telefono = $('#telefonoProveedor').val()
    const email = $('#emailProveedor').val()
    const direccion = $('#direccionProveedor').val()

    if(id !== '' && numDocumento !== '0' && nombre !== '' && telefono !== '' && email !== '' && direccion !== ''){
        const datos = {
            id: id,
            num_documento: numDocumento,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion
        }

        $.ajax({
            url: urlProveedores+'/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
            
            beforeSend: function(){
                console.log('Enviando, y esperando')
            },
            success: function(respuesta){
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Proveedor Actualizado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioProveedor()
                    datosProveedores()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Proveedor no se pudo actualizar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function desactivarProveedor(id){
    $.ajax({
        url: urlProveedores+'/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Proveedor Desactivar !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                datosProveedores()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Proveedor no se pudo desactivar !!</label>')
            }
        }
    })
}

function activarProveedor(id){
    $.ajax({
        url: urlProveedores+'/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Proveedor Activado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                datosProveedores()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Proveedor no se pudo activar !!</label>')
            }
        }
    })
}

function buscarProveedor(){
    const proveedor = $('#buscarProveedor').val()

    if(proveedor !== ''){
        $.ajax({
            url: urlProveedores+'/buscar/'+proveedor,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(proveedores){
                console.log(proveedores)
                $('.alerta-buscador').html('')
                listarProveedores(proveedores)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar !!')
    }
}