const controllerCategorias = {
    url: 'api/categorias',
    obtenerDatosCategorias: async () => {
        const request = await fetch(controllerCategorias.url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })

        const categorias = await request.json()
        return categorias
    },
    lsCategorias: (categorias) => {

        let i
        document.querySelector('#ls-categorias').children[1].innerHTML = ''
        if(categorias.length > 0){
            let filaCategoria
            for(i = 0; i < categorias.length; i++){
                const tr = document.createElement('tr')

                let botones
                if(categorias[i].condicion === 0){
                    botones = `
                        <button type="button" class="btn btn-warning btn-sm" onclick="controllerCategorias.msCategoria(${categorias[i].id})"><i class="fa fa-edit"></i></button> 
                        <button type="button" class="btn btn-danger btn-sm" onclick="controllerCategorias.dsCategoria(${categorias[i].id})"><i class="fa fa-times"></i></button>
                    `
                }else{
                    botones = `
                        <button type="button" class="btn btn-warning btn-sm" onclick="controllerCategorias.msCategoria(${categorias[i].id})"><i class="fa fa-edit"></i></button> 
                        <button type="button" class="btn btn-success btn-sm" onclick="controllerCategorias.acCategoria(${categorias[i].id})"><i class="fa fa-check"></i></button>
                        `
                }
    
                filaCategoria = `
                    <td>${categorias[i].id}</td>
                    <td>${categorias[i].nombre}</td>
                    <td>${categorias[i].descripcion}</td>
                    <td>${botones}</td>
                    `

                tr.innerHTML = filaCategoria
                document.querySelector('#ls-categorias').children[1].append(tr)
            }

        }else{
            document.querySelector('#ls-categorias').children[1].innerHTML= `
            <tr>
                <td colspan="7" class="text-center">
                    No se encontron ninguna categoría.
                </td>
            </tr>`
        }
    },
    agCategoria: () => { 
        controllerCategorias.lmFrCategoria()
    },
    cnRgCategoria: () => {
        $('#modalFormulario').modal('hide')
        lmFrCategoria()
    },
    lmFrCategoria: () => {
        document.querySelector('#id-categoria').value = ''
        document.querySelector('#nombre-categoria').value = ''
        document.querySelector('#descripcion-categoria').value = ''

        document.querySelector('.modal-title').textContent = 'Registrar Categoría'
        document.querySelector('#btn-Rg-Categoria').textContent = 'Registrar Categoría'
    },
    rgCategoria: async () => {
        const nombre = document.querySelector('#nombre-categoria').value
        const descripcion = document.querySelector('#descripcion-categoria').value
    
        if( nombre !== '' && descripcion !== ''){
            const datos = {
                nombre: nombre,
                descripcion: descripcion
            }

            const request = await fetch(controllerCategorias.url+`/registrar`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
        
            const response = await request.json()

            if(response.message !== ''){
                swal({
                    title: "Categoría Registrada !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerCategorias.lmFrCategoria()
                    controllerCategorias.obtenerDatosCategorias().then(categorias => {
                        controllerCategorias.lsCategorias(categorias)
                    })
                })
            }
                   
        }else{
            swal({
                title: "Campo Vacío !!",
                icon: "warning",
                button: "Aceptar"
            })
        }
    },
    msCategoria: async id => {

        const request = await fetch(controllerCategorias.url+`/mostrar/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()

        if(response.message !== ''){
            document.querySelector('#id-categoria').value = response.id
            document.querySelector('#nombre-categoria').value = response.nombre
            document.querySelector('#descripcion-categoria').value = response.descripcion

            document.querySelector('.modal-title').textContent = 'Actualizar Categoría'
            document.querySelector('#btn-Rg-Categoria').value = 'Actualizar Categoría'

            $('#modalFormulario').modal('show')
        }else{
            swal({
                title: "No se encontraron datos de la categoría !!",
                icon: "danger",
                button: "Aceptar"
            })
        }
    },
    edCategoria: async id => {
        const nombre = document.querySelector('#nombre-categoria').value
        const descripcion = document.querySelector('#descripcion-categoria').value
    
        if(nombre !== '' && descripcion !== ''){
            const datos = {
                nombre: nombre,
                descripcion: descripcion
            }

            const request = await fetch(controllerCategorias.url+`/actualizar/${id}`, {
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
                    title: "Categoría Actualizado !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerCategorias.lmFrCategoria()
                    controllerCategorias.obtenerDatosCategorias().then(categorias => {
                        controllerCategorias.lsCategorias(categorias)
                    })
                })
            }else{
                swal({
                    title: "Categoría no se pudo actualizar !!",
                    icon: "success",
                    button: "Aceptar"
                })
            }
        }else{
            swal({
                title: "Campo Vacío !!",
                icon: "warning",
                button: "Aceptar"
            })
        }
    }, 

    dsCategoria: async id => {
        const request = await fetch(controllerCategorias.url+`/desactivar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()

        if(response.message !== ''){
            swal({
                title: "Categoría Desactivada !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerCategorias.obtenerDatosCategorias().then(categorias => {
                    controllerCategorias.lsCategorias(categorias)
                })
            })
        }
    },
    acCategoria: async id => {
        const request = await fetch(controllerCategorias.url+`/activar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()

        if(response.message !== ''){
            swal({
                title: "Categoría Activada !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerCategorias.obtenerDatosCategorias().then(categorias => {
                    controllerCategorias.lsCategorias(categorias)
                })
            })
        }
    },

    bsCategoria: async() => {
        const categoria = document.querySelector('#buscar').value
        
        if(categoria !== ''){
            const request = await fetch(controllerCategorias.url+`/buscar/${categoria}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const categorias = await request.json()
            controllerCategorias.lsCategorias(categorias)
        }else{
            swal({
                title: "Ingrese un dato para buscar !!",
                icon: "warning",
                button: "Aceptar"
            })
        }
    }
}