$.get('/hdu-web-learn/res/tpl/header.html', (result) => {
    $("header").html(result);
    if(!Cookies.get("login_user")){
        $("#logo").attr('src', '/hdu-web-learn/res/images/3422.png_860.png');
    }
});
