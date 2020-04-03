$(document).ready(function () {
   
    $('.companyEntry').hide();
    LoadData();
    BindddlData('#ddlcity', '/Company/getcity');
    BindddlData('#ddlstate', '/Company/getstate');

})
function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "CompanyName";
    data[2] = "Email";
    data[3] = "Mobileno";
    data[4] = "city";
    data[5] = "State";
    Parameterbinddata("#gvcompanylist", "/Company/GetList", data);
}

function cleardata() {
    $('[id$=hfsysid]').val('');
    $('#txtcompanyname').val('');
    $('#txtgstno').val('');
    $('#txtpanno').val('');
    $('#txtaddress1').val('');
    $('#txtaddress2').val('');
    $('[id$=ddlcity]').val('');
    $('#txtmobileno').val('');
    $('#txttelephoneno').val('');
    $('#txtemail').val('');
    $('[id$=ddlstate]').val('');
    $('#txtbankname').val('');
    $('#txtbranchname').val('');
    $('#txtaccountname').val('');
    $('#txtifscno').val('');
    $('#txtpincode').val('');
    $('#txtaccountnumber').val('');
}
function Show() {
    cleardata();
    $('.companylist').toggle('slow');
    $('.companyEntry').show();

   
}
function closedata() {

    $('.companylist').toggle('slow');
    $('.companyEntry').hide();
    cleardata();
    ClearPreview();
   
}
function getbycompanysysid(SysId) {

    var sys_id = SysId;

    try {
        $.ajax({
            url: '/Company/GetbyID',
            data: "{ 'sys_id': '" + sys_id + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (Data) {

                var parsed = JSON.parse(Data);


                if (parsed.length == 1) {
                    $.map(parsed, function (Item) {

                        $('[id$=hfsysid]').val(Item.sys_id);
                        $('#txtcompanyname').val(Item.company_name),
                        $('#txtgstno').val(Item.gst_no),
                        $('#txtpanno').val(Item.panno),
                        $('#txtaddress1').val(Item.address1),
                        $('#txtaddress2').val(Item.address2),
                        $('[id$=ddlcity]').val(Item.city),
                        $('#txtmobileno').val(Item.mobileno),
                        $('#txttelephoneno').val(Item.telephoneno),
                        $('#txtemail').val(Item.email),
                        $('[id$=ddlstate]').val(Item.state),
                        $('#txtbankname').val(Item.bankname),
                        $('#txtbranchname').val(Item.branchname),
                        $('#txtaccountname').val(Item.accountholdername),
                        $('#txtifscno').val(Item.ifscecode),
                        $('#txtpincode').val(Item.pincode),
                        $('#txtaccountnumber').val(Item.accountnumber)
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
function Add() {
        var CompanyDetails = {
        CompanyName: $('#txtcompanyname').val(),
        PanNo: $('#txtpanno').val(),
        Address1: $('#txtaddress1').val(),
        Address2: $('#txtaddress2').val(),
        city: $('#ddlcity').val(),
        Mobileno: $('#txtmobileno').val(),
        Telephoneno: $('#txttelephoneno').val(),
        Email: $('#txtemail').val(),
        State: $('#ddlstate').val(),
        BankName: $('#txtbankname').val(),
        BranchName: $('#txtbranchname').val(),
        AccountHolderName: $('#txtaccountname').val(),
        IfscCode: $('#txtifscno').val(),
        Pincode: $('#txtpincode').val(),
        AccountNumber: $('#txtaccountnumber').val(),
        GstNo: $('#txtgstno').val(),
        Sysid: $('[id$=hfsysid]').val()

      };
  
    return insertdata("#frm", CompanyDetails, "/Company/Save");
  
}

function afterinsertupdate()
{
    closedata();
}
function getByParameter(SysId) {
  
    editassignvalue(SysId, '/Company/GetbyID');
    $('.companylist').toggle('slow');
    $('.companyEntry').show();
}

function assignvalue(Item) {
    $('[id$=hfsysid]').val(Item.sys_id);
    $('#txtcompanyname').val(Item.company_name),
    $('#txtgstno').val(Item.gst_no),
    $('#txtpanno').val(Item.panno),
    $('#txtaddress1').val(Item.address1),
    $('#txtaddress2').val(Item.address2),
    $('[id$=ddlcity]').val(Item.city),
    $('#txtmobileno').val(Item.mobileno),
    $('#txttelephoneno').val(Item.telephoneno),
    $('#txtemail').val(Item.email),
    $('[id$=ddlstate]').val(Item.state),
    $('#txtbankname').val(Item.bankname),
    $('#txtbranchname').val(Item.branchname),
    $('#txtaccountname').val(Item.accountholdername),
    $('#txtifscno').val(Item.ifscecode),
    $('#txtpincode').val(Item.pincode),
    $('#txtaccountnumber').val(Item.accountnumber)
}

