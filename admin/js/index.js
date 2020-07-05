$(function () {
    // 进入页面初始化数据
    // 设置用户名密码
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
        success: function (res) {
            $('.header_bar img').attr('src', res.data.userPic)
            $('.user_info img').attr('src', res.data.userPic)
            $('.user_info span').text(res.data.nickname)
        }
    })

    // 实现左侧得点击切换效果
    // 注册添加样式
    $('.level01').on('click',function(){
        $(this).addClass('active').siblings('div').removeClass('active')
        if($(this).index() == 1){
            $('ul').slideToggle()
            $(this).find('b').toggleClass('rotate0')
        }
    })

    // 添加店家样式
    $('.level02 li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 退出功能
    $('.logout').on('click',function(){
        location.href = './login.html'
        // 清除token 
        localStorage.removeItem('token')
    })
})