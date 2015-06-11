$(function() {

  $(".no-follow").click(function(event){
    $.ajax({url: $(this).data("href")})
  })


  // Synthaxe coloration for javascript code in .html
  prettyPrint()

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
  var deleteMethod = function(methodId) {
    swal({
      title: "Are you sure?", 
      text: "Are you sure that you want to delete this method ?", 
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ec6c62"
    }, 
    function() {
      $("#delete-method-"+methodId).submit()
    }
    );
  }

  //bind sweetalert popup on click
  $(".confirm-api-delete").click(function(event){
    event.preventDefault();
    var apiId = $(this).attr("data-api-id");
    deleteApi(apiId);
  })
  $(".confirm-method-delete").click(function(event){
    event.preventDefault();
    var methodId = $(this).attr("data-method-id");
    deleteMethod(methodId);
  })
// swal({
//   title: 'Auto close alert!',
//   text: 'I will close in 2 seconds.',
//   timer: 2000,
//   showConfirmButton: false });
// });