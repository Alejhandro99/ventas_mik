const controllerArticulos = {
    url: 'api/articulos',
    llenarCategorias: async () => {
        const request = await fetch(controllerCategorias.url+`/lista-categorias`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
    
        const categorias = await request.json()
        
        if(categorias.length > 0){
            let optionCategoria = '<option value="0"> Categoria </option>'
            for(let i = 0; i < categorias.length; i++){
                optionCategoria += `<option value="${categorias[i].id}"> ${categorias[i].nombre}</option>`
            }

            document.querySelector('#categoria-articulo').innerHTML = optionCategoria
        }else{
            document.querySelector('#categoria-articulo').innerHTML  = '<option value="0"> No hay Categorías </option>'
        }
    },
    obtenerDatosArticulos: async () => {
        const request = await fetch(controllerArticulos.url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })

        const articulos = await request.json()
        return articulos
    },
    lsArticulos: (articulos) => {
        document.querySelector('#ls-articulos').children[1].innerHTML = ''
        if(articulos.length > 0){
            let filaArticulo
            for(let i = 0; i < articulos.length; i++){
                const tr = document.createElement('tr')

                let botones
                let condicion
                if(articulos[i].condicion === 0){
                    botones = `
                        <button type="button" class="btn btn-warning btn-sm" onclick="controllerArticulos.msArticulo(${articulos[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-danger btn-sm" onclick="controllerArticulos.dsArticulo(${articulos[i].id})"><i class="fa fa-times"></i></button>`
                    condicion = 'A'
                }else{
                    botones = `
                        <button type="button" class="btn btn-warning btn-sm" onclick="controllerArticulos.msArticulo(${articulos[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-edit"></i>
                        </button> 
                        <button type="button" class="btn btn-success btn-sm" onclick="controllerArticulos.acArticulo(${articulos[i].id})"><i class="fa fa-check"></i></button>
                        `
                    condicion = 'I'
                }
    
                filaArticulo = `
                    <td>${articulos[i].id}</td>
                    <td>${articulos[i].Categoria.nombre}</td>
                    <td>${articulos[i].nombre}</td>
                    <td>${articulos[i].codigo}</td>
                    <td>${articulos[i].stock}</td>
                    <td>${condicion}</td>
                    <td>${botones}</td>
                `

                tr.innerHTML = filaArticulo
                document.querySelector('#ls-articulos').children[1].append(tr)
            }

        }else{
            document.querySelector('#ls-articulos').children[1].innerHTML= `
                <tr>
                    <td colspan="7" class="text-center">
                    No se encontro ningún producto.
                    </td>
                </tr>
            `
        }
    },
    agArticulo: () => { 
        controllerArticulos.lmFrArticulo()
    },
    cnRgArticulo: () => {
        $('#modalFormulario').modal('hide')
        controllerArticulos.lmFrArticulo()
    },
    lmFrArticulo: () => {
        document.querySelector('#id-articulo').value = ''
        document.querySelector('#categoria-articulo').value = 0
        document.querySelector('#nombre-articulo').value = ''
        document.querySelector('#codigo-articulo').value = ''
        document.querySelector('#precio-venta-articulo').value = ''
        document.querySelector('#stock-articulo').value = ''
        document.querySelector('#descripcion-articulo').value = ''

        document.querySelector('.modal-title').textContent = 'Registrar Articulo'
        document.querySelector('#btn-Rg-Articulo').textContent = 'Registrar Articulo'
    },
    rgArticulo: async () => {
        const categoria = document.querySelector('#categoria-articulo').value
        const nombre = document.querySelector('#nombre-articulo').value
        const codigo = document.querySelector('#codigo-articulo').value
        const pventa = document.querySelector('#precio-venta-articulo').value
        const stock = document.querySelector('#stock-articulo').value
        const descripcion = document.querySelector('#descripcion-articulo').value
    
        if(categoria !== '0' && nombre !== '' && codigo !== '' && pventa !== '' && stock !== '' && descripcion !== ''){
            const datos = {
                categoria: categoria,
                nombre: nombre,
                codigo: codigo,
                precio_venta: pventa,
                stock: stock,
                descripcion: descripcion
            }

            const request = await fetch(controllerArticulos.url+`/registrar`,
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
                    title: "Articulo Registrado !!",
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerArticulos.lmFrArticulo()
                    controllerArticulos.obtenerDatosArticulos().then(articulos => {
                        controllerArticulos.lsArticulos(articulos)
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
    msArticulo: async id => {

        const request = await fetch(controllerArticulos.url+`/mostrar/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const articulo = await request.json()

        if(articulo !== ''){
            document.querySelector('#id-articulo').value = articulo.id
            document.querySelector('#categoria-articulo').value = articulo.idcategoria
            document.querySelector('#nombre-articulo').value = articulo.nombre
            document.querySelector('#codigo-articulo').value = articulo.codigo
            document.querySelector('#precio-venta-articulo').value = articulo.precio_venta
            document.querySelector('#stock-articulo').value = articulo.stock
            document.querySelector('#descripcion-articulo').value = articulo.descripcion

            document.querySelector('.modal-title').textContent = 'Actualizar Articulo'
            document.querySelector('#btn-Rg-Articulo').value = 'Actualizar Articulo'
        }else{
            swal({
                title: "No se encontraron datos del articulo !!",
                icon: "danger",
                button: "Aceptar"
            })
        }
    },
    edArticulo: async id => {
        const categoria = document.querySelector('#categoria-articulo').value
        const nombre = document.querySelector('#nombre-articulo').value
        const codigo = document.querySelector('#codigo-articulo').value
        const pventa = document.querySelector('#precio-venta-articulo').value
        const stock = document.querySelector('#stock-articulo').value
        const descripcion = document.querySelector('#descripcion-articulo').value
    
        if(categoria !== '0' && nombre !== '' && codigo !== '' && pventa !== '' && stock !== '' && descripcion !== ''){
            const datos = {
                categoria: categoria,
                nombre: nombre,
                codigo: codigo,
                precio_venta: pventa,
                stock: stock,
                descripcion: descripcion
            }

            const request = await fetch(controllerArticulos.url+`/actualizar/${id}`, {
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
                    title: "Articulo Actualizado !!",
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerArticulos.lmFrArticulo()
                    controllerArticulos.obtenerDatosArticulos().then(articulos => {
                        controllerArticulos.lsArticulos(articulos)
                    })
                })
            }else{
                swal({
                    title: "Articulo no se pudo actualizar !!",
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

    dsArticulo: async id => {
        const request = await fetch(controllerArticulos.url+`/desactivar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()

        if(response.message !== ''){
            swal({
                title: "Articulo Deshabilitado !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerArticulos.obtenerDatosArticulos().then(articulos => {
                    controllerArticulos.lsArticulos(articulos)
                })
            })
        }else{
            swal({
                title: "Articulo no se pudo deshabilitar !!",
                icon: "success",
                button: "Aceptar"
            })
        }
    },
    acArticulo: async id => {
        const request = await fetch(controllerArticulos.url+`/activar/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()

        if(response.message !== ''){
            swal({
                title: "Articulo Habilitado !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerArticulos.obtenerDatosArticulos().then(articulos => {
                    controllerArticulos.lsArticulos(articulos)
                })
            })
        }else{
            swal({
                title: "Articulo no se pudo habilitar !!",
                icon: "success",
                button: "Aceptar"
            })
        }
    },

    bsArticulo: async() => {
        const articulo = document.querySelector('#buscar').value
        
        if(articulo !== ''){
            const request = await fetch(controllerArticulos.url+`/buscar/${articulo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const articulos = await request.json()
            controllerArticulos.lsArticulos(articulos)
        }else{
            swal({
                title: "Ingrese un dato para buscar !!",
                icon: "warning",
                button: "Aceptar"
            })
        }
    }
}