(function($) {
    
        $.fn.datepicker = function(config) {
            var _config = {
                version: '1.0',
                author: "chenjintao"
            }

            //用来customer的
            var config = $.extend({}, config);

            //工具类
            var ultis = {
                //获取整个月的天数
                getFullDayOfMonth: function(year, month) {
                    return new Date(year, month + 1, 0).getDate()
                },
                //获取本月一号所对应的星期几
                getDay(year, month) {
                    return new Date(year, month, 1).getDay()
                },
                getWeek(d) {
                    return ['日', '一', '二', '三', '四', '五', '六'][d]
                },
                fixZero(time) {
                    return ('0' + time.toString()).slice(-2)
                },
                getKnowMonth(month){
                    return (month>11?0:month<0?11:month)+1
                }
            }
            var date = new Date();
            var now = {};
            now.date = date.getDate();
            now.month = date.getMonth();
            now.year = date.getFullYear();
            now.day = date.getDay(); //0=>6 0*sunday ;

            var items = $('.date');

            var rightnowindex = (now.date - 1 + ultis.getDay(now.year, now.month));

            var realnow = {
                month: now.month,
                year: now.year
            }
            var time = $('.time');
            var color = "#E7E7E7"

            function render() {
                //两个临界值判断
                if (now.month < 0) { //调制上一年
                    now.year = now.year - 1;
                    now.month = 11;
                } else if (now.month > 11) { //调制下一年
                    now.year = now.year + 1;
                    now.month = 0;
                }

                //增加日期
                time.html(now.year + '年' + ultis.fixZero(now.month + 1) + '月')
                items.removeClass('now');
                if (realnow.year === now.year && realnow.month === now.month) {
                    items.eq(rightnowindex).addClass('now')
                }
                var firstDay = ultis.getDay(now.year, now.month);
                var FullDay = ultis.getFullDayOfMonth(now.year, now.month);
                var judgeDay = firstDay + FullDay;
                var calendarlength = 42;
                var date = 1;
                //这个月
                for (var i = firstDay; i < firstDay + FullDay; i++) {
                    items.eq(i).html(date).css({
                        color: ''
                    }).data('date',now.year+'-'+ultis.getKnowMonth(now.month)+'-'+date)
                    date++
                }
                if (judgeDay <= calendarlength) { //下个月的
                    //下个月的日期
                    var nextMonthDays = calendarlength - judgeDay;
                    var nextMonthDay = 1;
                    var newjudge = i + nextMonthDays;
                    var year = now.month<11?now.year:now.year+1
                    for (i; i < newjudge; i++) {
                        items.eq(i).html(nextMonthDay).css({
                            color: color
                        }).data('date',year+'-'+ultis.getKnowMonth(now.month+1)+'-'+nextMonthDay);
                        nextMonthDay++
                    }
                }
                //上个月日期
                if (firstDay > 0) {
                    var lastMonthDay = ultis.getFullDayOfMonth(now.year, now.month - 1); //获取上个月的总天数
                    var year = now.month>0?now.year:now.year-1;
                    for (var j = firstDay - 1; j >= 0; j--) {
                        items.eq(j).html(lastMonthDay).css({
                            color: color
                        }).data('date',year+'-'+ultis.getKnowMonth(now.month-1)+'-'+lastMonthDay);;
                        lastMonthDay--;
                    }
                }
            }

            render(now.year, now.month);

            items.on('click', function() {
                items.each(function(index, item) {
                    $(items).removeClass('now')
                })
                var $this = $(this);
                var date = $this.data('date');
                $this.addClass('now');
                $("#value").text(date)
                console.log($this.data('date'))
            })
            this.parent().find("#next").on('click', function() {
                now.month = now.month + 1;
                render(now.year, now.month);
            })
            this.parent().find("#pre").on('click', function() {
                now.month = now.month - 1;
                render(now.year, now.month);
            })

             return this;
        }
        
    
})(jQuery);

$(function(){
    $('#datepicker').hide();
    $('#choosedate').on('click', function() {
            $('#datepicker').fadeToggle().datepicker({})
    });
})