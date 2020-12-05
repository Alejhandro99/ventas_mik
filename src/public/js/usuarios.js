const controllerUsuarios = {
    url: 'api/usuarios',
    lsRoles: async () => {
        const request = await fetch(controllerUsuarios.url+`/roles`, {
            method: 'GET'
        })

        const roles = await request.json()

        if(roles !== ''){
            let i
            let optionRol

            if(roles.length > 0){
                for(i = 0; i < roles.length; i++){
                    if(roles[i].id !== 3){
                        optionRol += `
                            <option value = "${roles[i].id}"> ${roles[i].nombre} </option>
                        `
                    } 
                }

                document.querySelector('#rol-usuario').innerHTML = optionRol
            }else{
                document.querySelector('#rol-usuario').innerHTML = '<option>No hay roles</option>'
            }
        }
    },
    obtenerDatosUsuarios: async () => {
        const request = await fetch(controllerUsuarios.url, {
            method: 'GET'
        })

        const usuarios = await request.json()
        return usuarios
    },
    lsUsuarios: usuarios => {
        let i
        document.querySelector('#ls-usuarios').children[1].innerHTML = ''
        if(usuarios.length > 0){
            let filaUsuario
            for(i = 0; i < usuarios.length; i++){
                const tr = document.createElement('tr')
                let botones
    
                if(usuarios[i].User.condicion === 0){
                    botones = `<button type="button" class="btn btn-warning btn-sm" onclick="controllerUsuarios.msUsuario(${usuarios[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-edit" ></i></button> <button type="button" class="btn btn-danger btn-sm" onclick="controllerUsuarios.dsUsuario(${usuarios[i].id})"><i class="fa fa-times"></i></button></td></tr>`
                }else{
                    botones = `<button type="button" class="btn btn-warning btn-sm" onclick="controllerUsuarios.msUsuario(${usuarios[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-success btn-sm" onclick="controllerUsuarios.acUsuario(${usuarios[i].id})"><i class="fa fa-check"></i></button></td></tr>`
                }

                filaUsuario = `
                        <td>${usuarios[i].id}</td>
                        <td>${usuarios[i].nombre}</td>
                        <td>${usuarios[i].telefono}</td>
                        <td>${usuarios[i].email}</td>
                        <td>${usuarios[i].User.usuario}</td>
                        <td>${botones}</td>
                    `
                tr.innerHTML = filaUsuario
                document.querySelector('#ls-usuarios').children[1].append(tr)
            }
        }else{
            document.querySelector('#ls-usuarios').children[1].innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">No se encontro ningún usuario.</td>
                </tr>
            `
        }
    },
    agUsuario: () => {
        controllerUsuarios.lmFrUsuario()
    },
    cnRegistroUsuario: () => {
        controllerUsuarios.lmFrUsuario()
    },
    lmFrUsuario: () => {
        document.querySelector('#id-usuario').value = ''
        document.querySelector('#numero-documento-usuario').value = ''
        document.querySelector('#nombre-usuario').value = ''
        document.querySelector('#telefono-usuario').value = ''
        document.querySelector('#email-usuario').value = ''
        document.querySelector('#direccion-usuario').value = ''
        document.querySelector('#usuario').value = ''
        document.querySelector('#password').value = ''
        document.querySelector('#rol-usuario').value = 2

        document.querySelector('.modal-title').textContent = 'Registrar Usuario'
        document.querySelector('#btn-Rg-Usuario').value = 'Registrar Usuario'
    },
    rgUsuario: async () => {
        const numDocumento = document.querySelector('#numero-documento-usuario').value
        const nombre = document.querySelector('#nombre-usuario').value
        const telefono = document.querySelector('#telefono-usuario').value
        const email = document.querySelector('#email-usuario').value
        const direccion = document.querySelector('#direccion-usuario').value
        const usuario = document.querySelector('#usuario').value
        const password = document.querySelector('#password').value
        const rol = document.querySelector('#rol-usuario').value

        if(numDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== '' && usuario !== '' && password !== '' && rol !== '0'){
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

            const request = await fetch(controllerUsuarios.url+`/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })

            const response = await request.json()

            if(response.message !== ''){
                swal({
                    title: "Usuario Registrado !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerUsuarios.lmFrUsuario()
                    controllerUsuarios.obtenerDatosUsuarios().then(usuarios => {
                        controllerUsuarios.lsUsuarios(usuarios)
                    })
                })
            }
        }else{
            swal({
                title: "Campo Vacío !!",
                icon: "success",
                button: "Aceptar"
            })
        }
    },
    msUsuario: async id => {
        const request = await fetch(controllerUsuarios.url+`/mostrar/${id}`, {
            method: 'GET'
        })
        const usuario = await request.json()

        if(usuario.id !== '') {

            document.querySelector('#id-usuario').value = usuario.id
            document.querySelector('#numero-documento-usuario').value = usuario.num_documento
            document.querySelector('#nombre-usuario').value = usuario.nombre 
            document.querySelector('#telefono-usuario').value = usuario.telefono 
            document.querySelector('#email-usuario').value = usuario.email 
            document.querySelector('#direccion-usuario').value = usuario.direccion
            document.querySelector('#usuario').value = usuario.User.usuario 
            document.querySelector('#password').value = usuario.User.password
            document.querySelector('#rol-usuario').value = usuario.User.idrol 

            document.querySelector('.modal-title').textContent = 'Actualizar Usuario'
            document.querySelector('#btn-Rg-Usuario').value = 'Actualizar Usuario'
        }else{
            swal({
                title: "No se encontraron datos del usuario",
                icon: "danger",
                button: "Aceptar"
            })
        }
    },
    edUsuario: async id => {
        const numDocumento = document.querySelector('#numero-documento-usuario').value
        const nombre = document.querySelector('#nombre-usuario').value
        const telefono = document.querySelector('#telefono-usuario').value
        const email = document.querySelector('#email-usuario').value
        const direccion = document.querySelector('#direccion-usuario').value
        const usuario = document.querySelector('#usuario').value
        const password = document.querySelector('#password').value
        const rol = document.querySelector('#rol-usuario').value
    
        if(numDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== '' && usuario !== '' && password !== '' && rol !== ''){
            const datos = {
                num_documento: numDocumento,
                nombre: nombre,
                telefono: telefono,
                email: email,
                direccion: direccion,
                usuario: usuario,
                password: password,
                idrol: rol
            }
    
            const request = await fetch(controllerUsuarios.url+`/actualizar/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })

            const response = await request.json()
            if(response.message !== ''){
                swal({
                    title: "Usuario Actualizado !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerUsuarios.lmFrUsuario()
                    controllerUsuarios.obtenerDatosUsuarios().then(usuarios => {
                        controllerUsuarios.lsUsuarios(usuarios)
                    })
                })
            }else{
                console.log(response.error)
            }
        }else{
            swal({
                title: "Campo Vacío !!",
                icon: "warning",
                button: "Aceptar"
            })
        }
    },
    dsUsuario: async id => {
        const request = await fetch(controllerUsuarios.url+`/desactivar/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()
        if(response.message !== ''){
            swal({
                title: "Usuario Deshabilitado !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerUsuarios.obtenerDatosUsuarios().then(usuarios => {
                    controllerUsuarios.lsUsuarios(usuarios)
                })
            })
        }
    },
    acUsuario: async id => {
        const request = await fetch(controllerUsuarios.url+`/activar/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()
        if(response.message !== ''){
            swal({
                title: "Usuario Habilitado !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerUsuarios.obtenerDatosUsuarios().then(usuarios => {
                    controllerUsuarios.lsUsuarios(usuarios)
                })
            })
        }
    },
    bsUsuario: async () => {
        const usuario = $('#buscar').val()
        
        const request = await fetch(controllerUsuarios.url+`/buscar/${usuario}`, {
            method: 'GET'
        })

        const usuarios = await request.json()

        if(usuario.id !== ''){
            controllerUsuarios.lsUsuarios(usuarios)
        }else{
           swal({
               title: "Ingrese un dato para buscar",
               icon: "warning",
               button: "Aceptar"
           })
        }
    }
}