window.addEventListener('load', ()=> {

    let hash = window.location.hash
    if(hash === '#/'){
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

                
                break

            case 'articulos':
                controllerArticulos.obtenerDatosArticulos().then(articulos => {
                    controllerArticulos.lsArticulos(articulos)
                })

                document.querySelector('#fm-Rg-Articulo').addEventListener('submit', (e) => {
                    const id = document.querySelector('#id-articulo').value
                    e.preventDefault()
                    if(id === ''){
                        controllerArticulos.rgArticulo()
                    }else{
                        controllerArticulos.edArticulo()
                    }
                }, false)
                break

            case 'categorias':
                controllerArticulos.llenarCategorias()
                controllerCategorias.obtenerDatosCategorias().then(categorias => {
                    controllerCategorias.lsCategorias(categorias)
                })

                document.querySelector('#fm-Rg-Categoria').addEventListener('submit', (e) => {
                    const id = document.querySelector('#id-categoria').value
                    e.preventDefault()
                    if(id === ''){
                        controllerCategorias.rgCategoria()
                    }else{
                        controllerCategorias.edCategoria()
                    }
                }, false)

                document.querySelector('#buscar').addEventListener('change', ()=> {
                    controllerCategorias.obtenerDatosCategorias().then(categorias => {
                        controllerCategorias.lsCategorias(categorias)
                    })
                }, false)
                break

            case 'clientes':
                
                break
            
            case 'usuarios':

                break
        }
    }, false)
    req.open('get', 'vistas/'+vista+'.html', true)
    req.send(null)
}