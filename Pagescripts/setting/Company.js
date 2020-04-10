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
    Parametercompanybinddata("#gvcompanylist", "/Company/GetList", data);
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
function Parametercompanybinddata(tablename, uri, data, FilterParameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }
    data[datacount] = eval({
        "data": "Sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getByParameter(' + data + ')"><i style="color:teal;" class="far fa-pencil"></i>  </a>';
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
