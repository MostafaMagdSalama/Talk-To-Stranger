$(document).ready(function(){
    $("#myModal").modal('show');
    $("#input-message").prop("disabled",true);
});


$('#myModal').modal({backdrop:'static', keyboard:false});

   
   
    $("#input-message").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
           send();
        }
    });
    $("#text-1542372332072").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
         go();
        }
    });
    
  

