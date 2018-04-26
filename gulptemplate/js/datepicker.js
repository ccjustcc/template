$(function () {
    function renderDate() {
        var date = new Date();
        var now = {};
        now.date = date.getDate();
        now.month = date.getMonth();
        now.year = date.getFullYear();
        now.day = date.getDay(); //0=>6 0*sunday 
        console.log(now)
        console.log(new Date(now.year, now.month + 1, 0).getDate())

    }
    $.fn.datepicker = function (config) {
        var config = $.extend({
            version: '1.0',
            author: "chenjintao"
        }, config);
        var ultis = {
            //获取整个月的天数
            getFullDayOfMonth: function (year, month) {
                return new Date(year, month + 1, 0).getDate()
            },
            //获取本月一号所对应的星期几
            getDay(year, month) {
                return new Date(year, month, 1).getDay()
            },
        }
        var date = new Date();
        var now = {};
        now.date = date.getDate();
        now.month = date.getMonth();
        now.year = date.getFullYear();
        now.day = date.getDay(); //0=>6 0*sunday ;
        var items = $('.item');
        function render(){
            if(now.month<0){
                now.year=now.year-1;
                now.month = 11;
            }
            else if(now.month>11){
                now.year = now.year+1;
                now.month= 0;
            }
            console.log('rightnow')
            var firstDay = ultis.getDay(now.year,now.month);
            console.log((now.month+1)+"月的第一天是"+firstDay)
            var FullDay = ultis.getFullDayOfMonth(now.year,now.month);
            var judgeDay = firstDay + FullDay;
            var calendarlength = 35;
            var date = 1;
            //这个月
            for (var i = firstDay; i < firstDay + FullDay; i++) {
                // console.log('date', date)
                // console.log('datei',i)
                items.eq(i).html(date).css({
                    color:''
                });
                date++
            }
            if (judgeDay <= calendarlength) { //下个月有跑到上面来了
                //下个月的日期
                var nextMonthDays = calendarlength-judgeDay;
                var nextMonthDay = 1;
                var newjudge = i+nextMonthDays;
                for(i;i<newjudge;i++ ){
                    console.log('nextMoth',nextMonthDay);
                    console.log('datei',i)
                    items.eq(i).html(nextMonthDay).css({
                        color:'green'   
                    });
                    nextMonthDay++
                }
            } 
            //上个月日期
            if(firstDay>0){
                var lastMonthDays = ultis.getFullDayOfMonth(now.year,now.month-1); //获取上个月的总天数
                console.log('lastMonthDays',lastMonthDays)
                for(var j=firstDay-1;j>=0;j--){
                    console.log(lastMonthDays)
                    items.eq(j).html(lastMonthDays).css({
                        color:'red'
                    });
                    lastMonthDays--;
                }
            }
            console.log("循环的日期", firstDay + FullDay)
        }
        render(now.year,now.month)
        console.log(now)
        console.log(new Date(now.year, now.month + 1, 0).getDate());
       
       this.parent().find("#next").on('click',function(){
        now.month=now.month+1;
        console.log('next',now)
        render(now.year,now.month);
       })
       this.parent().find("#pre").on('click',function(){
        now.month=now.month-1;
        render(now.year,now.month);
        console.log("pre")
    })
        // console.log(this.next("#pre"))

    }
    $('#choosedate').on('click', function () {
        $('#choosedate').datepicker({
        })
    });
    $()
})