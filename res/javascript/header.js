$.get('/res/tpl/header.html', (result) => {
    $("header").html(result);
    if(!Cookies.get("login_user")){
        $("#logo").attr('src', '/res/images/3422.png_860.png');
    }
});