$(function() {

  //Call a popup with the sweetAlert lib
  var deleteApi = function(apiId) {
    swal({
      title: "Are you sure?", 
      text: "Are you sure that you want to delete this Api ?", 
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    }, 
    function() {
      $("#delete-api-"+apiId).submit()
    }
    );
  }

  //bind sweetalert popup on click
  $(".confirm-api-delete").click(function(event){
    event.preventDefault();
    var apiId = $(this).attr("data-api-id");
    deleteApi(apiId);
  })
});