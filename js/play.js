// @charset"UTF-8";
//播放页面 js

window.onload = function (ev) {
//    播放器的选项卡
    var oplayerListTop = document.getElementsByClassName('player_list_top')[0];
    switchTab(oplayerListTop, 'a', "list_top_active");
//猜你喜欢的获取数据
    ajax('get', 'data/like.json', '', function (res) {
        var arr = JSON.parse(res);
        var olikeList = document.getElementsByClassName('list_left_like_content')[0];
        //  html的拼接
        var filmsHtml = '';
        for (var i = 0; i < arr.length; i++) {
            filmsHtml += '<div>\n' +
                '<a href="' + arr[i]['http'] + '">\n' +
                '<img class="movie_img" src="' + arr[i]['src'] + '" alt=""></a>\n' +
                '<p class="op_top">\n' +
                '<a href="javascript:void(0)" class="introduce_title">' + arr[i]['title'] + '</a>\n' +
                '<a href="javascript:void(0)" class="introduce_score">' + arr[i]['grade'] + '</a>\n' +
                '</p>\n' +
                '<p class="op_bottom">' + arr[i]['message'] + '</p>\n' +
                '</div>';
        }
        olikeList.innerHTML = filmsHtml;
    });
//电影播放页面
    ajax('get', 'data/hot.json', '', function (res) {
        var arr = JSON.parse(res);
        var oHotList = document.getElementsByClassName('hot_img_list')[0];
        //  html的拼接
        var filmsHtml = '';
        for (var i = 0; i < arr.length; i++) {
            filmsHtml += ' <div>\n' +
                '<a href="' + arr[i]['http'] + '">\n' +
                '<img src="' + arr[i]['url'] + '" alt="">\n' +
                '<span>' + arr[i]['title'] + '</span>\n' +
                ' </a>\n' +
                '</div>';
        }
        oHotList.innerHTML = filmsHtml;
    });
//    电影榜单
    ajax('get', 'data/ranking.json', '', function (res) {
        var arr = JSON.parse(res);
        var oHotRankUl = document.getElementsByClassName('hot_rank_ul')[0];
        var rankHtml = '';
        for (var i = 0; i < arr.length; i++) {
            rankHtml += '<li>\n' +
                '<a href="' + arr[i]['http'] + '">\n' +
                '<img src="' + arr[i]['src'] + '" alt=""></a>\n' +
                '<p class="">\n' +
                ' <i>' + (i + 1) + '</i>' + arr[i]['title'] +
                ' <span>' + arr[i]['grade'] + '</span>\n' +
                '</p></li>'
        }
        oHotRankUl.innerHTML = rankHtml;
        oHotRankUl.firstElementChild.firstElementChild.firstElementChild.style.display = 'inline-block';
    });
//当鼠标移动到上面是替换图片
    var oHotRankUl = document.getElementsByClassName('hot_rank_ul')[0];
    oHotRankUl.onmousemove = function (ev) {
        var olis = oHotRankUl.getElementsByTagName('li');
        var ev = event || ev;
        if (ev.target.nodeName == 'LI' || ev.target.nodeName == 'P') {
            for (var i = 0; i < olis.length; i++) {
                olis[i].children[0].firstElementChild.style.display = 'none';
                olis[i].children[1].className = '';
            }
            ev.target.className = 'p_hover_bg';
            ev.target.previousElementSibling.firstElementChild.style.display = 'inline-block';
        }
    }
    //    当移开的时候 选中榜一
    oHotRankUl.onmouseleave = function () {
        //第一个元素显示
        var olis = oHotRankUl.getElementsByTagName('li');
        for (var i = 0; i < olis.length; i++) {
            olis[i].children[0].firstElementChild.style.display = 'none';
            olis[i].children[1].className = '';
        }
        olis[0].children[0].firstElementChild.style.display = 'inline-block';
        olis[0].children[1].className = 'p_hover_bg';
    }
//按最新 最热的切换
    var odiscussTitle = document.getElementsByClassName('movie_discuss_rank_tit')[0];
    odiscussTitle.onclick = function (e) {
        var ev = event || e;
        if ((ev.target.className) == 'movie_fl') {
            var objChild = odiscussTitle.getElementsByClassName('movie_fl');
            for (var i = 0; i < objChild.length; i++) {
                objChild[i].className = 'movie_fl';
            }
            ev.target.className = 'movie_fl rank_tit_active';
        }
    }
//   按最新 最热的的讨论的请求
    var discussJsonData;
    ajax('get', 'data/discuss.json', '', function (res) {
        var arrOld = discussJsonData = JSON.parse(res);
        var arr = getJosnPage(arrOld, 6, 1);
        var odiscussList = document.getElementsByClassName('movie_discuss_rank_ul')[0];
        var ototalDiscuss = document.getElementsByClassName('page_left')[0];
        var ospanTotal = ototalDiscuss.getElementsByTagName('span')[0];
        ospanTotal.innerText = '1/' + Math.ceil(arrOld.length / 6);
        showDiscussList(odiscussList, arr);
    });

//  讨论的数据的展现函数
    function showDiscussList(obj, arr) {
        var discussHtml = '';
        for (var i = 0; i < arr.length; i++) {
            var dateTime = crtTimeFtt(arr[i]['time']);
            discussHtml += '<li>\n' +
                ' <img class="user_img movie_fl" src="' + arr[i]['url'] + '" alt="">\n' +
                ' <div class="user_info movie_fl">\n' +
                ' <p class="user_name">' + arr[i]['userName'] + '</p>\n' +
                ' <p class="message_time">' + dateTime + '</p>\n' +
                ' </div>\n' +
                ' <div class="message_text">' + arr[i]['message'] + '</div>\n' +
                ' <div class="message_praise">' + arr[i]['praise'] + '</div>\n' +
                ' </li>';
        }
        obj.innerHTML = discussHtml;
    }

//    分页的函数的封装
    function getJosnPage(arr, pageNum, nowPage) {
        pageNum = pageNum || 10;
        var start = (nowPage - 1) * pageNum;
        var end = pageNum * nowPage;
        var newArr = arr.slice(start, end);
        return newArr;
    }

    //点击确定 或上一页 下一页 开始实现翻页
    document.getElementsByClassName('movie_discuss_page')[0].onclick = function (ev) {
        var ev = event || ev;
        var nowPage = document.getElementsByClassName('now_page')[0].value;
        var arrPage, total;
        var odiscussList = document.getElementsByClassName('movie_discuss_rank_ul')[0];
        var ototalDiscuss = document.getElementsByClassName('page_left')[0];
        var ospanTotal = ototalDiscuss.getElementsByTagName('span')[0];
        total = Math.ceil(discussJsonData.length / 6);
        if (ev.target.className == 'ok_page' && (nowPage > 0)) {
            arrPage = getJosnPage(discussJsonData, 6, nowPage);
            showDiscussList(odiscussList, arrPage);
        } else if (ev.target.className == 'last_page' && (nowPage > 1)) {
            nowPage = parseInt(nowPage) - 1;
            arrPage = getJosnPage(discussJsonData, 6, nowPage);
            showDiscussList(odiscussList, arrPage);
            document.getElementsByClassName('now_page')[0].value = nowPage;
        } else if (ev.target.className == 'next_page' && (nowPage < total)) {
            nowPage = parseInt(nowPage) + 1;
            arrPage = getJosnPage(discussJsonData, 6, nowPage);
            showDiscussList(odiscussList, arrPage);
            document.getElementsByClassName('now_page')[0].value = nowPage;
        }
        ospanTotal.innerText = nowPage + '/' + total;
    }

//时间戳转化为格式化的日期
    function crtTimeFtt(timeString) {
        if (timeString != null) {
            var date = new Date(timeString);
            var year = date.getFullYear();
            var month = ((date.getMonth() + 1) > 10) ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
            var day = (date.getDate() > 10) ? date.getDate() : ('0' + date.getDate());
            var hour = (date.getHours() > 10) ? date.getHours() : ('0' + date.getHours());
            var min = (date.getMinutes() > 10) ? date.getMinutes() : ('0' + date.getMinutes());
            var sec = (date.getSeconds() > 10) ? date.getSeconds() : ('0' + date.getSeconds());
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        }
    }

//    点击发表评论
    var odiscussArea = document.getElementsByClassName('movie_discuss_area')[0];
    odiscussArea.onclick = function (e) {
        var ev = event || e;
        if (ev.target.className == 'discuss_btn') {
            var discussObj = document.getElementsByClassName('discuss_txt')[0];
            var discussTxt = discussObj.value;
            if (discussTxt != '') {
                var username = '1509_5326_6'; //定死了的
                var datetime = crtTimeFtt((new Date()).getTime());
                var url = 'images/100_60_60.jpg';
                //将添加的数据添加到讨论的部分
                var newLi = document.createElement('li');
                var newImg = document.createElement('img');
                newImg.className = 'user_img movie_fl';
                newImg.src = url;
                var newDiv_1 = document.createElement('div');
                newDiv_1.className = 'user_info movie_fl';
                var op_name = document.createElement('p');
                var op_time = document.createElement('p');
                op_name.className = 'user_name';
                op_name.innerText = username;
                op_time.className = 'message_time';
                op_time.innerText = datetime;
                newDiv_1.appendChild(op_name);
                newDiv_1.appendChild(op_time);
                var newDiv_2 = document.createElement('div');
                newDiv_2.className = 'message_text';
                newDiv_2.innerText = discussTxt;
                var newDiv_3 = document.createElement('div');
                newDiv_3.className = 'message_praise';
                newDiv_3.innerText = 0;
                newLi.appendChild(newImg);
                newLi.appendChild(newDiv_1);
                newLi.appendChild(newDiv_2);
                newLi.appendChild(newDiv_3);
                var oul = document.getElementsByClassName('movie_discuss_rank_ul')[0];
                var ofirstLi = oul.firstElementChild;
                oul.insertBefore(newLi, ofirstLi);
            }
        }
    }
//    输入评论字数虽则一起改变
    odiscussArea.firstElementChild.oninput = function (ev) {
        var ev = ev || event;
        var nowWords = this.maxLength - this.value.trim().length
        ev.target.parentNode.previousElementSibling.lastElementChild.innerHTML = ' <span>还可以输入 <i>' + nowWords + '</i>字</span>';
    }
//    播放器列表的滚动条
    var olistContent = document.getElementsByClassName('scrollcontainer_ul')[0];
    var scroll = document.getElementsByClassName('scrollcontainer')[0];
    var drag = document.getElementsByClassName('drag')[0];
    dragScroll(olistContent, scroll, drag);
//


}
