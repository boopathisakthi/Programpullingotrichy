$(document).ready(function () {
    $(".dis").attr("disabled", "disabled");
    LoadData();
    closedata()
    Drobdownbindsearch($('#ddlcustomer'), '/Customer/Getcustomerdropdown');
    Drobdownbindsearch($('.ddlspare'), '/ProductMap/Getdropdown_System');
})
function saveprocess() {
    try {
        var Deatil = [];
       
        $('#detailsTable tbody tr').each(function (index, ele) {
            if ($('.ddlspare', this).find('option:selected').val() != undefined && $('.ddlspare', this).find('option:selected').val() != '') {
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
                    trans_no: $('#lblbillno').text()
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
            invoiceno: $('#lblbillno').text(),
            taxtype: $('#ddltaxtype').val(),
            roundoff: $("#txtroundoff").val(),
            roundoff_type: $("#ddlroundoff_type").val(),
            SalesDeatils: Deatil,
            PaymentDetails: Payment
        }



        $.ajax({
            url: "/Bill/save",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.Status == true) {
                    toastr.success(result.Message);
                    var win = window.open('http://localhost/Report/SalesReport/salereport.aspx?sysid=' + result.Id + '&type=il', '_blank');

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
        url: '/Bill/GetInvoiceNo',
       // data: "{ 'billno':"+ $('#txtinvoiceno').val()+"}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",

        success: function (res) {
            
             $("#lblbillno").text("BE"+(parseInt(res.Id)+1))
            //if(res.Id==0)
            //{
            //    toastr.success('invoice no valid')
            //}
            //else
            //{
            //    toastr.error('invoice no invalid')
            //    $('#txtinvoiceno').val('0')
            //}





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

    binddata("#Gvlist", "/Bill/GetList", data);
}
function getbyID(SysId) {
    try {
        $.ajax({
            url: '/Bill/Get_Edit',
            data: "{ 'sysid': '" + SysId + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('.saleslist').toggle('slow');
                $('.salesentry').show('slow');

                $("#hfsysid").val(res.result.sysid);
                $("#txtentrydate").val(res.result.entrydate);
                $("#lblbillno").text(res.result.invoiceno)
              
                $('#ddltaxtype').val(res.result.taxtype);
                $("#txtdescription").val(res.result.description);
                $("#txttotal").val(res.result.total);
                $("#txtroundoff").val(res.result.roundoff);
                $("#ddlroundoff_type").val(res.result.roundoff_type);
                $('#ddlcustomer').selectpicker('val', res.result.customersysid);
               // $('#ddlcustomer').val(res.result.customersysid)
                getcustomerstate()
                //BindddlDataele($('#ddlcustomer'), '/Customer/Getcustomerdropdown', res.result.customersysid);
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

                        // Drobdownbindsearch($(row).find('.ddlspare'), '/ProductMap/Getdropdown_System');

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
    Drobdownbindsearch($('#ddlcustomer'), '/Customer/Getcustomerdropdown');
    getinvoiceno();
    
}
function closedata() {

    $('.saleslist').show();
    $('.salesentry').hide();
    cleardata();
    LoadData()

}
var Gstdetail = [];
function Cal_Amount() {
 
    if ($('#hf_statesysid').val() == 0 || $('#hf_statesysid').val() == '' || $('#hf_statesysid').val() == null || $('#hf_statesysid').val() == undefined)
    {
        toastr.error('please check delear details')
        return false;
    }
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
        if ($('.del', this).val() != 'Deleted') {
            if ($('#ddltaxtype').val() == 'Exclusive') {
                if ($('.ddltype', this).val() == 'System') {
                   
                    if ($('.qty', this).val() != 'NaN' && $('.qty', this).val() != '') {

                        if ($('.salesprice', this).val() != '') {
                            $('.amount', this).val(parseFloat($('.salesprice', this).val()) * parseFloat($('.qty', this).val()))
                            $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                        }
                        total = parseFloat(total) + parseFloat($('.amount', this).val());



                        taxdesign18gst = '';
                        gst18 = '';
                        if ($('#hf_statesysid').val() == '30') {
                            taxamount18gst = taxamount18gst + ($('.amount', this).val() * 18 / 100);

                            amount = taxamount18gst / 2;
                            taxdesign18gst = `</br><label>SGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign18gst = taxdesign18gst + `</br><label>CGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            $('.hftaxamount', this).val($('.amount', this).val() * 18 / 100);
                            $('.hftaxid', this).val('3');

                        }
                        else
                        {
                            taxamount18gst = taxamount18gst + ($('.amount', this).val() * 18 / 100);
                            taxdesign18gst = taxdesign18gst + `</br><label>IGST 18% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount18gst).toFixed(2) + `</label>`
                            $('.hftaxamount', this).val($('.amount', this).val() * 18 / 100);
                            $('.hftaxid', this).val('3');
                        }
                      




                    }

                }
                else {
                    if ($('.salesprice', this).val() != '' && $('.qty', this).val() != '') {
                        $('.amount', this).val(parseFloat($('.salesprice', this).val()) * parseFloat($('.qty', this).val()))
                        $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                    }

                    let amount;
                    if ($('#hf_statesysid').val() == '30') {
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
                    }
                    else
                    {
                        switch ($('.hftaxid', this).val()) {

                            case '3':
                                taxdesign18gst = '';
                                gst18 = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(18) / 100);

                                taxamount18gst = taxamount18gst + (parseFloat($('.amount', this).val()) * parseFloat(18) / 100);

                                taxdesign18gst = taxdesign18gst + `</br><label>IGST 18% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount18gst).toFixed(2) + `</label>`
                                break
                            case '8':
                                taxdesign28gst = '';
                                gst28 = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(28) / 100);
                                taxamount28gst = taxamount28gst + (parseFloat($('.amount', this).val()) * parseFloat(28) / 100);
                                
                              
                                taxdesign28gst = taxdesign28gst + `</br><label>IGST 28% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount28gst).toFixed(2) + `</label>`
                                break
                            case '6':
                                taxdesign5gst = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(5) / 100);
                                taxamount5gst = taxamount5gst + (parseFloat($('.amount', this).val()) * parseFloat(5) / 100);

                                taxdesign5gst = taxdesign5gst + `</br><label>IGST 5% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount5gst).toFixed(2) + `</label>`
                                break
                            case '5':
                                taxdesign12gst = '';
                                gst12 = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(12) / 100);
                                taxamount12gst = taxamount12gst + (parseFloat($('.amount', this).val()) * parseFloat(12) / 100);
                               
                                taxdesign12gst = taxdesign12gst + `</br><label>IGST 12% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount12gst).toFixed(2) + `</label>`

                                break
                        }
                    }
                  
                    total = parseFloat(total) + parseFloat($('.amount', this).val());
                }

            }
            else {
                if ($('.ddltype', this).val() == 'System') {

                    if ($('.qty', this).val() != 'NaN' && $('.qty', this).val() != '') {

                        if ($('.salesprice', this).val() != '') {
                            $('.amount', this).val(parseFloat($('.salesprice', this).val()) * parseFloat($('.qty', this).val()))
                            $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                        }
                        total = parseFloat(total) + parseFloat($('.amount', this).val());

                        if ($('#hf_statesysid').val() == '30') {
                            taxdesign18gst = '';
                            gst18 = '';
                            //  parseFloat(element.sgst + element.cgst) / (100 + parseFloat(element.sgst + element.cgst)
                            taxamount18gst = taxamount18gst + ($('.amount', this).val() * 18 / (100 + 18));

                            amount = taxamount18gst / 2;
                            taxdesign18gst = `</br><label>SGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            taxdesign18gst = taxdesign18gst + `</br><label>CGST 9% :</label><label style="margin-left:10px"> ` + parseFloat(amount).toFixed(2) + `</label>`
                            $('.hftaxamount', this).val($('.amount', this).val() * 18 / (100 + 18));
                            $('.hftaxid', this).val('3');
                        }
                        else
                        {

                            taxamount18gst = taxamount18gst + ($('.amount', this).val() * 18 / (100+18));
                            taxdesign18gst = taxdesign18gst + `</br><label>IGST 18% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount18gst).toFixed(2) + `</label>`
                            $('.hftaxamount', this).val($('.amount', this).val() * 18 / (100 + 18));
                            $('.hftaxid', this).val('3');


                        }

                    




                    }

                }
                else {
                    if ($('.salesprice', this).val() != '' && $('.qty', this).val() != '') {
                        $('.amount', this).val(parseFloat($('.salesprice', this).val()) * parseFloat($('.qty', this).val()))
                        $('.amount', this).val(parseFloat($('.amount', this).val()).toFixed(2))
                    }

                    let amount;
                    if ($('#hf_statesysid').val() == '30') {
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
                    }
                    else
                    {
                        switch ($('.hftaxid', this).val()) {

                            case '3':
                                taxdesign18gst = '';
                                gst18 = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(18) / (100+18));

                                taxamount18gst = taxamount18gst + (parseFloat($('.amount', this).val()) * parseFloat(18) / (100 + 18));

                                taxdesign18gst = taxdesign18gst + `</br><label>IGST 18% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount18gst).toFixed(2) + `</label>`
                                break
                            case '8':
                                taxdesign28gst = '';
                                gst28 = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(28) / (100 + 28));
                                taxamount28gst = taxamount28gst + (parseFloat($('.amount', this).val()) * parseFloat(28) / (100 + 28));


                                taxdesign28gst = taxdesign28gst + `</br><label>IGST 28% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount28gst).toFixed(2) + `</label>`
                                break
                            case '6':
                                taxdesign5gst = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(5) / (100 + 5));
                                taxamount5gst = taxamount5gst + (parseFloat($('.amount', this).val()) * parseFloat(5) / (100+5));

                                taxdesign5gst = taxdesign5gst + `</br><label>IGST 5% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount5gst).toFixed(2) + `</label>`
                                break
                            case '5':
                                taxdesign12gst = '';
                                gst12 = '';
                                $('.hftaxamount', this).val(parseFloat($('.amount', this).val()) * parseFloat(12) / (100 + 12));
                                taxamount12gst = taxamount12gst + (parseFloat($('.amount', this).val()) * parseFloat(12) / (100 + 12));

                                taxdesign12gst = taxdesign12gst + `</br><label>IGST 12% :</label><label style="margin-left:10px"> ` + parseFloat(taxamount12gst).toFixed(2) + `</label>`

                                break
                        }
                    }
                    total = parseFloat(total) + parseFloat($('.amount', this).val());
                }
            }


        }



    })

    $('.gstdetails').append(taxdesign5gst + taxdesign12gst + taxdesign18gst + taxdesign28gst);

    if ($('#ddltaxtype').val() == 'Exclusive') {
        $('#txt_taxable_amout').val(total)
        let sum = total + taxamount5gst + taxamount12gst + taxamount18gst + taxamount28gst;
        $('#txttotal').val(parseFloat(sum).toFixed(2));
    }
    else {
        $('#txt_taxable_amout').val(total - (taxamount5gst + taxamount12gst + taxamount18gst + taxamount28gst))
        let sum = total;
        $('#txttotal').val(parseFloat(sum).toFixed(2));
    }

    $('#hftotal').val($('#txttotal').val())
    if ($('#hfsysid').val()) {
        Cal_Roundoff()
    }
}
function Delete(ID) {

    deletedata(ID, "/Bill/Delete/");
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
    Drobdownbindsearch($('.ddlspare'), '/ProductMap/Getdropdown_System');
    Drobdownbindsearch($('#ddlcustomer'), '/Customer/Getcustomerdropdown');
 
    $('#tblpayment tbody').find("tr:gt()").remove();
    $('#tblpayment tbody tr').each(function (i, e) {


        $('.payamount', this).val('0');
        $('.description', this).val('');
        $('.hfpaymentid', this).val('');


    })
   
    $('#txtpayamount').val('0');
    $('#lblbalance').val('0');
    $('#txt_taxable_amout').val('');
    getinvoiceno();
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
    (row).find('.ddltype').val("System");
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
   

    if (parseFloat($('#txttotal').val() == 'NaN' ? 0 : $('#txttotal').val()) >= parseFloat(total)) {

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
 function getcustomerstate() {
   
     $.ajax({
         url:  '/Customer/GetbyID',
         data: "{ 'sysid': '" + $('#ddlcustomer').val() + "'}",
         dataType: "json",
         type: "POST",
         contentType: "application/json; charset=utf-8",
         success: function (data) {
           
             var parsed = JSON.parse(data);
             if (parsed.length == 1) {
                 $.map(parsed, function (Item) {
                    
                     
                     $('#hf_statesysid').val(Item.state);
                     Cal_Amount();
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
}