$(function () {
    // 渲染文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 创建模板引擎
                var strHtml = template('mb', res)
                $('.category').html(strHtml)
            }
        }
    })

    // 事件插件
    jeDate("#testico", {
        zIndex: 99999,
        isinitVal: true,
        festival: true,
        format: 'YYYY-MM-DD'
    });

    // 富文本
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()


    // 图片的预览功能
    $('#inputCover').on('change',function(){
        $('.article_cover').attr('src',URL.createObjectURL(this.files[0]))
    })

    // 收集数据发送请求添加数据
    // 判断是发布还是草稿
    $('.btn-release,.btn-draft').on('click',function(e){
        e.preventDefault()
        
        // 创建数据
        var data = new FormData($('#form')[0])
        // 设置文章内容
        data.append('content',editor.txt.html())
        

        if($(this).hasClass('btn-success')){
            // 说明为发布状态
            data.append('state','已发布')
        }else {
            data.append('state','草稿')
        }
        
        // 发送请求
        $.ajax({
            type:'post',
            url:BigNew.article_publish,
            data:data,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.code == 200){
                    location.href = './article_list.html'
                }
                
            }
        })
    })
})