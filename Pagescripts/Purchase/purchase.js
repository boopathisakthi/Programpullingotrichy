
$(document).ready(function () {
    LoadData();
    Bindddl_Data($('#ddlsupplier'), '/Customer/GetSupplierdropdown');
    closedata();
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
                    purchaseprice: $('.purchaseprice', this).val(),
                    hsncode: $('.hsncode', this).val(),
                    taxid: $('.hftaxid', this).val(),
                    taxname: $('.hftaxname', this).val(),
                    taxamount: $('.hftaxamount', this).val(),
                    qty: $('.qty', this).val(),
                    isdeleted: ($('.del', this).val())
                }
                Deatil.push(details);
            }
        })

        if (Deatil.length == 0) {
            toastr.error('Invalid Spare Details Unable to Process')
            return false;
        }
        if ($('#ddlsupplier').val() == 0 || $('#ddlsupplier').val() == '') {
            toastr.error('Invalid Supplier Details Unable to Process')
            return false;
        }
        var Payment = [];
        let total = 0;
        $('#tblpayment tbody tr').each(function (i, e) {
            if ($('.payamount', this).val() != '0') {
                let detail = {
                    mode: $('.ddltype', this).find('option:selected').text(),
                    amount: $('.payamount', this).val(),
                    sysid: $('.hfpaymentid', this).val(),
                    description: $('.description', this).val(),
                    billno: 'purchase',
                    type: 'supplier',
                    typeid: $('#ddlsupplier').val(),
                    trans_no: $('#lblpurchaseno').text()
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

        var data = {
            sysid: $("#hfsysid").val(),
            entrydate: $("#txtentrydate").val(),
            description: $('#txtdescription').val(),
            suppliersysid: $('#ddlsupplier').val(),
            taxtype: $('#ddltaxtype').val(),
            roundoff: $("#txtroundoff").val(),
            roundoff_type: $("#ddlroundoff_type").val(),
            total: $('#txttotal').val(),
            purchaseno:$("#lblpurchaseno").text(),
            SpareDetails: Deatil,
            PaymentDetails: Payment
        }

        return insertdata("#frm", data, "/Stock/save");



    } catch (ex) {
        toastr.error(ex);
    }
}
function afterinsertupdate() {
    cleardata();
    LoadData();
    getpurchaseno();
}
function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "purchaseno";
    data[2] = "suppliersysid";
    data[3] = "entrydate";
    data[4] = "total";
    data[5] = "description";

    binddata("#Gvlist", "/Stock/GetList", data);
}
function getbyID(SysId) {
    try {
        $.ajax({
            url: '/Stock/GetById',
            data: "{ 'sysid': '" + SysId + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('.stocklist').toggle('slow');
                $('.stockentry').show();
                $("#lblpurchaseno").text(res.result.purchaseno);
                $("#hfsysid").val(res.result.sysid);
                $("#txtentrydate").val(res.result.entrydate);
                $("#txtdescription").val(res.result.description);
                $("#txttotal").val(res.result.total);
                $("#txtroundoff").val(res.result.roundoff);
                $("#ddlroundoff_type").val(res.result.roundoff_type);
               // $("#txttotal").val(res.result.total);
                BindddlDataele($('#ddlsupplier'), '/Customer/GetSupplierdropdown', res.result.suppliersysid);
                $.each(res.result.SpareDetails, function (i, v) {
                    if (i == 0) {
                        var row = $("#detailsTable .trbody");
                        $(row).find('.hfdetailsysid').val(v.sysid);
                        $(row).find('.hftaxid').val(v.taxid);
                        $(row).find('.purchaseprice').val(v.purchaseprice);
                        $(row).find('.hsncode').val(v.hsncode);
                        $(row).find('.qty').val(v.qty);
                        $(row).find('.hftaxname').val(v.taxname);
                        BindddlDataele($(row).find('.ddl'), '/Sparepart/Getdropdown_Spare', v.spare_sysid);

                        // $(row).find('.ddlspare').val(v.spare_sysid);


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



                        //  $(row).find('.ddlspare').val(v.spare_sysid);
                        $("td input:text", row).val("");
                        $('td .lbldel', row).attr("style", "display: none;");
                        $("td button[type=button]", row).val('Delete');
                        $("td button[type=button]", row).attr("style", "display: block");
                        $("td input[type=date]", row).val('');
                        $("td input[type=time]", row).val('');



                        $(row).find('.hfdetailsysid').val(v.sysid);
                        $(row).find('.hftaxid').val(v.taxid);
                        $(row).find('.purchaseprice').val(v.purchaseprice);
                        $(row).find('.hsncode').val(v.hsncode);
                        $(row).find('.qty').val(v.qty);
                        $(row).find('.hftaxname').val(v.taxname);

                        BindddlDataele($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare', v.spare_sysid);

                        $(row).find('.ddlspare').val(v.spare_sysid);

                        $("#detailsTable tbody").append(row);

                    }

                });
            
                let balancepayment = 0;
                $.each(res.result.PaymentDetails, function (i, v) {
                  
                    if (v.billno == 'purchase') {

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

    $('.stocklist').toggle('slow');
    $('.stockentry').show();
    getpurchaseno();
    var currentTime = new Date();
    $("#txtentrydate").datepicker().datepicker("setDate", currentTime);
    Bindddl_Data($('#ddlsupplier'), '/Customer/GetSupplierdropdown');
    Bindddl_Data($('.ddlspare'), '/Sparepart/Getdropdown_Spare');

}
function closedata() {

    $('.stocklist').show();
    $('.stockentry').hide();
    cleardata();

}
function Delete(ID) {

    deletedata(ID, "/Stock/Delete/");
}
function Cal_Amount() {

    Gstdetail = [];
    var discount, taxtype = '';
    var taxdesign5gst = '',
        taxdesign12gst = '',
        taxdesign18gst = '',
        taxdesign28gst = '';
    var taxamount5gst = 0,
        taxamount12gst = 0,
        taxamount18gst = 0,
        taxamount28gst = 0,
        taxtotalamount = 0,
        total = 0;
    $('.gstdetails').empty();
    $('#hfgst18amount').val('0');

    $('#detailsTable tbody tr').each(function (i, ele) {
        if ($('.hsncode', this).val() != '') {
            if ($('.del', this).val() != 'Deleted') {
                if ($('#ddltaxtype').val() == 'Exclusive') {

                    if ($('.purchaseprice', this).val() != '' && $('.qty', this).val() != '') {
                        $('.amount', this).val(parseFloat($('.purchaseprice', this).val()) * parseFloat($('.qty', this).val()))

                        $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                    }

                    let amount;

                    switch ($('.hftaxid', this).val()) {
                        case '3':

                            taxdesign18gst = '';
                            gst18 = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(18) / 100);
                            taxamount18gst = taxamount18gst + (parseFloat($('.amount', this).val()) * parseFloat(18) / 100);
                            amount = taxamount18gst / 2;
                            taxdesign18gst = `</br><label>SGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign18gst = taxdesign18gst + `</br><label>CGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                        case '8':
                            taxdesign28gst = '';
                            gst28 = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(28) / 100);
                            taxamount28gst = taxamount28gst + (parseFloat($('.amount', this).val()) * parseFloat(28) / 100);
                            amount = taxamount28gst / 2;
                            taxdesign28gst = `</br><label>SGST 14% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign28gst = taxdesign28gst + `</br><label>CGST 14% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                        case '6':
                            taxdesign5gst = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(5) / 100);
                            taxamount5gst = taxamount5gst + (parseFloat($('.amount', this).val()) * parseFloat(5) / 100);
                            amount = taxamount5gst / 2;
                            taxdesign5gst = `</br><label>SGST 2.5% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign5gst = taxdesign5gst + `</br><label>CGST 2.5% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                        case '5':
                            taxdesign12gst = '';
                            gst12 = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(12) / 100);
                            taxamount12gst = taxamount12gst + (parseFloat($('.amount', this).val()) * parseFloat(12) / 100);
                            amount = taxamount12gst / 2;
                            taxdesign12gst = `</br><label>SGST 6% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign12gst = taxdesign12gst + `</br><label>CGST 6% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                    }
                    total = parseFloat(total) + parseFloat($('.amount', this).val());


                }
                else {


                    if ($('.purchaseprice', this).val() != '' && $('.qty', this).val() != '') {
                        $('.amount', this).val(parseFloat($('.purchaseprice', this).val()) * parseFloat($('.qty', this).val()))
                        $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                    }

                    let amount;

                    switch ($('.hftaxid', this).val()) {
                        case '3':
                            taxdesign18gst = '';
                            gst18 = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(18) / (100 + 18));
                            taxamount18gst = taxamount18gst + (parseFloat($('.amount', this).val()) * parseFloat(18) / (100 + 18));
                            amount = taxamount18gst / 2;
                            taxdesign18gst = `</br><label>SGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign18gst = taxdesign18gst + `</br><label>CGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                        case '8':
                            taxdesign28gst = '';
                            gst28 = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(28) / (100 + 28));
                            taxamount28gst = taxamount28gst + (parseFloat($('.amount', this).val()) * parseFloat(28) / (100 + 28));
                            amount = taxamount28gst / 2;
                            taxdesign28gst = `</br><label>SGST 14% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign28gst = taxdesign28gst + `</br><label>CGST 14% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                        case '6':
                            taxdesign5gst = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(5) / (100 + 5));
                            taxamount5gst = taxamount5gst + (parseFloat($('.amount', this).val()) * parseFloat(5) / (100 + 5));
                            amount = taxamount5gst / 2;
                            taxdesign5gst = `</br><label>SGST 2.5% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign5gst = taxdesign5gst + `</br><label>CGST 2.5% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                        case '5':
                            taxdesign12gst = '';
                            gst12 = '';
                            $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(12) / (100 + 12));
                            taxamount12gst = taxamount12gst + (parseFloat($('.amount', this).val()) * parseFloat(12) / (100 + 12));
                            amount = taxamount12gst / 2;
                            taxdesign12gst = `</br><label>SGST 6% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign12gst = taxdesign12gst + `</br><label>CGST 6% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            break
                    }
                    total = parseFloat(total) + parseFloat($('.amount', this).val());
                }
            }
        }

    })

    $('.gstdetails').append(taxdesign5gst + taxdesign12gst + taxdesign18gst + taxdesign28gst);

    if ($('#ddltaxtype').val() == 'Exclusive') {
        let sum = total + taxamount5gst + taxamount12gst + taxamount18gst + taxamount28gst;
        $('#txttotal').val(parseFloat(sum).toFixed(2));
    }
    else {
        let sum = total;
        $('#txttotal').val(parseFloat(sum).toFixed(2));
    }

  
    $('#hftotal').val(parseFloat(sum).toFixed(2));
   

}

function cleardata() {

    $("#detailsTable tbody").find("tr:gt(0)").remove();
    $("#hfsysid").val("");
    $("#txtproductname").val("");
    $("#txthsncode").val("");
    $("#txtopeningstock").val("");
    $("#txtdescription").val("");
    $('#hftotal').val("0");
    $("#txttotal").val("0");
    $('.gstdetails').empty();
    $("#txtroundoff").val("0");
    $('#tblpayment tbody').find("tr:gt()").remove();
    $('#tblpayment tbody tr').each(function (i, e) {


        $('.payamount', this).val('0');
        $('.description', this).val('');
        $('.hfpaymentid', this).val('');


    })
   
    var row = $("#detailsTable .trbody");

    $(row).find('.hfdetailsysid').val("");
    $(row).find('.hftaxid').val("");
    $(row).find('.purchaseprice').val("0");
    $(row).find('.hsncode').val("");
    $(row).find('.qty').val("0");
    $(row).find('.amount').val("0");

    Bindddl_Data($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare');
    Bindddl_Data($('#ddlsupplier'), '/Customer/GetSupplierdropdown');
    $('#txtpayamount').val('0');
    $('#lblbalance').val('0');
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


            $(ctrl).closest('tr').find('.purchaseprice').val(data[0].purchaseprice)
            $(ctrl).closest('tr').find('.hsncode').val(data[0].hsncode)
            $(ctrl).closest('tr').find('.hftaxid').val(data[0].taxid)
            $(ctrl).closest('tr').find('.hftaxname').val(data[0].taxname)
            $(ctrl).closest('tr').find('.qty').focus()
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
function AddNextRow(ctrl) {
    if (parseInt($(ctrl).closest('tr').find('.sno').text()) == parseInt($('#detailsTable tbody').find('tr').length)) {
        if ($(ctrl).val() > 0 && $(ctrl).val() != '' && $(ctrl).val() != null) {
            Add_Rows();
        }

    }

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
    $(row).find('.ddlspare').val("0");
    $(row).find('.sysid').val("");
    $(row).find('.hfdetailsysid').val("");

    $(row).find('.purchaseprice').val("");
    $(row).find('.hsncode').val("");




    $(row).find('.qty').val("");
    Bindddl_Data($(row).find('.ddlspare'), '/Sparepart/Getdropdown_Spare');
    $("td input:text", row).val("");
    $('td .lbldel', row).attr("style", "display: none;");
    $("td button[type=button]", row).val('Delete');
    $("td button[type=button]", row).attr("style", "display: block");
    $("td input[type=date]", row).val('');
    $("td input[type=time]", row).val('');

}
function getpurchaseno() {

    $.ajax({
        url: '/Stock/Getpurchaseno',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",

        success: function (res) {


            $("#lblpurchaseno").text(res.Id)





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
      
        $("#txttotal").val(parseFloat($('#hftotal').val()) +  parseFloat(($("#txtroundoff").val() == '' ? "0" : parseFloat($("#txtroundoff").val()))))
        $("#txttotal").val(parseFloat($("#txttotal").val()).toFixed(2))
    }
    else {

        $("#txttotal").val(parseFloat($('#hftotal').val()) - parseFloat(($("#txtroundoff").val()) == '' ? "0" : parseFloat($("#txtroundoff").val())))
        $("#txttotal").val(parseFloat($("#txttotal").val()).toFixed(2))
    }
    Cal_Balance();

}
