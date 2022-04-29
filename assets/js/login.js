$(function () {

    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify()来自定义校验规则
    form.verify({
        // 自定义pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参是确认密码框中的内容
            // 需要拿到密码框中的内容
            let pwd = $('.reg-box [name=password]').val()
            // 进行判断
            if (pwd !== value) {
                // 判断失败return错误提示消息
                return '两次密码不一致'
            }
        }

    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                layer.msg('注册成功，请登录！')
                // 模拟点击行为
                $('#link_login').click()
            })
    })

    // 监听登录表单的提交行为
    $('#form_login').submit(function (e) {
        //   阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // console.log(res.token);
                // 将登录成功得到的token字符串保存到localStroage
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = './index.html';
            }
        })
    })
})