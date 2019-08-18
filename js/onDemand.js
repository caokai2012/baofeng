// @charset"UTF-8";
//点播片库页面的js
window.onload = function (ev) {
    //main的 选项卡功能的实现
    var omainNav = document.getElementsByClassName('main_select')[0];
    switchTab(omainNav, 'a', "main_select_active");
//    main_nav_active
    var omainNavActive = document.getElementsByClassName('main_nav')[0];
    switchTab(omainNavActive, 'a', "main_nav_active");
//    影片最新 与 欢迎 切换 list_nav_active
    var omainListNav = document.getElementsByClassName('main_list_nav')[0];
    switchTab(omainListNav, 'div', 'list_nav_active');
    ajax('get', 'data/films.json', '', function (res) {
        var arr = JSON.parse(res);
        var films = arr['films'];
        var orecommendList = document.getElementsByClassName('movie_list')[0];
        showFilmsList(films, orecommendList);
    });

}