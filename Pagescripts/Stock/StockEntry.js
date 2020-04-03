var enter = false;
$(document).ready(function () {
    LoadData();
    $('.stockentry').hide();
    $("#wait").hide();
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);

    $("#txtentrydate").datepicker().datepicker("setDate", startDateFrom);
    $("#txtentrydate1").datepicker().datepicker("setDate", startDateFrom);

    $("#detailsTable tbody").on('keypress', '.partnumber', function (e) {
        if (e.which == 13) {
            var currentRow = $(this).closest("tr");
            getproductdetails($(currentRow).find('.partnumber'));
          //  $(currentRow).find('.qty').focus();
            if ($(currentRow).find('.partcategory').val() != '') {


                //  $(currentRow).find('.saleqty').focus();
                $(currentRow).find('.qty').val('1');
                if ($('.hfdetailsysid').val() == '') {
                    Add_Rows();
                }
            }
           
        }
    });

})


function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "Entrydate";
    data[2] = "SupplierSysid";
    data[3] = "Description";
    data[4] = "logname";
    binddata("#gvproductlist", "/Stock/GetList", data);
}
function Show() {
    cleardata();
    $('.stocklist').toggle('slow');
    $('.stockentry').show();
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);

    //  $("#txtentrydate").datepicker().datepicker("setDate", startDateFrom);
    $("#txtentrydate").datepicker().datepicker("setDate", currentTime);
    // $('#con-close-modal').modal('show');
}
function closedata() {

    $('.stocklist').toggle('slow');
    $('.stockentry').hide();
    cleardata();

    // $('#con-close-modal').modal('show');
}



function CalTotal() {
    var naveen = 0;

    $("#detailsTable tbody").find("tr").each(function () {
        var del = $(this).find('.del').val();
        var dieselamt = $(this).find('.diselamt').val() == '' ? 0 : $(this).find('.diselamt').val();
        if (del == 'Deleted') {
            total = 0;
            $(this).find('.diselamt').val(total);
            naveen = parseFloat(naveen) - parseFloat(total);
            // $('[id$=lbldieselamt]').html(naveen);

        }
        else {
            naveen = parseFloat(dieselamt) + (parseFloat(naveen));
            // $('[id$=lbldieselamt]').html(naveen);

        }
    });
}
function Delete(ID) {

    deletedata(ID, "/Stock/Delete/");
}
var currenttxtbox;


function getproductdetails(ctrl) {
  
        var countid = $(ctrl).val();
        var partnumber = $(ctrl).closest('tr').find('.partnumber');
        var partdescription = $(ctrl).closest('tr').find('.partdescription');
        var partcategory = $(ctrl).closest('tr').find('.partcategory');
        var binlocation = $(ctrl).closest('tr').find('.binlocation');
        // var qty = $(ctrl).closest('tr').find('.qty');

        // var qty = $(ctrl).closest('tr').find('.qty');
        try {
            $.ajax({
                url: '/SalesEntry/GetbyproductID',
                data: "{ 'partnumber': '" + countid + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (Data) {

                    var parsed = JSON.parse(Data);
                    if (parsed.length == 1) {
                        $.map(parsed, function (Item) {

                            $(ctrl).closest('tr').find('.partnumber').val('');
                            partnumber.val(Item.partnumber);
                            partdescription.val(Item.partdescription);
                            partcategory.val(Item.part_category);
                            // qty.val(Item.Availableqty);
                            binlocation.val(Item.binlocation);
                        });
                    } else {
                        toastr.error('Part Number Not Exist');
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

$('#btnsave').click(function () {


    //if (Table_Validate() == true) {
    try{

    var list = [];

    $('#detailsTable tbody tr').each(function (index, ele) {
        if ($('.partnumber', this).val() != '') {

            if ($('.partcategory', this).val() == '') {
              //  alert()
                throw new Error('partnumber does not excist')
            }
            var StockDetails = {
                Sysid: $('.hfdetailsysid', this).val(),
                Partnumber: $('.partnumber', this).val(),
                PartDescription: $('.partdescription', this).val(),
                partcategory: $('.partcategory', this).val(),
                BinLocation: $('.binlocation', this).val(),
                Qty: $('.qty', this).val(),
                excistingqty: $('.hfqty', this).val(),

                IsDeleted: ($('.del', this).val())
            }
            list.push(StockDetails);

        }
    })

     var data = {
            Sysid: $("#hfsysid").val(),
            Entrydate: $("#txtentrydate").val(),
            SupplierSysid: $('#ddlsupplier').val(),
            Description: $('#txtdesc').val(),
            StockDetails: list
        }

        return Startinsertdata("#frm", data, "/Stock/save");
    // }

    } catch (ex) {
        toastr.error(ex);
    }
});

function Startinsertdata(frmname, fieldvalue, uri) {
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
                cleardata();
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
    return false
}
var Uploadbulkexcel = function () {
    var file = $("#Fileupload").get(0).files;
    var data = new FormData;
    data.append("ExcelFile", file[0]);
    data.append("Entrydate", $("#txtentrydate1").val());
    data.append("SupplierSysid", $('#ddlsupplier').val());
    data.append("Description", $('#txtdesc').val());

    $("#wait").show();

    $.ajax({

        type: "Post",
        url: "/Stock/UploadExcel",
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
function cleardata() {

    $("#detailsTable tbody").find("tr:gt(0)").remove();
    $("#hfsysid").val("");
    $("#txtentrydate").val("");
    // $("#txtjobcard").val("");
    $("#txtdesc").val("");

    // $('#con-close-modal').modal('hide');
    var row = $("#detailsTable .trbody");

    $(row).find('.hfdetailsysid').val("");
    $(row).find('.partnumber').val("");
    $(row).find('.partdescription').val("");
    $(row).find('.partcategory').val("");
    $(row).find('.binlocation').val("");
    $(row).find('.qty').val("");
    // $(row).find('.saleqty').val("");

}

function Add_Rows() {
    var row = $("#detailsTable .trbody").last().clone();
    clears(row);
    $('#detailsTable').append(row);
    $(row).find('.partnumber').focus();

    return false;
}
function clears(row) {
    var sno = parseInt($(row).find('.sno').text()) + 1;
    $(row).find('.sno').text(sno);
    $(row).find('.ddl').val("0");
    $(row).find('.sysid').val("");
    $(row).find('.hfdetailsysid').val("");
    
    $(row).find('.partnumber').val("");

    $(row).find('.partnumber').focus();
    $(row).find('.partdescription').val("");
    $(row).find('.partcategory').val("");
    $(row).find('.binlocation').val("");
    $(row).find('.qty').val("");

    $("td input:text", row).val("");
    $('td .lbldel', row).attr("style", "display: none;");
    $("td button[type=button]", row).val('Delete');
    $("td button[type=button]", row).attr("style", "display: block");
    $("td input[type=date]", row).val('');
    $("td input[type=time]", row).val('');

}
$("#detailsTable tbody").on('click', '.del', function () {
    var currentRow = $(this).closest("tr");
    $(currentRow).find('.del').val("Deleted");
    $(currentRow).find('.del').attr("style", "display: none;");
    $(currentRow).find('.lbldel').attr("style", "display: block;");
    check();
});

function getbyID(Sysid) {
    var sys_id = Sysid;

    try {
        $.ajax({
            url: '/Stock/GetById',
            data: "{ 'orderId': '" + sys_id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                var detArr = [];
                $("#hfsysid").val(res.result.Sysid);
                $("#txtentrydate").val(res.result.Entrydate);
                $("#ddlsupplier").val(res.result.SupplierSysid);
                $("#txtdesc").val(res.result.Description);
                //  $("#hfsysid").val(res.result.SysId);
                $.each(res.result.StockDetails, function (i, v) {


                    //  detArr.push('<tr><td>' + v.ProductName + '</td><td>' + v.Amount + '</td><td>' + v.Quantity + '</td><td>' + (parseFloat(v.Amount) * parseInt(v.Quantity)) + '</td><td><a data-itemId="' + v.DetailId + '" href="#" class="deleteItem">Delete</a> | <a href="#" data-itemId="' + v.DetailId + '" class="editDetail">Edit</a></td></tr>')
                    //detArr.push('<tr><td><input type="text" id="currentName" value=' + 1 + ' /><input type="hidden" id="hfdetailsysid" class="hfdetailsysid" value=' + v.OrderDetailsId + '></td><td><input type="text" id="current Name" class="product" value=' + v.ProductID + ' /></td><td><input type="text" id="current Name" class="quantity" value=' + v.Quantity + ' /></td><td><input type="text" id="current Name" class="rate" value=' + v.Rate + ' /></td><td> <button type="button" value="Delete" class="btn btn-icon btn-danger del" tabindex="5"><i class="fa fa-trash-o"></i></button>  </td></tr>')
                    if (i == 0) {
                        var row = $("#detailsTable .trbody");
                        $(row).find('.partnumber').val(v.Partnumber);
                        $(row).find('.partdescription').val(v.PartDescription);
                        $(row).find('.partcategory').val(v.partcategory);
                        $(row).find('.binlocation').val(v.BinLocation);
                        $(row).find('.qty').val(parseInt(v.Qty));
                        $(row).find('.hfqty').val(parseInt(v.Qty));
                        // $(row).find('.saleqty').val(v.SalesQty);
                        //   $(row).find('.total').val(v.Total);
                        $(row).find('.hfdetailsysid').val(v.Sysid);

                        $("#detailsTable tbody").append(row);
                    }

                    else {
                        var row = $("#detailsTable .trbody").last().clone();

                        var sno = parseInt($(row).find('.sno').text()) + 1;
                        $(row).find('.sno').text(sno);
                        $(row).find('.hfdetailsysid').val("");
                        $("td input:text", row).val("");
                        $('td .lbldel', row).attr("style", "display: none;");
                        $("td button[type=button]", row).val('Delete');
                        $("td button[type=button]", row).attr("style", "display: block");
                        $("td input[type=date]", row).val('');
                        $("td input[type=time]", row).val('');
                        //$(row).find('.hfdetailsysid').val(v.OrderDetailsId);
                        //$(row).find('.Categoryid').val(2);


                        $(row).find('.partnumber').val(v.Partnumber);
                        $(row).find('.partdescription').val(v.PartDescription);
                        $(row).find('.partcategory').val(v.partcategory);
                        $(row).find('.binlocation').val(v.BinLocation);
                        $(row).find('.qty').val(parseInt(v.Qty));
                        $(row).find('.hfqty').val(parseInt(v.Qty));
                        // $(row).find('.saleqty').val(v.SalesQty);
                        //   $(row).find('.total').val(v.Total);
                        $(row).find('.hfdetailsysid').val(v.Sysid);

                        $("#detailsTable tbody").append(row);

                    }

                });

                $('.stocklist').toggle('slow');
                $('.stockentry').show();

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