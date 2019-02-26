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
        addDetailElement();
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
