const controllerVentas = {
    url: 'api/ventas',
    lsCliente: async () => {
        const request = await fetch(controllerVentas.url+`/listaclientes`,{
            method: 'GET'
        })
        const clientes = await request.json()
        
        if(clientes.length > 0){
            let optionCliente
            let i
            for(i = 0; i < clientes.length; i++){
                optionCliente += `
                    <option value = "${clientes[i].id}"> ${clientes[i].nombre} </option>
                `
            }

            document.querySelector('#cliente').innerHTML = optionCliente
        }else{
            document.querySelector('#cliente').innerHTML = '<option value = "0"> No hay clientes </option>'
        }
    },
    obtenerDatosVentas: async () => {
        const request = await fetch(controllerVentas.url,{
            method: 'GET'
        })
        const ventas = await request.json()
        return ventas
    },
    lsVentas: ventas => {
        document.querySelector('#ls-ventas').children[1].innerHTML = ''
        if(ventas.length > 0){
            let filaVenta
            for(let i = 0; i < ventas.length; i++){
                let botones

                if(ventas[i].User !== null){
                    const tr = document.createElement('tr')
                    if(ventas[i].estado === 'Aprobado'){
                        botones = `
                            <button type="button" class="btn btn-info btn-sm" onclick="controllerVentas.msVenta(${ventas[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-eye"></i></button> 
                            <button type="button" class="btn btn-danger btn-sm" onclick="controllerVentas.anVenta(${ventas[i].id})">Anular Ingreso</button></td>
                        `
                    }else{
                        botones = `<button type="button" class="btn btn-info btn-sm" onclick="controllerVentas.msVenta(${ventas[i].id})" data-toggle="modal" data-target="#modalFormulario"><i class="fa fa-eye"></button>`
                    }

                    filaVenta = `
                        <td>${ventas[i].fecha_hora}</td>
                        <td>${ventas[i].User.Persona.nombre}</td>
                        <td>${ventas[i].tipo_comprobante}: ${ventas[i].serie_comprobante}:${ventas[i].num_comprobante}</td>
                        <td>${ventas[i].impuesto}</td>
                        <td>${ventas[i].total}</td>
                        <td>${ventas[i].estado}</td>
                        <td>${botones}</td>`

                    tr.innerHTML = filaVenta
                    document.querySelector('#ls-ventas').children[1].append(tr)
                }
            }
        }else{
            document.querySelector('#ls-ventas').children[1].innerHTML = '<tr><td colspan="7" class="text-center">No se encontro ninguna venta.</td></tr>'
        }
    },
    agVenta: () => {
        controllerVentas.lmFrVenta()
    },
    cnRgVenta: () => {
        controllerVentas.lmFrVenta()
    },
    lmFrVenta: () => {
        document.querySelector('#cliente').value = ''
        document.querySelector('#tipo-comprobante').value = ''
        document.querySelector('#serie-comprobante').value = ''
        document.querySelector('#numero-comprobante').value = ''
        document.querySelector('#producto').value = 0
        document.querySelector('#cantidad-producto').value = ''
        document.querySelector('#precio-producto').value = ''
    
        document.querySelector('#producto').parentElement.style.display = 'block'
        document.querySelector('#cantidad-producto').parentElement.style.display = 'block'
        document.querySelector('#precio-producto').parentElement.style.display = 'block'
        document.querySelector('#btn-Ag-Producto').parentElement.style.display = 'block'
        document.querySelector('#btn-Rg-Venta').style.display = 'inline-block'

        document.querySelector('#ls-productos').children[1].innerHTML = ''
        
        document.querySelector('.modal-title').textContent = 'Registrar Venta'
        document.querySelector('#btn-Rg-Venta').value = 'Registrar Venta'
    },
    rgVenta: async () => {
        const cliente = document.querySelector('#cliente').value
        const tipoComprobante = document.querySelector('#tipo-comprobante').value
        const serieComprobante = document.querySelector('#serie-comprobante').value
        const numComprobante = document.querySelector('#numero-comprobante').value
        const producto = document.querySelectorAll('.producto')
        const cantidad = document.querySelectorAll('.cantidad')
        const precio = document.querySelectorAll('.precio')
        const impuesto = document.querySelector('#impuesto').value
        const total = document.querySelector('#total').value

        let i
        const productos = []
        const cantidades = []
        const precios = []

        for(i = 0; i < producto.length; i++){
            productos.push(producto[i].value)
            cantidades.push(cantidad[i].value)
            precios.push(precio[i].value)
        }

        if(cliente !== '' && tipoComprobante !== '' && serieComprobante !== '' && numComprobante !== '' && productos.length !== 0 && cantidades.length !== 0 && precios !== 0){
            let datos = {
                "idcliente": cliente,
                "tipo_comprobante": tipoComprobante,
                "serie_comprobante": serieComprobante,
                "num_comprobante": numComprobante,
                "articulos": productos,
                "cantidades": cantidades,
                "precios": precios,
                "impuesto": impuesto,
                "total": total
            }
            
            const request = await fetch(controllerVentas.url+`/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            const response = await request.json()

            if(response.message !== ''){
                swal({
                    title: "Venta Registrada !!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Aceptar"
                }).then(() => {
                    $('#modalFormulario').modal('hide')
                    controllerVentas.lmFrVenta()
                    controllerVentas.obtenerDatosVentas().then(ventas => {
                        controllerVentas.lsVentas(ventas)
                    })
                })
            }else{
                swal({
                    title: "Venta no se puedo registrar !!",
                    icon: "danger",
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
    lsProductos: async () => {
        const request = await fetch(controllerVentas.url+`/listaproductos`, {
            method: 'GET'
        })
        const productos = await request.json()
        if(productos.length > 0){
            let optionProducto 
            let i
            for(i = 0; i < productos.length; i++){
                optionProducto += `
                    <option value = "${productos[i].id}"> ${productos[i].nombre} </option>
                `
            }
            document.querySelector('#producto').innerHTML = optionProducto
        }else{
            document.querySelector('#producto').innerHTML = `<option value = "0"> No hay producto </option>`
        }
    },
    agProducto: async () => {
        const idproducto = document.querySelector('#producto').value
        const cantidad = document.querySelector('#cantidad-producto').value
        const precio = document.querySelector('#precio-producto').value

        if(idproducto !== 0 && cantidad !== '' && precio !== ''){
            const request = await fetch(controllerVentas.url+`/producto/${idproducto}`)
            
            const producto = await request.json()

            if(producto.id !== ''){
                const tr = document.createElement('tr')
                let filaProducto = `
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" onclick="controllerVentas.elProducto(this)"><span class="fa fa-times"></span></button>
                    </td>
                    <td>
                        <input type="hidden" class="producto" value="${producto.id}">${producto.codigo} ${producto.nombre}
                    </td>
                    <td>
                        <input type="hidden" class="cantidad" value="${cantidad}">${cantidad}</td>
                    <td>
                        <input type="hidden" class="precio" value="${precio}">${precio}
                    </td>
                    <td class="sub-total">
                        ${(cantidad*precio).toFixed(2)}
                    </td>
                    `
                tr.innerHTML = filaProducto
                document.querySelector('#ls-productos').children[1].append(tr)

                controllerVentas.calcularSubtotales()
            }else{
                swal({
                    title: "No se encontro el producto seleccionado !!",
                    icon: "danger",
                    button: "Aceptar"
                })
            }
        }
    },
    elProducto: boton => {
        const tr = boton.parentElement.parentElement
        document.querySelector('#ls-productos').children[1].removeChild(tr)
        controllerVentas.calcularSubtotales()
    },
    calcularSubtotales: () => {
        if(document.querySelectorAll('.sub-total').length > 0){
            const subTotal = document.querySelectorAll('.sub-total')
            let i 
            let total = 0
            let impuesto = 0

            for(i = 0; i < subTotal.length; i++){
                total += parseFloat(subTotal[i].textContent)
            }

            impuesto = total * 0.16
            total += impuesto

            document.querySelector('#producto').value = 1
            document.querySelector('#cantidad-producto').value = ''
            document.querySelector('#precio-producto').value = ''

            document.querySelector('#impuesto').value = impuesto.toFixed(2)
            document.querySelector('#label-impuesto').textContent = `Bs/${impuesto.toFixed(2)}`
            document.querySelector('#total').value = total.toFixed(2)
            document.querySelector('#label-total').textContent = `Bs/${total.toFixed(2)}`
        }else{
            document.querySelector('#impuesto').value = 0.00
            document.querySelector('#label-impuesto').textContent = 'Bs/0.00'
            document.querySelector('#total').value = 0.00
            document.querySelector('#label-total').textContent = 'Bs/0.00'
        }
    },
    msVenta: async id => {
        const request = await fetch(controllerVentas.url+`/mostrar/${id}`,{
            method: 'GET'
        })

        const venta = await request.json()

        if(venta.id !== ''){
            
            document.querySelector('#producto').parentElement.style.display = 'none'
            document.querySelector('#cantidad-producto').parentElement.style.display = 'none'
            document.querySelector('#precio-producto').parentElement.style.display = 'none'
            document.querySelector('#btn-Ag-Producto').parentElement.style.display = 'none'
            document.querySelector('#btn-Rg-Venta').style.display = 'none'

            document.querySelector('#cliente').value = venta[0].idcliente
            document.querySelector('#tipo-comprobante').value = venta[0].tipo_comprobante
            document.querySelector('#serie-comprobante').value = venta[0].serie_comprobante
            document.querySelector('#numero-comprobante').value = venta[0].num_comprobante
            document.querySelector('#label-impuesto').textContent = `Bs/${venta[0].impuesto}`
            document.querySelector('#label-total').textContent = `Bs/${venta[0].total}`

            let i
            let filaProducto

            for(i = 0; i < venta.length; i++){
                const detalle = venta[i].DetalleV
                const tr = document.createElement('tr')

                filaProducto = `
                        <td></td>
                        <td>${detalle.Articulo.codigo} ${detalle.Articulo.nombre}</td>
                        <td>${detalle.cantidad}</td>
                        <td>${detalle.precio}</td>
                        <td>${(detalle.cantidad*detalle.precio).toFixed(2)}</td>`

                tr.innerHTML = filaProducto
                document.querySelector('#ls-productos').children[1].append(tr)
            }
        }else{
            swal({
                title: "No se encontraron detalles de la venta !!",
                icon: "danger",
                button: "Aceptar"
            })
        }
        
    },
    anVenta: async id => {
        const request = await fetch(controllerVentas.url+`/anular/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await request.json()
        if(response.message !== ''){
            swal({
                title: "Venta Anulada !!",
                text: `${response.message}`,
                icon: "success",
                button: "Aceptar"
            }).then(() => {
                controllerVentas.obtenerDatosVentas().then(ventas => {
                    controllerVentas.lsVentas(ventas)
                })
            })
        }else{
            swal({
                title: "Venta no se puedo anular !!",
                icon: "danger",
                button: "Aceptar"
            })
        }
    },
    bsVenta: async () => {
        const venta = document.querySelector('#buscar').value
        const request = await fetch(controllerVentas.url+`/buscar/${venta}`, {
            method: 'GET'
        })
        const ventas = await request.json()
        if(venta !== ''){
            controllerVentas.lsVentas(ventas)
        }else{
            swal({
                title: "Ingrese un dato para buscar !!",
                icon: "success",
                button: "Aceptar"
            })
        }
    }
}