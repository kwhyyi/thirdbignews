$(function () {
    // 进入就初始化评论
    $.ajax({
        type: 'get',
        url: BigNew.comment_list,
        success: function (res) {
            var strHtml = template('mb', res.data)
            $('tbody').html(strHtml)
            // 刚开始就调用获取当前的页数
            fy(res)
        }

    })


    // 记录当前页
    var nowPage = 1


    // 使用分页插件
    function fy(res, vp) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, //页数
            visiblePages: vp || 7,    //每页条数
            first: '首页',
            last: '最后',
            next: '下一页',
            prev: '上一页',
            onPageClick: function (event, page) {
                // page 当天页码
                // $('#page-content').text('Page ' + page);
                // 当点击页数的时候发送ajax请求回去对应页数的内容
                nowPage = page
                $.ajax({
                    type: 'get',
                    url: BigNew.comment_list,
                    data: {
                        page: page
                    },
                    success: function (res) {
                        // 如果获取成功调用模板渲染
                        if (res.code == 200) {
                            var strHtml = template('mb', res.data)
                            $('tbody').html(strHtml)
                        }

                    }
                })
            }
        });

    }


    // 给按钮注册事件（事件委托，元素动态创建）
    $('tbody').on('click', '.btn-pass', function () {
        var _this = this
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: $(this).data('id')
            }, success: function (res) {
                // 更改状态栏中的值
                console.log(res);

                // $(this).parent().prev().text(res.msg)
                // 注意这是在函数中，this不是事件源
                $(_this).parent().prev().text(res.msg)
            }
        })
    })

    // 给拒绝按钮注册事件
    $('tbody').on('click', '.btn-reject', function () {
        var _this = this
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                if (res.code == 200) {
                    $(_this).parent().prev().text(res.msg)
                }
            }
        })
    })

    // 删除给按钮注册事件
    $('tbody').on('click', '.btn-del', function () {
        // 发送请求
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                if (res.code == 200) {
                    // fy(res,nowPage)
                    // 重新获取数据渲染到页面上
                    $.ajax({
                        type: 'get',
                        url: BigNew.comment_list,
                        data:{
                            page:nowPage
                        },
                        success:function(res){
                            if(res.code == 200){
                                // 渲染页面
                                var strHtml = template('mb', res.data)
                                $('tbody').html(strHtml)
                                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, nowPage)
                            }
                        }
                    })
                }
            }
        })
    })
})