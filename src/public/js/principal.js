//funcionabilidad del menu sidebar
$(".nav>.nav-item>.nav-link").click(function(){
    $(this).parent().children('.sub-nav').toggle('ease')

    $('.active').parent().children('.sub-nav').toggle('ease')
    $('.active').removeClass('active')
    
    $(this).addClass('active')
    const flecha = $(this).children('i')[1]
    
    if($(flecha).attr('class') === 'fa fa-angle-left'){
        $(flecha).removeClass('fa-angle-left')
        $(flecha).addClass('fa-angle-down')
    }else if($(flecha).attr('class') === 'fa fa-angle-down'){
        $(flecha).removeClass('fa-angle-down')
        $(flecha).addClass('fa-angle-left')
    }
})