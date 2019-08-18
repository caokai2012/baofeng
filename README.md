# baofeng
1、登录与注册的正则

账号：

帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$

密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$ 

密码 6~12的正确 密码比较弱


邮箱、手机

首页 vip特权 利用背景图片的 position 每次200px 实现 并改变 透明度 
     强力推荐
     用ajax 获取到json的数组对象

播放页
  播放器的列表： 模拟的滚动条

电影榜 img刚开始隐藏的 鼠标在上面的时候 图片显示
   

评论 
 添加输入：
textarea maxlength=140 text-indent = 2em

用 oninput监听输入值的变化

点击发表评论 
	用insertBefore添加在最前面

翻页 通过 设置没有 pageNme total nowPage
 
slice(开始，结束);

上一页

pageNme total nowPage -1

下一页
pageNme total nowPage+1
  
