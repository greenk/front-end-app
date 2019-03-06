(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        $(document).on('click', '.card-appointment', function () {
            var thisElement = $(this);
            if (!thisElement.hasClass('border-doing')) {
                return;
            }
            var timeDoing = thisElement.find('.time-doing').text();
            var prev = $(this).prev();
            thisElement.animate({
                width: [ "toggle", "swing" ],
                height: [ "toggle", "swing" ],
                opacity: "toggle"
            }, 300, "linear", function() {
                thisElement.remove();
                var elementToAdd = addDetailElement($.trim(timeDoing));
                prev.after(elementToAdd);
            });
        });

        $(document).on('click', '.header-appointment', function () {
            var parentElement = $(this).parent();
            var timeDoing = parentElement.find('.time-of-appointment').text();
            var prev = parentElement.prev();
            parentElement.animate({
                width: [ "toggle", "swing" ],
                height: [ "toggle", "swing" ],
                opacity: "toggle"
            }, 200, "linear", function() {
                parentElement.remove();
                var elementToAdd = addAppointmentElement($.trim(timeDoing));
                prev.after(elementToAdd);
            });
        });
        rendCalendar();
        // addDetailElement();
    });
})(document, window, jQuery);

function addDetailElement(timeDoing) {
    return "" +
        "<div class='open-appointment'>" +
        "<div class='header-appointment'>" +
        "       <div class='mb-10 mt-10'>" +
        "           <a class='font-size-18 time-of-appointment color-white'>" +
        "               <i class='far fa-clock pr-8'></i>" + timeDoing +
        "           </a>" +
        "       </div>" +
        "   </div>" +
        "                <div class='panel mb-0 nn-panel nn-panel-success'>" +
        "                    <div class='panel-body pt-15 px-15 pb-10'>" +
        "                        <div class='custom-inform'>" +
        "                            <div class='avatar-custom float-left'>" +
        "                                <a class='avatar avatar-37'>" +
        "                                    <img src='../../assets/portraits/21.jpg' alt=''>" +
        "                                </a>" +
        "                            </div>" +
        "                            <div class='name-phone-div'>" +
        "                                <p class='nn-color-black monthly-p font-size-16 font-weight-500 ml-50 mb-0'>Sukhmeet Gorae</p>" +
        "                                <a class='font-size-13 nn-color-black ml-10'><i class='fas fa-phone'></i> 481-175-9553</a>" +
        "                            </div>" +
        "                        </div>" +
        "                    </div>" +
        "                    <hr>" +
        "                    <div class='panel-body pt-15 px-15 pb-10'>" +
        "                        <p class='color-gray-1 monthly-p color-gray-1 font-size-13 font-weight-500 mb-0'>Request Services</p>" +
        "                        <div class='list-service'>" +
        "                            <div class='service float-left'>" +
        "                                Manicure" +
        "                            </div>" +
        "                            <div class='service float-left'>" +
        "                                Pedicure" +
        "                            </div>" +
        "                            <div class='service float-left'>" +
        "                                Gel Polish" +
        "                            </div>" +
        "                        </div>" +
        "                    </div>" +
        "                    <div class='panel-body pt-0 px-15 pb-10'>" +
        "                        <p class='color-gray-1 monthly-p color-gray-1 font-size-13 font-weight-500 mb-0'>Request Nail Tech</p>" +
        "                        <div class='nail-tech-info'>" +
        "                            <div class='avatar-custom float-left'>" +
        "                                <a class='avatar avatar-24'>" +
        "                                    <img src='../../assets/portraits/21.jpg' alt=''>" +
        "                                </a>" +
        "                            </div>" +
        "                            <div class='name-phone-div'>" +
        "                                <p class='nn-color-black monthly-p font-size-14 font-weight-500 ml-15 mb-0 float-left'>Anna Fali</p>" +
        "                                <p class=''>&ensp;(Anna)</p>" +
        "                            </div>" +
        "                        </div>" +
        "                    </div>" +
        "                </div>" +
        "   <div class='footer-appointment'>" +
        "       <div class='btn-group action-appointment' role='group'>\n" +
        "           <button type='button' class='btn btn-outline btn-default'><i class='far fa-trash-alt'></i>&ensp; Delete</button>\n" +
        "           <button type='button' class='btn btn-outline btn-default'><i class='fas fa-pencil-alt'></i>&ensp; Edit</button>\n" +
        "       </div>" +
        "   </div>" +
        "</div>" +
        "";
}

function addAppointmentElement(timeDoing) {
    return "<div class='card card-shadow card-appointment text-center border-doing'>\n" +
        "                                        <div class='vertical-align px-0'>\n" +
        "                                            <div class='vertical-align-bottom w-full'>\n" +
        "                                                <p class='time-doing font-size-16 font-weight-500 mt-8 mb-4'>" + timeDoing +
        "                                                <p class='nn-color-gray line-height-0 font-size-13 mb-8'>Richardo</p>\n" +
        "                                            </div>\n" +
        "                                        </div>\n" +
        "                                    </div>";
}

// tui-calendar: https://github.com/nhnent/tui.calendar/blob/master/docs/getting-started.md
function rendCalendar() {
    var themeConfig = {
        'common.border': '1px solid #e5e5e5',
        'common.backgroundColor': 'white',
        'common.holiday.color': '#263238',
        'common.saturday.color': '#263238',
        'common.dayname.color': '#263238',
        'common.today.color': '#263238',

        // creation guide style
        'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
        'common.creationGuide.border': '1px solid #515ce6',

        // month header 'dayname'
        'month.dayname.height': '31px',
        'month.dayname.borderLeft': '1px solid #e5e5e5',
        'month.dayname.paddingLeft': '10px',
        'month.dayname.paddingRight': '10px',
        'month.dayname.backgroundColor': 'inherit',
        'month.dayname.fontSize': '12px',
        'month.dayname.fontWeight': 'normal',
        'month.dayname.textAlign': 'left',

        // month day grid cell 'day'
        'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
        'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
        'month.weekend.backgroundColor': 'inherit',
        'month.day.fontSize': '14px',

        // month schedule style
        'month.schedule.borderRadius': '2px',
        'month.schedule.height': '24px',
        'month.schedule.marginTop': '2px',
        'month.schedule.marginLeft': '8px',
        'month.schedule.marginRight': '8px',

        // month more view
        'month.moreView.border': '1px solid #d5d5d5',
        'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
        'month.moreView.backgroundColor': 'white',
        'month.moreView.paddingBottom': '17px',
        'month.moreViewTitle.height': '44px',
        'month.moreViewTitle.marginBottom': '12px',
        'month.moreViewTitle.backgroundColor': 'white',
        'month.moreViewTitle.borderBottom': 'none',
        'month.moreViewTitle.padding': '12px 17px 0 17px',
        'month.moreViewList.padding': '0 17px 17px 17px',

        // week header 'dayname'
        'week.dayname.height': '44px',
        'week.dayname.borderTop': 'none',
        'week.dayname.borderBottom': '1px solid #e5e5e5',
        'week.dayname.borderLeft': 'inherit',
        'week.dayname.date.color': 'red',
        'week.dayname.paddingLeft': '0',
        'week.dayname.backgroundColor': 'inherit',
        'week.dayname.textAlign': 'center',
        'week.dayname.float': 'bottom',
        'week.today.color': '#263238',

        // week vertical panel 'vpanel'
        'week.vpanelSplitter.border': '1px solid #e5e5e5',
        'week.vpanelSplitter.height': '3px',

        // week daygrid 'daygrid'
        'week.daygrid.borderRight': '1px solid #e5e5e5',
        'week.daygrid.backgroundColor': 'inherit',

        'week.daygridLeft.width': '72px',
        'week.daygridLeft.backgroundColor': 'inherit',
        'week.daygridLeft.paddingRight': '8px',
        'week.daygridLeft.borderRight': '1px solid #e5e5e5',

        'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
        'week.weekend.backgroundColor': 'inherit',

        // week timegrid 'timegrid'
        'week.timegridLeft.width': '72px',
        'week.timegridLeft.backgroundColor': 'inherit',
        'week.timegridLeft.borderRight': '1px solid #e5e5e5',
        'week.timegridLeft.fontSize': '11px',
        'week.timegridLeftTimezoneLabel.height': '20px',

        'week.timegridOneHour.height': '52px',
        'week.timegridHalfHour.height': '26px',
        'week.timegridHalfHour.borderBottom': 'none',
        'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

        'week.timegrid.paddingRight': '8px',
        'week.timegrid.borderRight': '1px solid #e5e5e5',
        'week.timegridSchedule.borderRadius': '2px',
        'week.timegridSchedule.paddingLeft': '2px',

        'week.currentTime.color': '#515ce6',
        'week.currentTime.fontSize': '11px',
        'week.currentTime.fontWeight': 'normal',

        'week.pastTime.color': '#333',
        'week.pastTime.fontWeight': 'normal',

        'week.futureTime.color': '#333',
        'week.futureTime.fontWeight': 'normal',

        'week.currentTimeLinePast.border': '1px dashed #515ce6',
        'week.currentTimeLineBullet.backgroundColor': '#515ce6',
        'week.currentTimeLineToday.border': '1px solid #515ce6',
        'week.currentTimeLineFuture.border': 'none',

        // week creation guide style
        'week.creationGuide.color': '#515ce6',
        'week.creationGuide.fontSize': '11px',
        'week.creationGuide.fontWeight': 'bold',

        // week daygrid schedule style
        'week.dayGridSchedule.borderRadius': '2px',
        'week.dayGridSchedule.height': '24px',
        'week.dayGridSchedule.marginTop': '2px',
        'week.dayGridSchedule.marginLeft': '8px',
        'week.dayGridSchedule.marginRight': '8px'
    };

    var Calendar = tui.Calendar;
    var calendar = new Calendar('#calendar', {
        defaultView: 'week',
        taskView: false,
        scheduleView: ['time'],
        isAllDay: false,
        week: {
            startDayOfWeek: 1,
            hourStart: 7
        },
        theme: themeConfig,
        template: {
            weekDayname: function(model) {
                var splitDatetime = model.renderDate.split("-");
                var getMonthName = convertMonthNumberToMonthName(splitDatetime[1]);
                return '<span style="    font-size: 16px !important;\n' +
                    '    font-weight: 500;\n' +
                    '    line-height: 1.25;\n' +
                    '    letter-spacing: normal;\n' +
                    '    text-align: left;\n' +
                    '    padding-left: 8px; \n' +
                    '    color: #263238;' +
                    '    display: block">' +
                    '' +  model.dayName +
                    '</span><span style="    font-size: 13px;\n' +
                    '    font-weight: normal;\n' +
                    '    font-style: normal;\n' +
                    '    display: block;\n' +
                    '    text-align: left; \n' +
                    '    padding-left: 8px; \n' +
                    '    font-stretch: normal;\n' +
                    '    line-height: 1.54;\n' +
                    '    letter-spacing: normal;\n' +
                    '    color: #76838f;" >' + splitDatetime[2] + ' ' + getMonthName + '</span>';
            },
        }
    });

    calendar.createSchedules([
        {
            id: '1',
            calendarId: '1',
            title: 'my schedule',
            category: 'time',
            dueDateClass: '',
            start: '2019-03-06T22:30:00+09:00',
            end: '2019-03-06T02:30:00+09:00'
        },
        {
            id: '2',
            calendarId: '1',
            title: 'second schedule',
            category: 'time',
            dueDateClass: '',
            start: '2019-03-05T17:30:00+09:00',
            end: '2019-03-05T17:31:00+09:00',
            isReadOnly: true    // schedule is read-only
        }
    ]);

    // default keys and styles
}
function convertMonthNumberToMonthName(monthNumber) {
    var months = {
        "01" : "Jan",
        "02" : "Feb",
        "03" : "Mar",
        "04" : "Apr",
        "05" : "May",
        "06" : "Jun",
        "07" : "Jul",
        "08" : "Aug",
        "09" : "Sep",
        "10" : "Oct",
        "11" : "Nov",
        "12" : "Dec"};
    return months[monthNumber];
}