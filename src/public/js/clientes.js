const controllerClientes = {
    url: 'api/clientes',
    obtenerDatosClientes: async () => {
        const request = await fetch(controllerClientes.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const clientes = await request.json()
        return clientes
    },
    lsClientes: clientes => {
        let i
        document.querySelector('#ls-clientes').children[1].innerHTML = ''
      
        if(clientes.length > 0){
           
            let filaCliente
            for(i = 0; i < clientes.length; i++){
                const tr = document.createElement('tr')
                let botones
                if(clientes[i].User.condicion === 0){
                    botones = `<button type="button" class="btn btn-warning btn-sm" onclick="controllerClientes.msCliente(${clientes[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-danger btn-sm" onclick="controllerClientes.dsCliente(${clientes[i].id})"><i class="fa fa-times"></i></button>`
                }else{
                    botones = `<button type="button" class="btn btn-warning btn-sm" onclick="controllerClientes.msCliente(${clientes[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-success btn-sm" onclick="controllerClientes.acCliente(${clientes[i].id})"><i class="fa fa-check"></i></button>`
                }

                filaCliente = `
                    <td>${clientes[i].id}</td>
                    <td>${clientes[i].nombre}</td>
                    <td>${clientes[i].telefono}</td>
                    <td>${clientes[i].email}</td>
                    <td>${botones}</td> 
                `
                tr.innerHTML = filaCliente

                document.querySelector('#ls-clientes').children[1].append(tr)
            }
        }else{
            document.querySelector('#ls-clientes').children[1].innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No se encontro ningún cliente.</td>
                </tr>
            `
        }
    },
    agCliente: () => {
        controllerClientes.lmFrCliente()
    },
    cnCliente: () => {
        $('#modalFormulario').modal('hide')
        controllerClientes.lmFrCliente()
    },
    lmFrCliente: () => {
        document.querySelector('#id-cliente').value = ''
        document.querySelector('#numero-documento-cliente').value = ''
        document.querySelector('#nombre-cliente').value = ''
        document.querySelector('#telefono-cliente').value = ''
        document.querySelector('#email-cliente').value = ''
        document.querySelector('#direccion-cliente').value = ''

        document.querySelector('.modal-title').textContent = 'Registrar Cliente'
        document.querySelector('#btn-Rg-Cliente').value = 'Registrar Cliente'
    },
    rgCliente: async () => {
        const numeroDocumento = document.querySelector('#numero-documento-cliente').value
        const nombre = document.querySelector('#nombre-cliente').value
        const telefono = document.querySelector('#telefono-cliente').value
        const email = document.querySelector('#email-cliente').value
        const direccion = document.querySelector('#direccion-cliente').value

        if(numeroDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== ''){
            const datos = {
                num_documento: numeroDocumento,
                nombre: nombre,
                telefono: telefono,
                email: email,
                direccion: direccion
            }

            const request = await fetch(controllerClientes.url+`/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(datos)
            })

            const response = await request.json()

            if(response.message !== ''){
                swal({
                    title: "Cliente Registrado !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerClientes.lmFrCliente()
                    controllerClientes.obtenerDatosClientes().then(clientes => {
                        controllerClientes.lsClientes(clientes)
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
    msCliente: async id => {
        const request = await fetch(controllerClientes.url+`/mostrar/${id}`, {
            method: 'GET'
        })

        const cliente = await request.json()

        if(cliente !== ''){
            document.querySelector('#id-cliente').value = cliente.id
            document.querySelector('#numero-documento-cliente').value = cliente.num_documento
            document.querySelector('#nombre-cliente').value = cliente.nombre 
            document.querySelector('#telefono-cliente').value = cliente.telefono 
            document.querySelector('#email-cliente').value = cliente.email 
            document.querySelector('#direccion-cliente').value = cliente.direccion 

            document.querySelector('.modal-title').textContent = 'Actualizar Cliente'
            document.querySelector('#btn-Rg-Cliente').value = 'Actualizar Cliente'
        }else{
            swal({
                title: "No se encontraron datos del cliente",
                icon: "danger",
                button: "Aceptar"
            })
        }
    },
    edCliente: async id => {
        const numeroDocumento = document.querySelector('#numero-documento-cliente').value
        const nombre = document.querySelector('#nombre-cliente').value
        const telefono = document.querySelector('#telefono-cliente').value
        const email = document.querySelector('#email-cliente').value
        const direccion = document.querySelector('#direccion-cliente').value

        if(numeroDocumento !== '' && nombre !== '' && telefono !== '' && email !== '' && direccion !== ''){
            const datos = {
                num_documento: numeroDocumento,
                nombre: nombre,
                telefono: telefono,
                email: email,
                direccion: direccion
            }

            const request = await fetch(controllerClientes.url+`/actualizar/${id}`, {
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
                    title: "Cliente Actualizado !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerClientes.lmFrCliente()
                    controllerClientes.obtenerDatosClientes().then(clientes => {
                        controllerClientes.lsClientes(clientes)
                    })
                })
            }
        }else{
            swal({
                title: "Campo Vacío !!",
                icon: "danger",
                button: "Aceptar"
            })
        }
    },
    dsCliente: async id => {
        const request = await fetch(controllerClientes.url+`/desactivar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()
        if(response !== ''){
            swal({
                title: "Cliente Deshabilitado !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                $('#modalFormulario').modal('hide')
                controllerClientes.obtenerDatosClientes().then(clientes => {
                    controllerClientes.lsClientes(clientes)
                })
            })
        }
    },
    acCliente: async id => {
        const request = await fetch(controllerClientes.url+`/activar/${id}`, {
            method: 'PATCH',
        })

        const response = await request.json()
        if(response !== ''){
            swal({
                title: "Cliente Habilitado !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                $('#modalFormulario').modal('hide')
                controllerClientes.obtenerDatosClientes().then(clientes => {
                    controllerClientes.lsClientes(clientes)
                })
            })
        }
    },
    bsCliente: async () => {
        const cliente = document.querySelector('#buscar').value
        
        if(cliente !== ''){
            const request = await fetch(controllerClientes.url+`/buscar/${cliente}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const clientes = await request.json()

            controllerClientes.lsClientes(clientes)
        }else{
            swal({
                title: "Ingrese un dato para buscar !!",
                icon: "warning",
                button: "Aceptar"
            })
        }
    }
}