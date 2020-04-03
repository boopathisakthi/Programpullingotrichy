
$(document).ready(function () {
    $('#wrapper').addClass("enlarged forced");
    $('ul').removeAttr("style");
    LoadData();
    $('.list').show('slow');
    $('.salesentry').toggle('slow');
    Bindddl_Data($('.ddlspare'), '/Sparepart/Getdropdown_Spare');
})

function saveprocess() {
    try {

        var Deatil = [];

        $('#detailsTable tbody tr').each(function (index, ele) {

            if ($('.ddlspare', this).val() != '' && $('.ddlspare', this).val() != 0) {


                let details = {
                    sysid: $('.hfdetailsysid', this).val(),
                    spare_sysid: $('.ddlspare', this).val(),
                    sparename: $('.ddlspare', this).find('option:selected').text(),
                    hsncode: $('.hsncode', this).val(),
                    taxname: $('.taxname', this).val(),
                    taxid: $('.hftaxid', this).val(),
                    salesprice: $('.salesprice', this).val(),
                    qty: $('.qty', this).val(),
                    amount: $('.amount', this).val(),
                    isdeleted: ($('.del', this).val())
                }
                Deatil.push(details);

            }
        })


        if ($("#txtproductname").val() == '') {
            toastr.error('Please Enter System Name')
            return false;
        }
        if ($("#txthsncode").val() == '') {
            toastr.error('Please Enter HSN Code')
            return false;
        }
        if (Deatil.length == 0) {
            toastr.error('Invalid Spare Details Unable to Process')
            return false;
        }

        var data = {
            sysid: $("#hfsysid").val(),
            productname: $("#txtproductname").val(),
            hsn: $('#txthsncode').val(),
            description: $('#txtdescription').val(),
            gst5amount: $('#gst5amount').val(),
            gst12amount: $('#gst12amount').val(),
            gst18amount: $('#gst18amount').val(),
            gst28amount: $('#gst28amount').val(),
            SpareDetails: Deatil
        }

        return insertdata("#frm", data, "/ProductMap/save");



    } catch (ex) {
        toastr.error(ex);
    }
}
function afterinsertupdate() {
    LoadData();
    cleardata();
}

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "productname";
    data[2] = "hsn";
    data[3] = "createdby";
    data[4] = "createdate";
    binddata("#Gvlist", "/ProductMap/Getlist", data);
}
function show() {
    cleardata();

    $('.list').toggle('slow');
    $('.salesentry').show('slow');
}
function closedata() {
  
  
    cleardata();
    $('.list').toggle('slow');
    $('.salesentry').hide();
    //location.reload();

}
function getbyID(SysId)
{
    try {
        $.ajax({
            url: '/ProductMap/Get_ProductMap_Edit',
            data: "{ 'sysid': '" + SysId + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                show();

                $("#hfsysid").val(res.result.sysid);
                $("#txtproductname").val(res.result.productname);
                $("#txthsncode").val(res.result.hsn);
                $("#txtdescription").val(res.result.description);

                $.each(res.result.SpareDetails, function (i, v) {



                    if (i == 0) {
                        var row = $("#detailsTable .trbody");
                        BindddlDataele($(row).find('.ddl'), '/Sparepart/Getdropdown_Spare', v.spare_sysid);
                        $(row).find('.hfdetailsysid').val(v.sysid);
                        $(row).find('.hftaxid').val(v.taxid);
                        $(row).find('.salesprice').val(v.salesprice);
                        $(row).find('.hsncode').val(v.hsncode);
                        $(row).find('.taxname').val(v.taxname);
                        $(row).find('.qty').val(v.qty);
                        $(row).find('.amount').val(v.amount);

                       

                      


                        $("#detailsTable tbody").append(row);
                    }

                    else {
                        var row = $("#detailsTable .trbody").last().clone();

                        var sno = parseInt($(row).find('.sno').text()) + 1;
                        $(row).find('.sno').text(sno);
                        $(row).find('.hfdetailsysid').val("");
                        $(row).find('.hftaxid').val("");
                        $(row).find('.purchaseprice').val("");
                        $(row).find('.hsncode').val("");
                        $(row).find('.qty').val("");

                       

                       
                        $("td input:text", row).val("");
                        $('td .lbldel', row).attr("style", "display: none;");
                        $("td button[type=button]", row).val('Delete');
                        $("td button[type=button]", row).attr("style", "display: block");
                        $("td input[type=date]", row).val('');
                        $("td input[type=time]", row).val('');


                        BindddlDataele($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare', v.spare_sysid);
                        $(row).find('.hfdetailsysid').val(v.sysid);
                        $(row).find('.hftaxid').val(v.taxid);
                        $(row).find('.salesprice').val(v.salesprice);
                        $(row).find('.hsncode').val(v.hsncode);
                        $(row).find('.qty').val(v.qty);
                        $(row).find('.taxname').val(v.taxname);
                        $(row).find('.amount').val(v.amount);
                      
                       
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


function Delete(ID) {

    deletedata(ID, "/ProductMap/Delete/");
}


function cleardata() {

    $("#detailsTable tbody").find("tr:gt(0)").remove();
    $(".gstdetails").empty("");
    $("#txttotal").val("");
    $("#hfsysid").val("");
    $("#txtproductname").val("");
    $("#txthsncode").val("");
    $("#txtopeningstock").val("");
    $("#txtdescription").val("");


    var row = $("#detailsTable .trbody");

    $(row).find('.hfdetailsysid').val("");
    $(row).find('.hftaxid').val("");
    $(row).find('.purchaseprice').val("");
    $(row).find('.salesprice').val("");
    $(row).find('.hsncode').val("");
    $(row).find('.taxname').val("");
    $(row).find('.amount').val("");
    $(row).find('.qty').val("");

   Bindddl_Data($('.ddlspare'), '/Sparepart/Getdropdown_Spare');

}

function getsparedetail(ctrl) {


    $.ajax({
        url: '/Sparepart/GetbyID',
        data: "{ 'sysid': '" + $(ctrl).val() + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var data = JSON.parse(data)
            $(ctrl).closest('tr').find('.hsncode').val(data[0].hsncode);
            $(ctrl).closest('tr').find('.taxname').val('GST 18%');
            $(ctrl).closest('tr').find('.purchaseprice').val(data[0].purchaseprice)
            $(ctrl).closest('tr').find('.salesprice').val(data[0].salesprice)
            $(ctrl).closest('tr').find('.hftaxid').val(data[0].taxid)
            $(ctrl).closest('tr').find('.qty').focus()

            if (parseInt($(ctrl).closest('tr').find('.sno').text()) == parseInt($('#detailsTable tbody').find('tr').length)) {
                if ($(ctrl).val() > 0 && $(ctrl).val() != '' && $(ctrl).val() != null) {
                    Add_Rows();
                }
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



}
$("#detailsTable tbody").on('click', '.del', function () {
    var currentRow = $(this).closest("tr");
    $(currentRow).find('.del').val("Deleted");
    $(currentRow).find('.del').attr("style", "display: none;");
    $(currentRow).find('.lbldel').attr("style", "display: block;");
    Cal_Amount();
});

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
    $(row).find('.ddlspare').val("0");
    $(row).find('.sysid').val("");
    $(row).find('.hfdetailsysid').val("");

    $(row).find('.purchaseprice').val("");
    $(row).find('.salesprice').val("");




    $(row).find('.qty').val("");
    Bindddl_Data($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare');
    $("td input:text", row).val("");
    $('td .lbldel', row).attr("style", "display: none;");
    $("td button[type=button]", row).val('Delete');
    $("td button[type=button]", row).attr("style", "display: block");
    $("td input[type=date]", row).val('');
    $("td input[type=time]", row).val('');

}


var Gstdetail = [];

function Cal_Amount() {
 
    
    var total = 0;
 

    $('#detailsTable tbody tr').each(function (i, ele) {

        if ($('.ddlspare', this).val() != '' && $('.ddlspare', this).val() != 0) {

            if ($('.salesprice', this).val() != '' && $('.qty', this).val() != '') {
                if ($('.del', this).val() == "Deleted")
                {
                    $('.amount', this).val(parseFloat('0'))
                }
                else
                {
                    $('.amount', this).val(parseFloat($('.salesprice', this).val()) * parseFloat($('.qty', this).val()))
                    $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                }
              
            }
            total = parseFloat(total) + parseFloat($('.amount', this).val());
        }
    })

 


   


}


