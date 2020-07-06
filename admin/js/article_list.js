$(function () {
    // 进入文章列表先渲染数据
    $.ajax({
        type: 'get',
        url: BigNew.article_query,
        success: function (res) {

            if (res.code == 200) {
                console.log(res);
                
                // 渲染数据
                var strHtml = template('ls', res.data)
                $('tbody').html(strHtml)
                // 调用分页按钮展示数据
                fy(res)
            }

        }
    })

    // 记录当前页
    var nowPage = ''

    // 分页插件
    // 把分页封装成函数
    function fy(res,np) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                // layout:['prev','next','limit','first','last'],
                first: '首页',   // 设置首页
                last: '最后一页', //设置最后一页
                elem: 'Ss', //注意，这里的 test1 是 ID，不用加 # 号
                count: res.data.totalCount, //数据总数，从服务端得到
                theme: '#FFAEB9',
                limit: 6,
                curr: np || 1,
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数
                    nowPage = obj.curr
                    // 发送请求获取当前页的数据
                    $.ajax({
                        type: 'get',
                        url: BigNew.article_query,
                        data: {
                            key: $('#key').val(),
                            type: $('#selCategory').val(),
                            state: $('#selStatus').val(),
                            page: obj.curr
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                // 渲染数据
                                var strHtml = template('ls', res.data)
                                $('tbody').html(strHtml)
                            }

                        }
                    })

                    //首次不执行
                    if (!first) {
                        //do something
                    }
                }
            });
        });
    }

    // 动态的渲染文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                var strHtml = template('op', res)
                $('#selCategory').html(strHtml)
            }
        }
    })

    // 查询按钮，发送查询
    $('#btnSearch').on('click', function (e) {
        e.preventDefault()
        // 发送请求查询数据
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
            },
            success: function (res) {
                if (res.code == 200) {
                    // 获取数据成功，重新渲染数据
                    console.log(res);

                    var strHtml = template('ls', res.data)
                    console.log(strHtml);

                    $('tbody').html(strHtml)

                    fy(res)
                }

            }
        })

    })

    // 给模态框注册事件，查找事件源
    $('#myModal').on('show.bs.modal', function (e) {
        var id = $(e.relatedTarget).data('id')
        // 给模态框的确定按钮注册事件，当点击按钮的时候删除数据，重新渲染，关闭模态框
        $('#myModal .btn-primary').on('click', function () {
            console.log(122);

            // 发送请求删除数据
            $.ajax({
                type: 'post',
                url: BigNew.article_delete,
                data: {
                    id: id
                },
                success(res) {
                    if (res.code == 204) {
                        // 重新渲染数据
                        $.ajax({
                            type: 'get',
                            url: BigNew.article_query,
                            data: {
                                key: $('#key').val(),
                                type: $('#selCategory').val(),
                                state: $('#selStatus').val(),
                            },
                            success: function (res) {
                                if (res.code == 200) {
                                    // 获取数据成功，重新渲染数据
                                    console.log(res);

                                    var strHtml = template('ls', res.data)
                                    console.log(strHtml);

                                    $('tbody').html(strHtml)

                                    fy(res,nowPage)
                                }

                            }
                        })
                        // 隐藏模态框
                        $('#myModal').modal('hide')

                    }
                }
                })

        })
    })
})