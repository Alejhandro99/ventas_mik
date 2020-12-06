window.addEventListener('load', ()=> {

    let hash = window.location.hash
    if(hash === '' || hash === '#/'){
        window.location.hash = '#/articulos'
        hash = window.location.hash
    }
    enrutar(hash)
    window.addEventListener('hashchange', ()=> {
        enrutar(window.location.hash)
    })

}, false)

const enrutar = ruta => {
    const vista = ruta.slice(2)
    const tituloVentana = 'Sitema MiK || ' + vista[0].toUpperCase() + vista.slice(1)
    const req = new XMLHttpRequest()

    window.document.title = tituloVentana
    
    req.addEventListener('load', () => {
        document.getElementById('vistaPrincipal').innerHTML = ''
        document.getElementById('vistaPrincipal').innerHTML = req.responseText
        
        switch(vista){
            case 'ventas':
                controllerVentas.lsCliente()
                controllerVentas.lsProductos()
                controllerVentas.obtenerDatosVentas().then(ventas => {
                    controllerVentas.lsVentas(ventas)
                })

                document.querySelector('#fm-Rg-Venta').addEventListener('submit', (e) => {
                    e.preventDefault()
                    controllerVentas.rgVenta()
                }, false)
                
                document.querySelector('#buscar').addEventListener('change', () => {
                    if(document.querySelector('#buscar').value === ''){
                        controllerVentas.obtenerDatosVentas().then(ventas => {
                            controllerVentas.lsVentas(ventas)
                        })
                    }
                })
                break

            case 'articulos':
                controllerArticulos.llenarCategorias()
                controllerArticulos.obtenerDatosArticulos().then(articulos => {
                    controllerArticulos.lsArticulos(articulos)
                })

                document.querySelector('#fm-Rg-Articulo').addEventListener('submit', (e) => {
                    const id = document.querySelector('#id-articulo').value
                    e.preventDefault()
                    if(id === ''){
                        controllerArticulos.rgArticulo()
                    }else{
                        controllerArticulos.edArticulo(id)
                    }
                }, false)

                document.querySelector('#buscar').addEventListener('change', ()=> {
                    if(document.querySelector('#buscar').value === ''){
                        controllerArticulos.obtenerDatosArticulos().then(categorias => {
                            controllerArticulos.lsArticulos(categorias)
                        })
                    }
                }, false)
                break

            case 'categorias':
                controllerCategorias.obtenerDatosCategorias().then(categorias => {
                    controllerCategorias.lsCategorias(categorias)
                })

                document.querySelector('#fm-Rg-Categoria').addEventListener('submit', (e) => {
                    const id = document.querySelector('#id-categoria').value
                    e.preventDefault()
                    if(id === ''){
                        controllerCategorias.rgCategoria()
                    }else{
                        controllerCategorias.edCategoria(id)
                    }
                }, false)

                document.querySelector('#buscar').addEventListener('change', ()=> {
                    if(document.querySelector('#buscar').value === ''){
                        controllerCategorias.obtenerDatosCategorias().then(categorias => {
                            controllerCategorias.lsCategorias(categorias)
                        })
                    }
                }, false)
                break

            case 'clientes':
                controllerClientes.obtenerDatosClientes().then(clientes => {
                    controllerClientes.lsClientes(clientes)
                })

                document.querySelector('#fm-Rg-Cliente').addEventListener('submit', (e) => {
                    const id = document.querySelector('#id-cliente').value
                    e.preventDefault()
                    if(id === ''){
                        controllerClientes.rgCliente()
                    }else{
                        controllerClientes.edCliente(id)
                    }
                }, false)

                document.querySelector('#buscar').addEventListener('change', ()=> {
                    if(document.querySelector('#buscar').value === ''){
                        controllerClientes.obtenerDatosClientes().then(clientes => {
                            controllerClientes.lsClientes(clientes)
                        })
                    }
                }, false)
                break
            
            case 'usuarios':
                controllerUsuarios.obtenerDatosUsuarios().then(usuarios => {
                    controllerUsuarios.lsUsuarios(usuarios)
                })
                controllerUsuarios.lsRoles()

                document.querySelector('#fm-Rg-Usuario').addEventListener('submit', (e) => {
                    const id = document.querySelector('#id-usuario').value 
                    e.preventDefault()
                    if(id === ''){
                        controllerUsuarios.rgUsuario()
                    }else{
                        controllerUsuarios.edUsuario(id)
                    }
                }, false)

                document.querySelector('#buscar').addEventListener('change', () => {
                    if(document.querySelector('#buscar').value === ''){
                        controllerUsuarios.obtenerDatosUsuarios().then(usuarios => {
                            controllerUsuarios.lsUsuarios(usuarios)
                        })
                    }
                }, false)
                break
        }
    }, false)
    req.open('get', 'vistas/'+vista+'.html', true)
    req.send(null)
}