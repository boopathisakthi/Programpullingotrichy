$(document).ready(function () {
    LoadData();

    closedata();
})


function Delete(ID) {

    deletedata(ID, "/Expense/Delete/");
}
function getbyID(SysId) {
    try {
        $.ajax({
            url: '/Expense/GetById',
            data: "{ 'sysid': '" + SysId + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('.stocklist').toggle('slow');
                $('.stockentry').show();
                
                $("#hfsysid").val(res.result.sysid);
                $("#txtentrydate").val(res.result.entrydate);
                $("#lbltotal").text(res.result.totalamount);
                $("#hftotal").val(res.result.totalamount);
                // $("#ddlsupplier").val(res.result.SupplierSysid);
                $("#txtdesc").val(res.result.description);
               
                $.each(res.result.expenselist, function (i, v) {

                  

                    if (i == 0) {
                        var row = $("#detailsTable .trbody");
                        $(row).find('.hfdetailsysid').val(v.sysid);
                        //$(row).find('.ddlexpanse').val(v.taxid);
                        $(row).find('.txtexpansedesc').val(v.description);
                        $(row).find('.ddlpaymode').val(v.paymode);
                        $(row).find('.txtrefrense').val(v.refrense);
                        $(row).find('.txtamount').val(v.amount);

                        Bindddl_Dataparms($(row).find('.ddlexpanse'), '/Expense/getexpanse',v.expensesysid);

                        $("#detailsTable tbody").append(row);
                    }

                    else {
                        var row = $("#detailsTable .trbody").last().clone();

                        var sno = parseInt($(row).find('.sno').text()) + 1;
                        $(row).find('.sno').text(sno);

                        $(row).find('.hfdetailsysid').val("");
                        //$(row).find('.ddlexpanse').val(v.taxid);
                        $(row).find('.txtexpansedesc').val("");
                        $(row).find('.ddlpaymode').val("");
                        $(row).find('.txtrefrense').val("");
                        $(row).find('.txtamount').val("");

                        $("td input:text", row).val("");
                        $('td .lbldel', row).attr("style", "display: none;");
                        $("td button[type=button]", row).val('Delete');
                        $("td button[type=button]", row).attr("style", "display: block");
                        $("td input[type=date]", row).val('');
                        $("td input[type=time]", row).val('');



                        $(row).find('.hfdetailsysid').val(v.sysid);
                        //$(row).find('.ddlexpanse').val(v.taxid);
                        $(row).find('.txtexpansedesc').val(v.description);
                        $(row).find('.ddlpaymode').val(v.paymode);
                        $(row).find('.txtrefrense').val(v.refrense);
                        $(row).find('.txtamount').val(v.amount);

                        Bindddl_Dataparms($(row).find('.ddlexpanse'), '/Expense/getexpanse', v.expensesysid);

                        $("#detailsTable tbody").append(row);

                    }

                });

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

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "entrydate";
    data[2] = "description";
    data[3] = "totalamount";

    binddata("#Gvlist", "/Expense/GetList", data);
}
function calatotalamount(ctrl) {
    let total = 0;
    $('#detailsTable tbody tr').each(function (i, ele) {
        if ($('.ddlexpanse', this).val() != '0') {          
            total = parseFloat(total) + parseFloat($('.txtamount', this).val());
        }
    });
    $('#hftotal').val(parseFloat(total).toFixed(2));
    $('#lbltotal').text(parseFloat(total).toFixed(2));
    Add_Rows();
}
function saveprocess() {
    try {

        var Deatil = [];

        $('#detailsTable tbody tr').each(function (index, ele) {
            if ($('.ddlexpanse', this).val() != '0' && $('.ddlspare', this).val() != 0) {
                let details = {
                    sysid: $('.hfdetailsysid', this).val(),
                    expensesysid: $('.ddlexpanse', this).val(),
                    description: $('.txtexpansedesc', this).val(),
                    paymode: $('.ddlpaymode', this).val(),
                    refrense: $('.txtrefrense', this).val(),
                    amount: $('.txtamount', this).val(),
                    isdeleted: ($('.del', this).val())
                }
                Deatil.push(details);
            }
        })

        if (Deatil.length == 0) {
            toastr.error('Invalid Spare Details Unable to Process')
            return false;
        }

        var data = {
            sysid: $("#hfsysid").val(),
            entrydate: $("#txtentrydate").val(),
            description: $('#txtdesc').val(),
            totalamount: $('#hftotal').val(),
            expenselist: Deatil
        }

        return insertdata("#frm", data, "/Expense/save");
        cleardata();


    } catch (ex) {
        toastr.error(ex);
    }
}


function show() {
    cleardata();

    $('.stocklist').toggle('slow');
    $('.stockentry').show();


    var currentTime = new Date();

    $("#txtentrydate").datepicker().datepicker("setDate", currentTime);

    Bindddl_Data($(row).find('.ddlexpanse'), '/Expense/getexpanse');

}
function closedata() {

    $('.stocklist').show();
    $('.stockentry').hide();
    cleardata();

}
function cleardata() {

    $("#detailsTable tbody").find("tr:gt(0)").remove();
    $("#hfsysid").val("");
    $("#txtdesc").val("");
    $('#txtdescription').val('')
    // $('#con-close-modal').modal('hide');
    var row = $("#detailsTable .trbody");

    $(row).find('.hfdetailsysid').val("");
    $(row).find('.ddlexpanse').val("0");
    $(row).find('.txtexpansedesc').val("");
    $(row).find('.ddlpaymode').val("Cash");
    $(row).find('.txtrefrense').val("");
    $(row).find('.txtamount').val("0.00");

    Bindddl_Data($(row).find('.ddlexpanse'), '/Expense/getexpanse');

}
function Add_Rows() {
    var row = $("#detailsTable .trbody").last().clone();
    clears(row);
    $('#detailsTable').append(row);
    $(row).find('.ddlexpanse').focus();
    return false;
}
function clears(row) {
    var sno = parseInt($(row).find('.sno').text()) + 1;
    $(row).find('.sno').text(sno);
    $(row).find('.ddlexpanse').val("0");
    $(row).find('.sysid').val("");
    $(row).find('.hfdetailsysid').val("");

    $(row).find('.txtexpansedesc').val("");
    $(row).find('.ddlpaymode').val("Cash");
    $(row).find('.txtrefrense').val("");
    $(row).find('.txtamount').val("0.00");
    Bindddl_Data($(row).find('.ddlexpanse'), '/Expense/getexpanse');
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