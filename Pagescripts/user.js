$(document).ready(function () {
    $('.userentry').hide();
    LoadData();
    LoadCategory($('#Usertype'));
    BindddlData('#ddlcompany', '/Login/Getdata');
    BindddlData('#ddlUsertype', '/User/getDepartment');

})
function cleardata() {
    $('#name').val("");
    $('#mobile').val("");
    $('#email').val("");
    $('[id$=Usertype]').val("");
    $('[id$=hfsysid]').val("");
    $('#logname').val("");
    $('#pwd').val("");
    $('#hfimg').val("");
    $('[id$=hfsysid]').val("");

}
function Show() {
    cleardata();
    $('.userlist').toggle('slow');
    $('.userentry').show();

    // $('#con-close-modal').modal('show');
}
function closedata() {

    $('.userlist').toggle('slow');
    $('.userentry').hide();
    cleardata();
    ClearPreview();
    // $('#con-close-modal').modal('show');
}

var Add = function () {
   

    if (!$('#frm').valid()) {

        return false;
    }

    var file = $("#imguploader").get(0).files;
    var data = new FormData;
    data.append("img", $('#hfimg').val());
    data.append("ImageFile", file[0]);
    data.append("name", $('#name').val());
    data.append("mobile", $('#mobile').val());
    data.append("email", $('#email').val());
    data.append("usertype", $('[id$=ddlUsertype]').val());
    data.append("logname", $('#logname').val());
    data.append("pwd", $('#pwd').val());
    data.append("Sys_Id", $('[id$=hfsysid]').val());
    data.append("company_sysid", $('#ddlcompany').val());
    $.ajax({
        type: "Post",
        url: "/User/Save",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.Status == true) {
                toastr.success(result.Message);
                cleardata();
                LoadData();

                $('.userlist').toggle('show');
                $('.userentry').hide();

                ClearPreview();
            }
            else {
                toastr.error(result.Message);
            }
        },
        error: function (errormessage) {

            toastr.error(errormessage.responseText);
        }
    });
    return false;
}
function LoadData() {

    $("#gvproductlist").dataTable().fnDestroy();
    $('#gvproductlist').DataTable({
        "ajax": {
            "url": "/User/Getlist",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "SNO", "name": "SNO", "autoWidth": true },
          { "data": "name", "name": "name", "autoWidth": true },
            { "data": "usertype", "name": "usertype", "autoWidth": true },
              { "data": "mobile", "name": "mobile", "autoWidth": true },
              { "data": "email", "name": "email", "autoWidth": true },

               {
                   "data": "Sys_Id", "width": "50px", "render": function (data) {
                       return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getbyID(' + data + ')"><i style="color:teal;" class="far fa-edit"></i> </a>';
                   }

               },
            {
                "data": "Sys_Id", "width": "50px", "render": function (data) {
                    return '<a "padding:1px;" class="on-default remove-row" href="#" onclick="return Delete(' + data + ',this)"><i style="color:teal;" class="fas fa-trash-alt"></i></a>';
                }
            }
        ],
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $('#gvproductlist').DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}
var ClearPreview = function () {
    $("#imageBrowes").val('');
    $("#description").text('');
    $("#imgPreview").hide();

}
var ReadImage = function (file) {

    var reader = new FileReader;
    var image = new Image;
    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";

            $("#targetImg").attr('src', _file.target.result).width(250).height(150);

            $("#description").text("Size:" + size + ", " + height + "X " + width + ", " + type + "");
            $("#imgPreview").show();

        }

    }

}

//edit
function getbyID(Sys_Id) {

    var sys_id = Sys_Id;
    try {
        $.ajax({
            url: '/User/GetbyID',
            data: "{ 'sys_id': '" + sys_id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (Data) {
                var parsed = JSON.parse(Data);
                if (parsed.length == 1) {
                    $.map(parsed, function (Item) {
                        $('[id$=hfsysid]').val(Item.sys_id);
                        $('[id$=name]').val(Item.name);
                        $('[id$=email]').val(Item.email);
                        $('[id$=mobile]').val(Item.mobile);
                        $('[id$=ddlUsertype]').val(Item.usertype);
                        $('[id$=logname]').val(Item.logname);
                        $('[id$=pwd]').val(Item.pwd);
                        $('[id$=ddlcompany]').val(Item.company_sysid);

                        if (Item.img != null) {
                            var one = Item.img.replace("~", "");
                            var img = Item.img;
                            $('#hfimg').val(img);
                            $('#imagePreview').attr('src', one);

                        }

                        $('.userlist').toggle();
                        $('.userentry').show();
                    });
                } else {
                }
            },
            error: function (response) {
                var parsed = JSON.parse(response.responseText);
                Error_Msg(parsed.Message);
                d.resolve();
            },
            failure: function (response) {
                var parsed = JSON.parse(response.responseText);
                Error_Msg(parsed.Message);
                d.resolve();
            }
        });
    } catch (e) {

    }


}

// function for deleting employee's record
function Delete(ID) {


    swal({
        title: "Please Confirm?",
        text: 'Are you sure Do you want delete  From List..!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "No, cancel it!",

    }).then(function (dismiss) {
        // var array= (dismiss).serializeArray();
        var one = JSON.stringify(dismiss);
        if (one == '{"dismiss":"cancel"}') {
            swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
        else {
            $.ajax({
                url: "/User/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    if (result.Status == true) {

                        toastr.success(result.Message);
                        LoadData();

                    }
                    else {
                        toastr.error(result.Message);
                    }
                },
                error: function (errormessage) {
                    toastr.error(errormessage.responseText);
                }
            });
        }
    }

)
};

//dropdown using Ajax
var Categories1 = []
function LoadCategory(element) {
    if (Categories1.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/User/getDepartment',
            success: function (data) {
                Categories1 = data;
                //render catagory
                renderCategory1(element);
            }
        })
    }
    else {
        //render catagory to the element
        renderCategory1(element);
    }
}
function renderCategory1(element) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories1, function (i, val) {
        $ele.append($('<option/>').val(val.Sys_Id).text(val.Name));
    })
}

function ShowImagePreview(imageUploader, previewImage) {
    if (imageUploader.files && imageUploader.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {

            $(previewImage).attr('src', e.target.result);
        }
        reader.readAsDataURL(imageUploader.files[0]);
    }

}