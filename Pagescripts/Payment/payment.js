
$(document).ready(function () {
    $(".dis").attr("disabled", "disabled");
    LoadData();
    closedata()
    getBillno()

})
function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "billno";
    data[2] = "billdate";
    data[3] = "type";
    data[4] = "paidamount";
    data[5] = "mode";

   
    var FilterParameter = {
        type: $('#ddlcustomersupplier').val(),
    }

    bindataparams("#Gvlist", "/Payment/Getlist", data, FilterParameter);

}
function show() {
     cleardata();
    $('.paymentlist').toggle('slow');
    $('.paymententry').show();
    getBillno()
    var currentTime = new Date();
    $("#txtentrydate").datepicker().datepicker("setDate", currentTime);
    CusSubDropdownBind()

}
function CusSubDropdownBind() {
    if ($('#ddltype').val() == 'customer') {
        Bindddl_Data($('#ddldropdwon'), '/Customer/Getcustomerdropdown');
    }
    else {
        Bindddl_Data($('#ddldropdwon'), '/Customer/GetSupplierdropdown');
    }
}
function closedata() {

    $('.paymentlist').show();
    $('.paymententry').hide();
    //  cleardata();
     LoadData()
     $('#btnsave').show()
}
function getBillno() {

    $.ajax({
        url: '/Payment/GetBillNo',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",

        success: function (res) {


            $("#lblbillno").text(res.Id)





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

function GetBalanceDetails() {
    let url = '';
    if ($('#ddltype').val() == 'supplier') {
        url = '/Payment/Get_SupplierDeatils'
    }
    else {
        url = '/Payment/Get_CustomerDeatils'
    }
    $.ajax({
        url: url,
        data: "{ 'sysid': '" + $('#ddldropdwon').val() + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            $('#paymentdetails tbody ').empty();
            var row = '';
            let i = 1;

            res.result.PaymentDetails.forEach(ele => {

                row = `<tr><td><label class="sno">` + i + `</label>
                    <td><input onchange="CheckboxEvent(this)" class ="chbx" type="checkbox"><input type="hidden" class ="sysid" value= ` + ele.sysid + ` ></td>
                    <td><label class ="date"> ` + ele.description + ` </label></td>
                    <td><label class ="orderno"> ` + ele.billno + ` </label> <br/>Total:<label class ="total"> ` + ele.mode + ` </label></td>
                    <td><label class="payedamount"><label></td>
                    <td><span><i class="la la-rupee"></i><span>
                    <input type="hidden" class ="hfbalance" value= ` + ele.amount + ` ></input><label class="balance">` + ele.amount + `<label></td>`;
                $('#paymentdetails tbody').append(row);
                i++;

            });

        },
        error: function (errormessage) {
            toastr.error(errormessage.responseText);
        }
    })

}

function CheckboxEvent(ctrl) {

    if ($('#txtpaidamount').val() > 0) {
        let status = $(ctrl).is(':checked');
        let spendamount = 0;

        $('#paymentdetails tbody tr').each(function (i, e) {
            if ($('.sysid', this).val() != undefined && $('.sysid', this).val() != '') {
                if ($('.chbx', this).is(':checked') == true) {
                    spendamount = ((spendamount)) + ($('.payedamount', this).text() == "" ? "0" : $('.payedamount', this).text());
                }
            }
        })


        let usedamount = ($('#txtpaidamount').val()) - (spendamount);

        if (usedamount <= 0) {
            $(ctrl).prop('checked', false);
            swal.fire({
                "title": "",
                "text": "You Already Used  Your Amount",
                "type": "error",
                "confirmButtonClass": "btn btn-secondary",
                "onClose": function (e) {
                    console.log('on close event fired!');
                }
            });
            return false;
        }

        if ($(ctrl).is(':checked') == false) {

            if ($(ctrl).closest("tr").find(".hfid").val()) {

                $(ctrl).closest("tr").find(".balance").text(($(ctrl).closest("tr").find(".payedamount").text()) + ($(ctrl).closest("tr").find(".hfbalance").val()));
                $(ctrl).closest("tr").find(".payedamount").text('0');
            } else {
                $(ctrl).closest("tr").find(".payedamount").text('0');
                $(ctrl).closest("tr").find(".balance").text($(ctrl).closest("tr").find(".hfbalance").val());
            }
        } else {

            if (usedamount >= $(ctrl).closest("tr").find(".hfbalance").val()) {
                $(ctrl).closest("tr").find(".payedamount").text($(ctrl).closest("tr").find(".hfbalance").val());
                $(ctrl).closest("tr").find(".balance").text('0');
            } else {

                $(ctrl).closest("tr").find(".payedamount").text(parseFloat(usedamount).toFixed(2));
                $(ctrl).closest("tr").find(".balance").text(parseFloat($(ctrl).closest("tr").find(".hfbalance").val() - usedamount).toFixed(2));

            }

        }
    } else {
        $(ctrl).prop('checked', false);
        toastr.error('Invalid Paid amount');
    }

}
function Closing_Purchase() {

    if ($('#txtpaidamount').val() > 0) {

        var paidamount = $('#txtpaidamount').val();
      
        let spendamount = 0;
        $('#paymentdetails tbody tr').each(function (i, e) {

            $('.payedamount', this).text('0');
            $('.balance', this).text(($('.hfbalance', this).val()))
            $('.chbx').prop('checked', false);
        })

        let usedamount = $('#txtpaidamount').val() - spendamount;
       
        if (usedamount == 0) {
         
            $('#paymentdetails tbody tr').each(function (i, e) {
            
                if ($('.balance', this).text() != '') {
                  
                    if (paidamount != 0) {
                      
                        if (parseFloat($('.balance', this).text()) <= parseFloat(paidamount)) {
                           
                            paidamount = paidamount - ($('.balance', this).text());
                            $('.payedamount', this).text(parseFloat($('.balance', this).text()).toFixed(2));
                            $('.balance', this).text('0')

                            $('.chbx', this).prop('checked', true);
                        } else {
                          
                            let balance = ($('.balance', this).text()) - paidamount;
                            
                            $('.balance', this).text(parseFloat(balance).toFixed(2))
                            $('.payedamount', this).text(paidamount);
                            paidamount = $('.payedamount', this).text() - paidamount;
                            $('.chbx', this).prop('checked', true);
                        }
                    }


                }

            })
        } else {
            $('#paymentdetails tbody tr').each(function (i, e) {
                if ($('.balance', this).text() != '') {
                    
                    if (usedamount!= 0) {
                      
                       if ($('.balance', this).text() <=  usedamount) {
                         
                        
                            usedamount = usedamount - ($('.balance', this).text());
                          
                            if (usedamount >= 0)
                            {
                                $('.payedamount', this).text( $('.balance', this).text());
                                $('.balance', this).text('0')

                                $('.chbx', this).prop('checked', true);
                            }
                           
                        } else {
                           
                               let balance = $('.balance', this).text() - usedamount;
                                $('.balance', this).text( parseFloat(balance).toFixed(2))
                                $('.payedamount', this).text(parseFloat(usedamount).toFixed(2));
                                usedamount = ($('.payedamount', this).text()) - usedamount;
                                $('.chbx', this).prop('checked', true);
                        }
                    }


                }

            })

        }
    } else {


        toastr.error('Invalid Paid amount');
    }


}

function saveprocess() {
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be save this file!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {

            if ($('#ddldropdwon').val() == '' || $('#ddldropdwon').val() == 0) {
                toastr.error('Invalid ' + $('#ddltype').val() + ' details');
                return false;
            }
            var totalrow = '';
            let sumofamount = 0;
            $('#paymentdetails tbody tr').each(function (i, e) {
                if ($('.sysid', this).val() != undefined && $('.sysid', this).val() != '') {
                    if ($('.chbx', this).is(':checked') == true) {
                        totalrow = $('.sno', this).text();
                        sumofamount = parseFloat(sumofamount) + parseFloat($('.payedamount', this).text());
                    }
                }
            })

            if (sumofamount != $('#txtpaidamount').val()) {
                toastr.error('Please match your due Amount and paid Amount')
                return false;
            }
            let detail = [];
            $('#paymentdetails tbody tr').each(function (i, e) {
                if ($('.sysid', this).val() != undefined && $('.sysid', this).val() != '') {
                    if ($('.chbx', this).is(':checked') == true) {
                       
                            var sno = $('.sno', this).text();
                            var data = {
                                billno: $('#lblbillno').text(),
                                billdate: $('#txtentrydate').val(),
                                type: $('#ddltype').val(),
                                typeid: $('#ddldropdwon').val(),
                                mode: $('#ddlpaidfrom').val(),
                                paidamount: $('#txtpaidamount').val(),
                                trans_id: $('.sysid', this).val(),
                                trans_date: $('.date', this).text(),
                                trans_no: $('.orderno', this).text(),
                                balance: $('.balance', this).text(),
                                trans_total: $('.total', this).text(),
                                amount: $('.payedamount', this).text(),
                                sysid: $('.hfid', this).val(),
                            }
                            detail.push(data)
                      
                       

                    }
                }
            })
            let overalldata = {
                PaymentDetails: detail
            }
            $.ajax({
                url: '/Payment/save',
                data: JSON.stringify(overalldata),
                type: 'post',
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {



                    if (result.Status == true) {


                        toastr.success(result.Message);
                        getBillno()
                        cleardata()

                    } else {

                        toastr.error(result.Message);
                        return false;
                    }




                },
                error: function (errormessage) {
                    toastr.error(errormessage.responseText);
                    return false;

                }
            });


        } else if (result.dismiss === 'cancel') {
            swal.fire(
                'Cancelled',
                'Your file is safe :)',
                'error'
            )
        }
    })
}
function getbyeditdata(SysId) {
    try {
        $.ajax({
            url: '/Payment/GetbyID',
            data: "{ 'billno': '" + SysId + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('.paymentlist').toggle('slow');
                $('.paymententry').show('slow');
                $('#paymentdetails tbody ').empty();
                var row = '';
                let i = 1;
               
                $('#lblbillno').text(res.result.PaymentDetails[0].billno);
                $('#txtentrydate').val(res.result.PaymentDetails[0].billdate).attr("disabled", "disabled")
                $('#ddltype').val(res.result.PaymentDetails[0].type);
                $('#ddltype').attr("disabled", "disabled")
                $('#txtpaidamount').val(res.result.PaymentDetails[0].paidamount).attr("disabled", "disabled");
              
                if (res.result.PaymentDetails[0].type == 'customer') {
                    
                    BindddlDataele($('#ddldropdwon'), '/Customer/Getcustomerdropdown', res.result.PaymentDetails[0].typeid);
                    $('#ddldropdwon').attr("disabled","disabled")
                }
                else {
                    BindddlDataele($('#ddldropdwon'), '/Customer/GetSupplierdropdown', res.result.PaymentDetails[0].typeid);
                }

                $.each(res.result.PaymentDetails, function (i, ele) {
                    i = i + 1;
                    let rowdesign = '';
                    let balance = parseFloat(ele.balance) + parseFloat(ele.amount);
                    rowdesign = `<tr><td><label class="sno">` + i + `</label><td>
        <input type="hidden" class="hfid" value=` + ele.sysid + `></input>
        <input class="chbx" disabled="disabled" onchange="CheckboxEvent(this)"  type="checkbox" checked>
        <input type="hidden" class="sysid" value=` + ele.trans_id + `></td>
        <td><label class="date">` + ele.trans_date + `</label></td>
        <td><label class ="orderno"> ` + ele.trans_no + ` </label><br/>Total<label class ="total"> ` + ele.trans_total + ` </label></td>
        <td><input type="hidden" class ="hfpayedamount" value= ` + ele.amount + ` + ><label class ="payedamount"> ` + ele.amount + ` <label></td>
        <td><span><i class="la la-rupee"></i><span>
        <input type="hidden" class="hfbalance" value=` + balance + ` +></input><label class="balance">` + ele.balance + `<label></td>`;
                    $('#paymentdetails tbody').append(rowdesign);
                    i++;

                })
                $('#btnsave').hide()
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
function bindataparams(tablename, uri, data, fileparameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    data[datacount] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getbyeditdata(\' ' + data + '\')"><i style="color:teal;" class="far fa-eye"></i> </a>';
        }

    });
    data[datacount + 1] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a "padding:1px;" class="on-default remove-row" href="#" onclick="return Delete(\'' + data + '\',this)"><i style="color:teal;" class="fas fa-trash-alt"></i></a>';
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
function Delete(billno)
{

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
                url: "/Payment/Delete/"  ,
                type: "POST",
                data: "{ 'billno': '" + billno + "'}",
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
}
function cleardata()
{
    $('#txtpaidamount').val('0');
    $('#paymentdetails tbody ').empty();
    $('#lblbillno').text('');
    var currentDate = new Date();
    $("#txtentrydate").datepicker().datepicker("setDate", currentDate);
    $('#txdescription').val('')
    $('#ddltype').val('customer')
     Bindddl_Data($('#ddldropdwon'), '/Customer/Getcustomerdropdown');
  
 
     $('#txtentrydate').removeAttr('disabled')
    
     $('#ddltype').removeAttr('disabled')
     $('#ddldropdwon').removeAttr('disabled')
     $('#txtpaidamount').removeAttr('disabled')
    
    
   
}
