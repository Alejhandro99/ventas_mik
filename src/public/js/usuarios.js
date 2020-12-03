const urlUsuarios = 'api-usuarios'

function datosUsuarios(){
    $.ajax({
        url: urlUsuarios,
        method: 'GET',
        dataType: 'json',

        success: function(usuarios){
            listarUsuarios(usuarios)
        },
    })
}

function listarUsuarios(usuarios){
    let i
    $('#listadoUsuarios').children('tbody').html('')
    if(usuarios.length > 0){
        let filaUsuario
        for(i = 0; i < usuarios.length; i++){
            let botones
            if(usuarios[i].User.condicion === 0){
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosUsuario('+usuarios[i].id+')">Editar</button> <button type="button" class="btn btn-danger btn-sm" onclick="desactivarUsuario('+usuarios[i].id+')">Eliminar</button></td></tr>'
                condicion = 'A'
            }else{
                botones = '<button type="button" class="btn btn-warning btn-sm" onclick="mostrarDatosUsuario('+usuarios[i].id+')">Editar</button> <button type="button" class="btn btn-success btn-sm" onclick="activarUsuario('+usuarios[i].id+')">Restaurar</button></td></tr>'
                condicion = 'I'
            }

            filaUsuario += '<tr><td>'+usuarios[i].id+'</td><td>'+usuarios[i].nombre+'</td><td>'+usuarios[i].telefono+'</td><td>'+usuarios[i].email+'</td><td>'+usuarios[i].User.usuario+'</td><td>'+botones+'</td>'
        }

        $('#listadoUsuarios').children('tbody').html(filaUsuario)
    }else{
        $('#listadoUsuarios').children('tbody').html('<tr><td colspan="6" class="text-center">No se encontro ningun usuario.</td></tr>')
    }
}

function agregarUsuario(){
    $('#divFormulario').show('ease') 
    $('#divFormulario .title').text('Registrar Usuario')
    $('#btnRegistrarUsuario').val('Registrar Usuario')
    limpiarFormularioUsuario()
}

function cancelarRegistroUsuario(){
    $('#divFormulario').hide('ease')
    limpiarFormularioUsuario()
}

function limpiarFormularioUsuario(){
    $('#idUsuario').val('')
    $('#numeroDocumentoUsuario').val('')
    $('#nombreUsuario').val('')
    $('#telefonoUsuario').val('')
    $('#emailUsuario').val('')
    $('#direccionUsuario').val('')
    $('#usuario').val('')
    $('#password').val('')
    $('#rolUsuario').val(2)
}

function registrarUsuario(){
    const numDocumento = $('#numeroDocumentoUsuario').val()
    const nombre = $('#nombreUsuario').val()
    const telefono = $('#telefonoUsuario').val()
    const email = $('#emailUsuario').val()
    const direccion = $('#direccionUsuario').val()
    const usuario = $('#usuario').val()
    const password = $('#password').val()
    const rol = $('#rolUsuario').val()

    if(numDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== '' && usuario !== '' && password !== '' && rol !== ''){
        const datos = {
            num_documento: numDocumento,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario: usuario,
            password: password,
            rol: rol
        }
    
        $.ajax({
            url: urlUsuarios+'/registrar',
            method: 'POST',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(respuesta){
                
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Usuario Registrado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioUsuario()
                    datosUsuarios()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Usuario no se pudo registrar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function listaRoles(){
    $.ajax({
        url: urlUsuarios+'/roles',
        method: 'GET',
        dataType: 'json',

        success: function(respuesta){
            let opcionesRoles
            let i
            for(i = 0; i < respuesta.length; i++){
                opcionesRoles += '<option value="'+respuesta[i].id+'">'+respuesta[i].nombre+'</option>'
            } 
            $('#rolUsuario').html(opcionesRoles)  
        }
    })
}

function mostrarDatosUsuario(id){
    $.ajax({
        url: urlUsuarios+'/mostrar/'+id,
        method: 'GET',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta){
                $('#divFormulario').hide('ease')
                $('#idUsuario').val(respuesta.id)
                $('#numeroDocumentoUsuario').val(respuesta.num_documento)
                $('#nombreUsuario').val(respuesta.nombre)
                $('#telefonoUsuario').val(respuesta.telefono)
                $('#emailUsuario').val(respuesta.email)
                $('#direccionUsuario').val(respuesta.direccion)
                $('#usuario').val(respuesta.User.usuario)
                $('#password').val(respuesta.User.password)
                $('#rolUsuario').val(respuesta.User.idrol)

                $('#divFormulario .title').text('Actualizar Usuario')
                $('#btnRegistrarUsuario').val('Actualizar Usuario')
                $('#divFormulario').show('ease')
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> No se encontraron datos del usuario !!</label>')
            }
        }
    })
}

function editarUsuario(){

    const id = $('#idUsuario').val()
    const numDocumento = $('#numeroDocumentoUsuario').val()
    const nombre = $('#nombreUsuario').val()
    const telefono = $('#telefonoUsuario').val()
    const email = $('#emailUsuario').val()
    const direccion = $('#direccionUsuario').val()
    const usuario = $('#usuario').val()
    const password = $('#password').val()
    const rol = $('#rolUsuario').val()

    if(numDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== '' && usuario !== '' && password !== '' && rol !== ''){
        const datos = {
            id: id,
            num_documento: numDocumento,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
            usuario: usuario,
            password: password,
            rol: rol
        }

        $.ajax({
            url: urlUsuarios+'/actualizar/'+id,
            method: 'PATCH',
            data: datos,
            accepts: 'application/json',
            dataType: 'json',
            
            success: function(respuesta){
            
                if(respuesta.status){
                    $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Usuario Actualizado !!</label>')
                    setTimeout(function(){
                        $('.alerta').html('')
                    },5000)
                    $('.alertas-formulario').html('')
                    $('#divFormulario').hide()
                    limpiarFormularioUsuario()
                    datosUsuarios()
                }else{
                    $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Usuario no se pudo actualizar !!</label>')
                }
            }
        })
    }else{
        $('.alertas-formulario').html('<span class="text-danger"> <i class="fa fa-times"></i> Campo(s) Vacío !!</span>')
    }
}

function desactivarUsuario(id){
    $.ajax({
        url: urlUsuarios+'/desactivar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Usuario Desactivado !!</label>')
                setTimeout(function(){
                    $('.alerta').html('')
                },5000)
                datosUsuarios()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Usuario no se pudo desactivar !!</label>')
            }
        }
    })
}

function activarUsuario(id){
    $.ajax({
        url: urlUsuarios+'/activar/'+id,
        method: 'PATCH',
        accepts: 'application/json',
        dataType: 'json',

        success: function(respuesta){
            if(respuesta.status){
                $('.alerta').html('<label class="text-success"> <i class="fa fa-check"></i> Usuario Activado !!</label>')
                setTimeout(function(){
                    $('.alerta').html('')
                },5000)
                datosUsuarios()
            }else{
                $('.alertas').html('<label class="text-danger"> <i class="fa fa-times"></i> Usuario no se pudo activar !!</label>')
            }
        }
    })
}

function buscarUsuario(){
    const usuario = $('#buscarUsuario').val()

    if(usuario !== ''){
        $.ajax({
            url: urlUsuarios+'/buscar/'+usuario,
            method: 'GET',
            accepts: 'application/json',
            dataType: 'json',
    
            success: function(usuarios){
                $('.alerta-buscador').html('')
                listarUsuarios(usuarios)
            }
        })
    }else{
        $('.alerta-buscador').html('<i class="fa fa-times"> Ingrese un dato para buscar !!')
    }
}