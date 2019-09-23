$(function () {
    let roomdetail = $('#roomdetail').val()
        let server = 'localhost'
    let rtmpserver = `rtmp://${server}/live/`
    $('#rtmp').val(rtmpserver)
    //初始页面状态判断
    $.get("../api/users/status", function (data) {
        $('#type').val(data.livetype)
        if (data.index != 'yes') {
            $('#livenow').css('display', 'none')
            $('#livebegin').css('display', 'inline')
            $('#livesetting').css('display', 'none')
        } else {
            $('#rtmp').val(data.rtmpserver)
            $('#livebegin').css('display', 'none')
            $('#livenow').css('display', 'inline')
            $('#livesetting').css('display', 'inline')
        }
    })
    $('#ask').click(function () {
        $.ajax({
            type: "POST",
            url: "../api/users/ask",
            data: JSON.stringify({
                'ask': 'yes'
            }),
            contentType: 'application/json;charset=utf-8',
            dataType: "json",
            success: function (response) {
                $('#sendask').modal('show')
                $('#ask').attr('disabled', '')
            }
        })
    })
    $('#type').click(function () {
        $('#type').removeClass('is-invalid')
    })
    $('#roomdetail').bind('input propertychange', function () {
        $('#detaillive').text($(this).val())
    })
    $('#liveopen').click(function () {
        if ($('#type').val() == 'none') {
            $('#typevalid').html('要选择分类才能直播')
            $('#type').addClass('is-invalid')
            $('#type').removeClass('is-valid')
            return false
        } else {
            $.ajax({
                type: "POST",
                url: "../api/users/rtmpset",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify({
                    'index': 'yes',
                    'type': $('#type').val(),
                    'roomdetail': roomdetail,
                }),
                dataType: "json",
                success: function (data) {
                    $('#rtmpkey').val(data.rtmpkey)
                    $('#type').removeClass('is-invalid')
                    $('#livebegin').css('display', 'none')
                    $('#livenow').css('display', 'inline')
                    $('#livesetting').css('display', 'inline')
                    return true
                }
            })
        }
    })
    $('#liveclose').click(function () {
        $.ajax({
            type: "POST",
            url: "../api/users/indexset",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({
                'index': 'no',
                'type': 'none'
            }),
            dataType: "json",
            success: function (response) {
                $('#livenow').css('display', 'none')
                $('#livebegin').css('display', 'inline')
                $('#livesetting').css('display', 'none')
                return true
            }
        })
    })
})