$(document).on("click", ".open-AddStudentDialog", function (e) {

	e.preventDefault();

	var _self = $(this);

    var info = _self.data('id').split(';');
    var infoNumero = info[0];
    var infoNome = info[1];
    var infoGit = info[2];
    $("#editNumber").val(infoNumero);
    $("#editName").val(infoNome);
    $("#editGit").val(infoGit);

    $(_self.attr('data-target')).modal('show')

});


$(document).ready(function(){
    $('#btn_upload').click(function(){
  
      var fd = new FormData();
      var files = $('#file')[0].files[0];
      fd.append('file',files);
  
      // AJAX request
      $.ajax({
        url: 'upload.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(response){
          if(response != 0){
            // Show image preview
            $('#preview').append("<img src='"+response+"' width='100' height='100' style='display: inline-block;'>");
          }else{
            alert('file not uploaded');
          }
        }
      });
    });
  });

