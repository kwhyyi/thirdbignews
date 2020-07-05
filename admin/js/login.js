$(function(){
    // 加载页面。注册时间，当点击登录得时候判断
    $('.login_form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:BigNew.user_login,
            type:'post',
            beforeSend:function(){
                if($('.input_txt').val().trim() == '' || $('.input_pass').val().trim() == ''){
                    // 显示模态框提示用户名密码错误
                    $('.modal-body p').text('用户名密码错误')
                    $('#myModal').modal('show')
                    return false
                }
            },
            data:$('.login_form').serialize(),
            success:function(res){
                if(res.code == 200){
                    $('#myModal').modal('show')
                    $('.btn-sure').on('click',function(){
                        // 保存token到本地中
                        localStorage.setItem('token',res.token)
                        location.href = './index.html'
                    })
                }
                
            }
        })
    })
})