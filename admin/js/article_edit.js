$(function () {
    // 进入页面的时候渲染选择框
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            // 将模板将数据绑定
            var strHtml = template('mb', res)
            $('.category').html(strHtml)
        }
    })


    // 日期显示插件
    jeDate("#testico", {
        zIndex: 99999,
        isinitVal: true,
        festival: true,
        format: 'YYYY-MM-DD'
    });


    // 富文本插件
    var E = window.wangEditor
    var editor = new E('#editor')
    editor.create()


    // 获取事件源渲染到页面
    // a链接相当于get请求，在后面拼接参数，通过windos.search获取
    // 为了方便获取将其封装成函数

    // 获取a链接传递过来的值
    var str = location.search.slice(1)
    var obj = utils.strToObject(str)
    // 获取文章内容渲染到页面
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: obj.id
        },
        success: function (res) {
            if (res.code == 200) {
                // 如果获取成功渲染到页面
                $('input[name="id"]').val(res.data.id)
                // 设置标题
                $('input[name="title"]').val(res.data.title)
                $('.article_cover').attr('src', res.data.cover)
                $('select[name="categoryId"]').val(res.data.categoryId)
                $('#testico').val(res.data.date)
                editor.txt.html(res.data.content)
            }

        }
    })

    // 图片的本地预览
    $('#inputCover').on('change', function () {
        $('.article_cover').attr('src', URL.createObjectURL(this.files[0]))
    })

    // 注册事件判断是更改还是存为草稿
    $('.btn-edit,.btn-draft').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault()
        var s = '12'
        if ($(this).hasClass('btn-success')) {
            s = '3432534543'
        }
        console.log(s);

        var data = new FormData($('#form')[0])
        // 单独设置内容
        data.append('content',editor.txt.html())
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data:data,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.code == 200){
                    // 回退到之前的列表界面
                    window.history.back()
                }
                
            }
        })

    })



})