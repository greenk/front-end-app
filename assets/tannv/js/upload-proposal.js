(function(document, window, $){
  'use strict';

  var Site = window.Site;
  $(document).ready(function(){
    Site.run();

    var $inputImage = $("#inputImage");

    if (window.FileReader) {
      $inputImage.change(function () {
        var fileReader = new FileReader(),
            files = this.files,
            file;

        if (!files.length) {
          return;
        }

        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          fileReader.readAsDataURL(file);
          fileReader.onload = function () {
            $('#contain-image>img').attr('src',this.result);
            $('#inputDataWidth').val($('#contain-image>img').width());
            $('#inputDataHeight').val($('#contain-image>img').height());
            $inputImage.val("");
          };
        } else {
          showMessage("Please choose an image file.");
        }
      });
    } else {
      $inputImage.addClass("hide");
    }

    $('#add-input').click(function() {
      var $user = $('<span class="username">tannv</span>');
      $('#contain-image').append($user);
      var $pass = $('<span class="password">123456</span>');
      $('#contain-image').append($pass);
    });

    $('#get-image').click(function() {
      var contents = $("#container").html();
      var csslink = "../css/upload-proposal.css";
		  $('.img-preview').append(contents);
    });

    $('#print').click(function() {
      var contents = $("#container").html();
      var csslink = "../../assets/tannv/css/upload-proposal.css";
		  print(contents, csslink);
    });
  });
})(document, window, jQuery);

function print(html, csslink) {

    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title>Print Dialog</title>');
    frameDoc.document.write('<style>@page {margin:0; padding:0;}</style>');
    frameDoc.document.write('<link href='+csslink+' rel="stylesheet" type="text/css"></link>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(html);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();

    console.log($('iframe').innerHTML);

  	setTimeout(function () {
  		window.frames["frame1"].focus();
  		window.frames["frame1"].print();
  		document.body.removeChild(frame1);
  	}, 500);
    return false;
}
