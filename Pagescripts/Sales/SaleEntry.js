
$(document).ready(function () {
    $(".dis").attr("disabled", "disabled");
    closedata()
    Drobdownbindsearch($('#ddlcustomer'), '/Customer/Getcustomerdropdown');
    Drobdownbindsearch($('.ddlspare'), '/ProductMap/Getdropdown_System');

})


function saveprocess() {
    try {
        var Deatil = [];
        $('#detailsTable tbody tr').each(function (index, ele) {
         
            if($('.ddlspare', this).find('option:selected').val() != undefined && $('.ddlspare', this).find('option:selected').val() !='')
            {
           
                let details = {
                    sysid: $('.hfdetailsysid', this).val(),
                    type: $('.ddltype', this).find('option:selected').text(),
                    spare_sysid: $('.ddlspare', this).find('option:selected').val(),
                    sparename: $('.ddlspare', this).find('option:selected').text(),
                    hsncode: $('.hsncode', this).val(),
                    salesprice: $('.salesprice', this).val(),
                    qty: $('.qty', this).val(),
                    oldqty: $('.hfoldqty', this).val(),
                    amount: $('.amount', this).val(),
                    taxid: $('.hftaxid', this).val(),
                    taxname: $('.hftaxname', this).val(),
                    taxamount: $('.hftaxamount', this).val(),
                    isdeleted: ($('.del', this).val())
                }
                Deatil.push(details);
            }
        })
        var Payment = [];
        let total = 0;
        $('#tblpayment tbody tr').each(function (i, e) {
            if ($('.payamount', this).val() != '0') {
                let detail = {
                    mode: $('.ddltype', this).find('option:selected').text(),
                    amount: $('.payamount', this).val(),
                    sysid: $('.hfpaymentid', this).val(),
                    description: $('.description', this).val(),
                    billno: 'sales',
                    type: 'customer',
                    typeid: $('#ddlcustomer').val(),
                    trans_no: $('#lblinvoiceno').text()
                }
                Payment.push(detail);
                total = parseFloat(total) + parseFloat($('.payamount', this).val());
            }
        })

        if (parseFloat($('#txttotal').val()) < 0) {
            toastr.error('Invalid total unable to process');
            return false;
        }

        if (parseFloat($('#txttotal').val()) >= parseFloat(total)) {


        }
        else {
            toastr.error('Pay amount shoul be less than balance')
            return false;
        }

        if (Deatil.length == 0) {
            toastr.error('Invalid Spare Details Unable to Process')
            return false;
        }
        if (parseInt($('#txttotal').val()) <= 0) {
            toastr.error('Invalid Spare Details Unable to Process')
            return false;
        }

        if ($('#ddlcustomer').val() == 0 || $('#ddlcustomer').val() == '') {
            toastr.error('Invalid Customer Details Unable to Process')
            return false;
        }
        var data = {
            sysid: $("#hfsysid").val(),
            entrydate: $("#txtentrydate").val(),
            description: $('#txtdescription').val(),
            customersysid: $('#ddlcustomer').val(),
            total: $('#txttotal').val(),
            invoiceno: $('#lblinvoiceno').text(),
            
            roundoff: $("#txtroundoff").val(),
            roundoff_type: $("#ddlroundoff_type").val(),
            SalesDeatils: Deatil,
            PaymentDetails: Payment
        }



        $.ajax({
            url: "/SalesEntry/save",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == true) {
                    toastr.success(result.Message);
                   // var win = window.open('http://localhost:26376/Report/SalesReport/salereport.aspx?sysid=' + result.Id + '&type=al', '_blank');

                    // LoadData();
                    cleardata();
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

    } catch (ex) {
        toastr.error(ex);
    }
}

function getinvoiceno() {

    $.ajax({
        url: '/SalesEntry/GetInvoiceNo',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",

        success: function (res) {


            $("#lblinvoiceno").text(res.Id)





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
function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "invoiceno";
    data[2] = "entrydate";
    data[3] = "customersysid";
    data[4] = "total";
    data[5] = "description";

    binddata("#Gvlist", "/SalesEntry/GetList", data);
}


function getbyID(SysId) {
    try {
        $.ajax({
            url: '/SalesEntry/Get_Edit',
            data: "{ 'sysid': '" + SysId + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('.saleslist').toggle('slow');
                $('.salesentry').show('slow');

                $("#hfsysid").val(res.result.sysid);
                $("#txtentrydate").val(res.result.entrydate);
                $('#lblinvoiceno').text(res.result.invoiceno);
                $('#ddltaxtype').val(res.result.taxtype);
                $("#txtdescription").val(res.result.description);
                $("#txttotal").val(res.result.total);
                $("#txtroundoff").val(res.result.roundoff);
                $("#ddlroundoff_type").val(res.result.roundoff_type);

               
                $('#ddlcustomer').selectpicker('val', res.result.customersysid);
                $.each(res.result.SalesDeatils, function (i, v) {
                    if (i == 0) {
                        var row = $("#detailsTable .trbody");
                        $(row).find('.hfdetailsysid').val(v.sysid);
                        $(row).find('.hftaxid').val(v.taxid);
                        $(row).find('.salesprice').val(v.salesprice);
                        $(row).find('.hsncode').val(v.hsncode);
                        $(row).find('.qty').val(v.qty);
                        $(row).find('.ddltype').val(v.type)
                        $(row).find('.amount').val(v.amount);
                        $(row).find('.hftaxname').val(v.taxname);
                        $(row).find('.hfoldqty').val(v.qty);
                        $(row).find('.selecpick').empty();
                        $(row).find('.selecpick').append(`<select id="ddlspare" onchange="getsparedetail(this)" required data-live-search="true" class="selectpicker ddlspare" data-style="btn-normal"></select>`);

                       // Drobdownbindsearch($(row).find('.ddlspare'), '/ProductMap/Getdropdown_System');
                       
                        if (v.type == 'System') {

                            Drobdownbindsearchwithid($(row).find('.ddlspare'), '/ProductMap/Getdropdown_System/', v.spare_sysid);
                        }
                        else {
                            Drobdownbindsearchwithid($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare', v.spare_sysid);
                        }





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

                        Bindddl_Data($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare');

                        //  $(row).find('.ddlspare').val(v.spare_sysid);
                        $("td input:text", row).val("");
                        $('td .lbldel', row).attr("style", "display: none;");
                        $("td button[type=button]", row).val('Delete');
                        $("td button[type=button]", row).attr("style", "display: block");
                        $("td input[type=date]", row).val('');
                        $("td input[type=time]", row).val('');


                        $(row).find('.ddltype').val(v.type)
                        $(row).find('.hfdetailsysid').val(v.sysid);
                        $(row).find('.hftaxid').val(v.taxid);
                        $(row).find('.salesprice').val(v.salesprice);
                        $(row).find('.hsncode').val(v.hsncode);
                        $(row).find('.qty').val(v.qty);
                        $(row).find('.amount').val(v.amount);
                        $(row).find('.hfoldqty').val(v.qty);

                        $(row).find('.selecpick').empty();
                        $(row).find('.selecpick').append(`<select id="ddlspare" onchange="getsparedetail(this)" required data-live-search="true" class="selectpicker ddlspare" data-style="btn-normal"></select>`);

                        if (v.type == 'System') {
                            Drobdownbindsearchwithid($(row).find('.ddlspare'), '/ProductMap/Getdropdown_System/', v.spare_sysid);
                        }
                        else {
                            Drobdownbindsearchwithid($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare', v.spare_sysid);
                        }

                        $("#detailsTable tbody").append(row);

                    }

                });
               
              
                let balancepayment = 0;
                $.each(res.result.PaymentDetails, function (i, v) {
                    if (v.billno == 'sales') {

                        if (i == 0) {

                            $('#tblpayment tbody tr').each(function (i, e) {

                                var row = $("#tblpayment tbody");
                                $(row).find('.hfpaymentid').val(v.sysid);
                                $(row).find('.ddltype').val(v.mode);
                                $(row).find('.payamount').val(v.amount);
                                $(row).find('.description').val(v.description)
                            })
                        } else {


                            var row = $("#tblpayment tbody tr").last().clone();

                            $("td input:text", row).val("");
                            $('td .lbldel', row).attr("style", "display: none;");
                            $("td button[type=button]", row).val('Delete');
                            $("td button[type=button]", row).attr("style", "display: block");



                            $(row).find('.hfpaymentid').val(v.sysid);
                            $(row).find('.ddltype').val(v.mode);
                            $(row).find('.payamount').val(v.amount);
                            $(row).find('.description').val(v.description)

                            $('#tblpayment').append(row);
                        }
                    }
                    else {
                        balancepayment = balancepayment + v.amount;
                        $('#hf_balancepayment').val(parseFloat(balancepayment).toFixed(2))
                    }

                })

                Cal_Amount();
                Cal_Balance();
                Cal_Roundoff();
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


function show() {
    cleardata();
    $('.saleslist').toggle('slow');
    $('.salesentry').show();
    var currentTime = new Date();
    $("#txtentrydate").datepicker().datepicker("setDate", currentTime);
    Bindddl_Data($('#ddlcustomer'), '/Customer/Getcustomerdropdown');
    getinvoiceno()
}
function closedata() {

    $('.saleslist').show();
    $('.salesentry').hide();
    cleardata();
    LoadData()

}


function Cal_Amount() {

 
        total = 0;
 
    

    $('#detailsTable tbody tr').each(function (i, ele) {
        if ($('.del', this).val() != 'Deleted') {
            if ($('.qty', this).val() != 'NaN' && $('.qty', this).val() != '') {
                if ($('.salesprice', this).val() != '') {
                    $('.amount', this).val(parseFloat($('.salesprice', this).val()) * parseFloat($('.qty', this).val()))
                    $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                }
                total = parseFloat(total) + parseFloat($('.amount', this).val());
            }
        }
        else
        {
            if ($('.qty', this).val() != 'NaN' && $('.qty', this).val() != '') {
                if ($('.salesprice', this).val() != '') {
                    $('.amount', this).val(parseFloat(0))
                }
                total = parseFloat(total) + parseFloat($('.amount', this).val());
            }
        }

    })

        let sum = total ;
        $('#txttotal').val(parseFloat(sum).toFixed(2));
        $('#hftotal').val($('#txttotal').val())
        Cal_Balance();
}

function Delete(ID) {

    deletedata(ID, "/SalesEntry/Delete/");
}

function cleardata() {

    $("#detailsTable tbody").find("tr:gt(0)").remove();
    $("#hfsysid").val("");
    $("#txtproductname").val("");
    $("#txthsncode").val("");
    $("#txtopeningstock").val("");
    $("#txtdescription").val("");
    $("#txttotal").val("");
    $('.gstdetails').empty();
    $("#txtroundoff").val("0");

    var row = $("#detailsTable .trbody");
    $(row).find('.hfdetailsysid').val("");
    $(row).find('.hftaxid').val("");
    $(row).find('.salesprice').val("");
    $(row).find('.hsncode').val("");
    $(row).find('.qty').val("");
    $(row).find('.amount').val("");
    $(row).find('.ddltype').val("System");
    $(row).find('.selecpick').empty();
    $(row).find('.selecpick').append(`<select id="ddlspare" onchange="getsparedetail(this)" required data-live-search="true" class="selectpicker ddlspare" data-style="btn-normal"></select>`);
    $("#detailsTable tbody").append(row)

    $('#tblpayment tbody').find("tr:gt()").remove();
    $('#tblpayment tbody tr').each(function (i, e) {
        $('.payamount', this).val('0');
        $('.description', this).val('');
        $('.hfpaymentid', this).val('');
      
        
    })
    Drobdownbindsearch($('.ddlspare'), '/ProductMap/Getdropdown_System');
    $('#ddlcustomer').selectpicker('val', '0');
    $('#txtpayamount').val('0');
    $('#lblbalance').val('0');
}

function getsparedetail(ctrl) {
    let url = '';
  
    if ($(ctrl).closest('tr').find('.ddltype').val() == 'System') {
        url = '/ProductMap/GetProductdetails/';
    }
    else {
        url = '/Sparepart/GetbyID';
    }

    $.ajax({
        url: url,
        data: "{ 'sysid': '" + $(ctrl).val() + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if ($(ctrl).closest('tr').find('.ddltype').val() == 'System') {
                $(ctrl).closest('tr').find('.hsncode').val(data[0].hsn);
                $(ctrl).closest('tr').find('.hftaxid').val("3");
                $(ctrl).closest('tr').find('.hftaxname').val("GST 18%");
                $(ctrl).closest('tr').find('.salesprice').val(data[0].salesprice)
                $(ctrl).closest('tr').find('.qty').focus()
            }
            else {
                var data = JSON.parse(data)

                $(ctrl).closest('tr').find('.salesprice').val(data[0].salesprice)
                $(ctrl).closest('tr').find('.hsncode').val(data[0].hsncode)
                $(ctrl).closest('tr').find('.hftaxid').val(data[0].taxid)
                $(ctrl).closest('tr').find('.hftaxname').val(data[0].taxname);
                $(ctrl).closest('tr').find('.qty').focus()

            }

            if (parseInt($(ctrl).closest('tr').find('.sno').text()) == parseInt($('#detailsTable tbody').find('tr').length)) {
                Add_Rows();
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
    $(row).find('.hftaxid').val("");
    $(row).find('.hftaxamount').val("");
    $(row).find('.sysid').val("");
    $(row).find('.hfdetailsysid').val("");
    $(row).find('.purchaseprice').val("");
    $(row).find('.hsncode').val("");
    $(row).find('.qty').val("0");
    $(row).find('.amount').val("0");
    $(row).find('.selecpick').empty();
    $(row).find('.selecpick').append(`<select id="ddlspare" onchange="getsparedetail(this)" required data-live-search="true" class="selectpicker ddlspare" data-style="btn-normal"></select>`);

    Drobdownbindsearch($(row).find('.ddlspare'), '/ProductMap/Getdropdown_System');
    $("td input:text", row).val("");
    $('td .lbldel', row).attr("style", "display: none;");
    $("td button[type=button]", row).val('Delete');
    $("td button[type=button]", row).attr("style", "display: block");
    $("td input[type=date]", row).val('');
    $("td input[type=time]", row).val('');

}

function getdropdown(ctrl) {
   
    if ($(ctrl).val() == 'System') {
        $(ctrl).closest('tr').find('.selecpick').empty();
        $(ctrl).closest('tr').find('.selecpick').append(`<select id="ddlspare" required data-live-search="true" class="selectpicker ddlspare" data-style="btn-normal"></select>`);

        Drobdownbindsearch($(ctrl).closest('tr').find('.ddlspare'), '/ProductMap/Getdropdown_System');
    }
    else {
        $(ctrl).closest('tr').find('.selecpick').empty();
        $(ctrl).closest('tr').find('.selecpick').append(`<select id="ddlspare"  onchange="getsparedetail(this)" required data-live-search="true" class="selectpicker ddlspare" data-style="btn-normal"></select>`);
        Drobdownbindsearch($(ctrl).closest('tr').find('.ddlspare'), '/Sparepart/Getdropdown_Spare');
    }

}

function Add_paymentRow() {
    var row = $("#tblpayment tbody tr").last().clone();
    clear(row);
    $(row).find('.payamount').val('0');

    $(row).find('.description').val('0');
    $(row).find('.hfpaymentid').val('');

    $('#tblpayment').append(row);
    return false;
}

function Cal_Balance() {
    let total = 0

    $('#tblpayment tbody tr').each(function (i, ele) {
        total = parseFloat(total) + parseFloat($('.payamount', this).val());
    })
    

    if (parseFloat($('#txttotal').val()) >= parseFloat(total)) {

        $('#txtpayamount').val(parseFloat(parseFloat(total) + parseFloat($('#hf_balancepayment').val() == '' ? '0' : $('#hf_balancepayment').val())).toFixed(2))
        $('#lblbalance').val(parseFloat(parseFloat($('#txttotal').val()) - parseFloat($('#txtpayamount').val())).toFixed(2))
    }
    else {
        toastr.error('Pay amount shoul be less than balance')
    }



}
function Cal_Roundoff() {
    if ($('#ddlroundoff_type').val() == 'plus') {

        $("#txttotal").val(parseFloat($('#hftotal').val()) + parseFloat(($("#txtroundoff").val() == '' ? "0" : parseFloat($("#txtroundoff").val()))))
        $("#txttotal").val(parseFloat($("#txttotal").val()).toFixed(2))
    }
    else {

        $("#txttotal").val(parseFloat($('#hftotal').val()) - parseFloat(($("#txtroundoff").val()) == '' ? "0" : parseFloat($("#txtroundoff").val())))
        $("#txttotal").val(parseFloat($("#txttotal").val()).toFixed(2))
    }
    Cal_Balance();

}