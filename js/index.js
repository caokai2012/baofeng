// @charset"UTF-8";
//首页页面的js

window.onload = function (ev) {
    //main的 选项卡功能的实现
    var omainNav = document.getElementsByClassName('main_nav')[0];
    omainNav.onclick = function (e) {
        var ev = event || e;
        oaList = omainNav.getElementsByTagName('a');
        for (var i = 0; i < oaList.length; i++) {
            oaList[i].className = '';
        }
        ev.target.className = 'main_nav_active';
    }
    //轮播图的js功能的实现 通过ajax的功能的实现
    ajax('get', 'data/banner.json', '', function (res) {
        var arr = eval(res);
        var oul = document.getElementsByClassName('main_banner_ul')[0];
        var oli = oul.getElementsByTagName('li');
        var op = document.getElementById('pagination');
        var ospan = op.getElementsByTagName('img');
        var liHtml = '';
        var imgHtml = '';
        for (var i = 0; i < arr.length; i++) {
            liHtml += '<li><img src="' + arr[i]['src'] + '" alt=""></li>';
            imgHtml += '<img src="' + arr[i]['url'] + '" alt="">'
        }
        oul.innerHTML = liHtml;
        op.innerHTML = imgHtml;
        //展示第一张
        oli[0].style.opacity = 1;
        //淡进与淡出功能的实现
        var index = 0;
        var setInter;
        setInter = setInterval(autoPlay, 3000);

        function autoPlay() {
            index++;
            index = (index >= arr.length) ? 0 : index;
            switchImg(index);
        }

        //点击事件
        for (var i = 0; i < ospan.length; i++) {
            ospan[i].onmouseenter = (function (n) {
                return function () {
                    clearInterval(setInter);
                    switchImg(n);
                    index = n;
                    setInter = setInterval(autoPlay, 3000);
                }
            })(i);
        }

        function switchImg(index) {
            for (var i = 0; i < oli.length; i++) {
                bMove(oli[i], {
                    "opacity": 0
                });
                ospan[i].className = '';
            }
            bMove(oli[index], {
                "opacity": 100
            });
            ospan[index].className = 'img_active';
        }

        //    上一张 下一张
        document.onclick = function (ev) {
            var ev = event || ev;
            clearInterval(setInter);
            if (ev.target.id === 'left_icon') {
                index--;
                index = (index < 0) ? arr.length - 1 : index;
                switchImg(index);
            } else if (ev.target.id === 'right_icon') {
                index++;
                index = (index >= arr.length) ? 0 : index;
                switchImg(index);
            }
            setInter = setInterval(autoPlay, 3000);
        }
    });

//    VIP的特权展示
    function showVipList(vipIndex) {
        var ovipList = document.getElementsByClassName('vip_list_main') [0];
        var ovipListUl = document.createElement('ul');
        ovipListUl.className = 'vip_list_ul';
        for (var i = vipIndex; i < 5 + vipIndex; i++) {
            var vipLi = document.createElement('li');
            vipLi.index = i;
            vipLi.style.backgroundImage = 'url("./images/vip-powers.png")';
            vipLi.style.backgroundRepeat = 'no-repeat';
            vipLi.style.backgroundPositionX = -(i * 200) + 'px';
            vipLi.style.backgroundPositionY = '0px';
            vipLi.className = 'vip_list_show';
            ovipListUl.appendChild(vipLi);
        }
        ovipList.appendChild(ovipListUl);
    }

    showVipList(0);

//    VIP特权的左右点击事件
    document.getElementsByClassName('vip_list')[0].onclick = function (ev) {
        var ev = event || ev;
        //获取第一个li的index 的下标
        var firstLiIndex = document.getElementsByClassName('vip_list_show')[0].index;
        if (ev.target.className === 'vip_list_left') {
            console.log(ev.target.nextElementSibling.firstElementChild);
            if (firstLiIndex != 0) {
                ev.target.nextElementSibling.firstElementChild.remove();
                showVipList(0);
            }
        } else if (ev.target.className === 'vip_list_right') {
            if (firstLiIndex != 5) {
                ev.target.previousElementSibling.firstElementChild.remove();
                showVipList(5);
            }
        }
    }
//    强力推荐 主页的电影列表
    ajax('get', 'data/films.json', '', function (res) {
        var arr = JSON.parse(res);
        var films = arr['films'];
        var orecommendList = document.getElementsByClassName('recommend_list')[0];
        showFilmsList(films, orecommendList);
    });
//    热映大片
    ajax('get', 'data/films.json', '', function (res) {
        var arr = JSON.parse(res);
        var films = arr['films'].reverse().slice(0, 6);
        var orecommendList = document.getElementsByClassName('hot_list')[0];
        showFilmsList(films, orecommendList);
    });

}
