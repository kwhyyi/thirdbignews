$(function(){
    // 进入先初始化数据
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (res) {
            if (res.code == 200) {
                // 获取数据成功，设置文件值
                for (var key in res.data) {
                    $('#form .' + key).val(res.data[key])
                }
                $('.form-group .user_pic').attr('src', res.data.userPic)
            }
        }

    })
    // 实现图片上传得本地图片得更改
    $('.col-sm-10 input').on('change',function(){ //注册更改事件
        $('.user_pic').attr('src',URL.createObjectURL(this.files[0]))
    })

    // 给修改按钮注册事件，当点击按钮发送请求更改数据
    $('.btn-edit').on('click',function(e){
        e.preventDefault()
        // 获取数据 
        var da = new FormData($('#form')[0])
        $.ajax({
            type:'post',
            url:BigNew.user_edit,
            contentType:false,
            processData:false,
            data:da,
            success:function(res){
                if(res.code == 200){
                    // 数据更新成功，要更改左侧和顶部得头像和用户名
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        success: function (res) {
                            parent.$('.header_bar img').attr('src', res.data.userPic)
                            parent.$('.user_info img').attr('src', res.data.userPic)
                            parent.$('.user_info span').text(res.data.nickname)
                        }
                    })
                }
            }
        })
        
    })
})