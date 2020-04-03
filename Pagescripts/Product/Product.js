$(document).ready(function () {

    $("#wait").hide();

    $(".dis").attr("disabled", "disabled");
    BindddlData($('#ddlcategory'), '/Product/GetcategoryList');
    
    LoadData();
})
function cleardata() {
    $('#txtpartnumber').val('');
    $('#txtpartdescription').val('');
    $('#ddlcategory').val('0');
    $('#txtbinlocation').val('');
    $('#txtstockqty').val('');
    $('#hfsysid').val('');
    $('#hfqty').val('');
}
function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "PartCategory";
    data[2] = "PartNumber";
    data[3] = "Partdescription";
    data[4] = "BinLocation";

    binddata("#Gvlist", "/Product/Getlist", data);
}
function Add() {

    if ($('#txtpartnumber').val() == '' ||
         $('#txtpartdescription').val() == '' ||
         
        $('#ddlcategory').val() == '0') {
        toastr.error('Please Check Some Inputs Are Missing');
    } else {

        var Product = {
            PartNumber: $('#txtpartnumber').val(),
            Partdescription: $('#txtpartdescription').val(),
            PartCategory: $('#ddlcategory').val(),
            BinLocation: $('#txtbinlocation').val(),
            CurrentStock: $('#txtstockqty').val(),
            excistingqty: $('#hfqty').val(),
            Sysid: $('#hfsysid').val()
        };
        return insertdata("#frm", Product, "/Product/Save");
        $('#con-close-modal1').modal('show');
    }
}
function getbyID(SysId) {

    editassignvalue(SysId, '/Product/GetbyID')
}

function assignvalue(Item) {
    $('#hfsysid').val(Item.sys_id);
    $('#txtpartnumber').val(Item.partnumber);
    BindddlData($('#ddlcategory'), '/Product/GetcategoryList');
    $('#ddlcategory').val(Item.part_category);
    $('#txtbinlocation').val(Item.binlocation);
    $('#txtstockqty').val(Item.stock);
    $('#hfqty').val(Item.stock);
    $('#txtpartdescription').val(Item.partdescription);
    $('#con-close-modal1').modal('show');
}

function Delete(ID) {
    deletedata(ID, "/Product/Delete/")
}

var Uploadbulkexcel = function () {
    var file = $("#Fileupload").get(0).files;
    var data = new FormData;
    data.append("ExcelFile", file[0]);

    $("#wait").show();

    $.ajax({

        type: "Post",
        url: "/Product/UploadExcel",
        data: data,
        contentType: false,

        processData: false,
        success: function (result) {
            if (result.Status == true) {
                $("#wait").hide();
                //LoadProgressBar(result);
                toastr.success(result.Message);
                LoadData();
            }
            else {
                $("#wait").hide();
                toastr.error(result.Message);
            }
        },
        error: function (errormessage) {

            toastr.error(errormessage.responseText);
        }
    });
    return false;
}
var Uploadbulkexcelbranch = function () {
    var file = $("#Fileupload").get(0).files;
    var data = new FormData;
    data.append("ExcelFile", file[0]);

    $("#wait").show();

    $.ajax({

        type: "Post",
        url: "/Product/StockTransfer",
        data: data,
        contentType: false,

        processData: false,
        success: function (result) {
            if (result.Status == true) {
                $("#wait").hide();
                //LoadProgressBar(result);
                toastr.success(result.Message);
                LoadData();
            }
            else {
                $("#wait").hide();
                toastr.error(result.Message);
            }
        },
        error: function (errormessage) {

            toastr.error(errormessage.responseText);
        }
    });
    return false;
}

function DownloadData() {



        var FilterParameter = {
            Fdate: 'test',
            //Tdate: $('#ToDate').val(),
            //lorry: $('#ddllorry').val(),
            //driver: $('#ddldriver').val(),
            //party: $('#ddlparty').val()

        }

        $.ajax({
            url: "/Product/Downloadex/",
            data: JSON.stringify(FilterParameter),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (Rdata) {

                if (Rdata.Status == false) {


                    toastr.error("Something Went Wrong");

                }
                else {
                    debugger;
                    var bytes = new Uint8Array(Rdata.FileContents);
                    var blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    var d = new Date($.now());
                    var time = (d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                    link.download = "Product List" + time + ".xlsx";
                    link.click();
                }

            },
            error: function (err) {
                toastr.error("Something Went Wrong");
            }

        });
        return false;

}