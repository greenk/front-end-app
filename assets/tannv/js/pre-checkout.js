(function(document, window, $) {
    'use strict';
    var Site = window.Site;
    var _jquery2 = babelHelpers.interopRequireDefault($);
    $(document).ready(function() {
        Site.run();

        // Add service
        $('#btn-add-service').click(function () {
          var categoryList = [
            {id: 1, name: 'Manicure', price: ''},
            {id: 2, name: 'Pedicure', price: ''},
            {id: 3, name: 'Gel Polish', price: ''}
          ];

          showAddServiceModal(1, categoryList, '');
        });

        var serviceList = [
          {id: 1, name: 'Signature Manicure', price: '$20.00'},
          {id: 2, name: '“Smooth Operator” Manicure', price: '$25.00'},
          {id: 3, name: '“Love Me Tender” Manicure', price: '$30.00'}
        ];

        $('#btn-next').click(function () {
          showAddServiceModal(2, serviceList, 'Manicure');
        });

        $('#list-order').on('click', 'li', function() {
          $('#list-order>li').removeClass('active');
          if(!$(this).hasClass('active')) $(this).addClass('active');
        });

        // Change Services
        $('.sp-change-service').click(function () {
          showAddServiceModal(2, serviceList, 'Manicure');
        });

        // Add employee
        $('#btn-add-employee').click(function () {
          showAddEmployeeModal('');
        });

        // Change employees
        $('.sp-exchange').click(function () {
          showAddEmployeeModal('');
        });


    });
})(document, window, jQuery);

/*
Func: showAddServiceModal
Auth: tannv
Para: type: 1: Category, 2: Service
      objectList: list object add to modal content
      category: Category
*/
function showAddServiceModal(type, objectList, category) {
  if(type == 1) {
    $('#title-icon').hide();
    $('#title-name').html('Category');
    $('#title-category').html('');
  } else {
    $('#title-icon').show();
    $('#title-name').html('Service');
    $('#title-category').html(category);
  }
  if(objectList.constructor === Array) {
    var html = '';
    objectList.forEach(function(element) {
      html += '<li class="nn-item">' +
                '<span class="nn-num">'+ element.id +'</span>' +
                '<span class="nn-name">'+ element.name +'</span>' +
                '<span class="nn-price font-weight-bold">'+ element.price +'</span>' +
                '<span class="nn-tick icon wb-check d-none"></span>' +
                '</li>'
    });

    $('#list-order').html(html);
  }

  if(!($("#addServiceModal").data('bs.modal') || {isShown: false}).isShown) $('#addServiceModal').modal('show');
}

/*
Func: showAddEmployeeModal
Auth: tannv
Para: employeeList
*/
function showAddEmployeeModal(employeeList) {
  if(!($("#addEmployeeModal").data('bs.modal') || {isShown: false}).isShown) $('#addEmployeeModal').modal('show');
}
