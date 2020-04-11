/*-----------------------------------bind datatables ------------------------------------*/

function binddata(tablename, uri, data) {
   
    var datacount = data.length;
    for (i = 0; i < datacount; i++)
    {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    data[datacount] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getbyID(' + data + ')"><i style="color:teal;" class="far fa-edit"></i> </a>';
        }

    });
    data[datacount + 1] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a "padding:1px;" class="on-default remove-row" href="#" onclick="return Delete(' + data + ',this)"><i style="color:teal;" class="fas fa-trash-alt"></i></a>';
        }
    });
    $(tablename).dataTable().fnDestroy();
    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json"
           
        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}
function bindReportdata(tablename, uri, data) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    
    $(tablename).dataTable().fnDestroy();
    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json"

        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}
function baindatataparams(tablename, uri, data, fileparameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    data[datacount] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getbyID(' + data + ')"><i style="color:teal;" class="far fa-edit"></i> </a>';
        }

    });
    data[datacount + 1] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a "padding:1px;" class="on-default remove-row" href="#" onclick="return Delete(' + data + ',this)"><i style="color:teal;" class="fas fa-trash-alt"></i></a>';
        }
    });
    $(tablename).dataTable().fnDestroy();
    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json",
            "data": fileparameter

        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}

function binddataview(tablename, uri, data) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    data[datacount] = eval({
        "data": "Sysid", "width": "50px", "render": function (data) {
               
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5 rowval" href="#" onclick="return getbyID('+data+')"><i style="color:teal;" class="fas fa-eye"></i> </a>';
           }
        });
    $(tablename).dataTable().fnDestroy();
    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json"

        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}

function binddataedit(tablename, uri, data) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    data[datacount] = eval({
        "data": "Sysid", "width": "50px", "render": function (data) {

            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5 rowval" href="#" onclick="return getbyID(' + data + ')" ><i style="color:teal;" class="far fa-edit"></i></a>';
        }
    });
    $(tablename).dataTable().fnDestroy();
    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json"

        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}
/*-----------------------------------start CRUD Process ------------------------------------*/

function insertdata(frmname, fieldvalue,uri) {
    if (!$(frmname).valid()) {
        return false;
    }
    $.ajax({
        url: uri,
        data: JSON.stringify(fieldvalue),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Status == true) {
                toastr.success(result.Message);
                afterinsertupdate();
              
            }
            else {
                toastr.error(result.Message);

            }

        },
        error: function (errormessage) {

            toastr.error(errormessage.responseText);
        }

    });
    return false
}

function editassignvalue(sys_id, uri) {
    // alert(sys_id);
    try {
        $.ajax({
            url: uri,
            data: "{ 'Sysid': '" + sys_id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (Data) {
                var parsed = JSON.parse(Data);
                if (parsed.length == 1) {
                    $.map(parsed, function (Item) {
                        assignvalue(Item)
                        //$('[id$=hfsysid]').val(Item.sys_id);
                        //$('#ExpenseName').val(Item.expensename);
                        //$('#Description').val(Item.description);
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

function deletedata(id, uri) {


    swal({
        title: "Please Confirm?",
        text: 'Are you sure Do you want delete from List..!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "No, cancel it!",

    }).then(function (dismiss) {
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
                url: uri + id,
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


//---------------------------Excel File Uploads-------------------------------//
var excelupload = function (fileid, uploaduri) {
    var file = $(fileid).get(0).files;
    var data = new FormData;

    data.append("ExcelFile", file[0]);


    $.ajax({
        type: "Post",
        url: uploaduri,
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.Status == true) {
                LoadProgressBar(result);
                LoadData();
                cleardata();
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


//--------------------------get drobdown datas--------------------------------------//

function Getdatawithctrl(ctrl, Data, uri) {
    try {
        $.ajax({
            url: uri,
            data: "{ 'Data': '" + Data + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (Data) {
                var parsed = JSON.parse(Data);
                if (parsed.length == 1) {
                    $.map(parsed, function (Item) {

                        SetValues(ctrl, Item)

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

var Categories = []
function BindddlData(element, Url) {
    if (Categories.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: Url,
            success: function (data) {
              
                Categories = data;
                //render catagory
                renderCategory(element);
                
            }
        })
    }
    else {
        //render catagory to the element
        renderCategory(element);
    }
}
function renderCategory(element) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories, function (i, val) {
        $ele.append($('<option/>').val(val.Sysid).text(val.Name));
    })
    $(element).val('0');
}
var Categories_Data = []
function Bindddl_Data(element, Url) {
    Categories_Data = '';
    if (Categories_Data.length == 0) {
        //ajax function for fetch data

        $.ajax({
            type: "GET",
            url: Url,
            success: function (data) {

                Categories_Data = data;
                //render catagory
                render_Category(element);

            }
        })
    }
    else {
        //render catagory to the element
        render_Category(element);
    }
}
function render_Category(element) {
    
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories_Data, function (i, val) {
        $ele.append($('<option/>').val(val.sysid).text(val.name));
    })
    $(element).val('0');
}
function Bindddl_Dataparms(element, Url, id) {
    Categories_Data = '';
    if (Categories_Data.length == 0) {
        //ajax function for fetch data

        $.ajax({
            type: "GET",
            url: Url,
            success: function (data) {

                Categories_Data = data;
                //render catagory
                render_Category541(element, id);

            }
        })
    }
    else {
        //render catagory to the element
        render_Category541(element, id);
    }
}
function render_Category541(element, id) {

    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories_Data, function (i, val) {
        $ele.append($('<option/>').val(val.sysid).text(val.name));
    })
    $(element).val(id);
}
function BindddlDataele(element, Url, item) {
    Categories = '';
    if (Categories.length == 0) {
        //ajax function for fetch data

        $.ajax({
            type: "GET",
            url: Url,
            success: function (data) {
              
                Categories = data;
                //render catagory
                renderCategoryele(element, item);
                
            }
        })
    }
    else {
        //render catagory to the element
        renderCategory(element);
    }
}

function renderCategoryele(element,item) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories, function (i, val) {
      
        $ele.append($('<option/>').val(val.sysid).text(val.name));
    })
   
    $(element).val(item);
}

function Parameterbinddata(tablename, uri, data, FilterParameter) {
  
    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
  

    $(tablename).dataTable().fnDestroy();

    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json",
            "data": FilterParameter
        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"><"col-md-3"><"col-md-4">>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}

function Parameterbindwithviewdata(tablename, uri, data, FilterParameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
   
    data[datacount] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getdetails(\'' + data + '\')"><i style="color:teal;" class="far fa-eye"></i>  </a>';
        }
    });

    $(tablename).dataTable().fnDestroy();

    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json",
            "data": FilterParameter
        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"><"col-md-3"><"col-md-4">>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}


var ddllist = []
function Drobdownbindsearch(element, Url) {
    ddllist = '';
    if (ddllist.length == 0) {
        $.ajax({
            type: "GET",
            url: Url,
            success: function (data) {
                ddllist = data;
                renderdatas(element);
                //$(element).selectpicker('val','0');

            }
        })
    }
    else {
        //render catagory to the element
        renderdatas(element);
    }
}
function renderdatas(element) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('').text('Select'));
    //  $(element).append('<option value="0"> Select </option>');
    $.each(ddllist, function (i, val) {

        $ele.append($('<option/>').val(val.sysid).text(val.name));
    })
    $(element).val('0').selectpicker('refresh');

}
function Drobdownbindsearchwithid(element, Url, id) {
    ddllist = '';
    if (ddllist.length == 0) {
        $.ajax({
            type: "GET",
            url: Url,
            success: function (data) {
                ddllist = data;
                renderdatawithid(element, id);
                //$(element).selectpicker('val','0');

            }
        })
    }
    else {
        //render catagory to the element
        renderdatawithid(element, id);
    }

}
function renderdatawithid(element, id) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('').text('Select'));
    //  $(element).append('<option value="0"> Select </option>');
    $.each(ddllist, function (i, val) {

        $ele.append($('<option/>').val(val.sysid).text(val.name));
    })
    $(element).val(id).selectpicker('refresh');
}