$(document).ready(function () {
    LoadData();
  //  BindddlData('#ddlCompanyType', '/Party/GetCompanylist');
   
})

function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "PartyName";
    data[2] = "Mobile";
    data[3] = "Address";
    binddata("#gvproductlist", "/Party/GetPartyList", data);
}

function Add() {
    var Party = {
        PartyName: $('#PartyName').val(),
        Mobile: $('#txtmobile').val(),
        GSTNO: $('#txtgstno').val(),
        Address: $('#txtaddress').val(),
        Description: $('#txtdesc').val(),
        SysId: $('[id$=hfsysid]').val(),
        PartyCompany: $('#ddlCompanyType').val()
    };
    return insertdata("#frm", Party, "/Party/Save");
}

function getbyID(SysId) {
   
    editassignvalue(SysId, '/Party/GetbyID')
}

function assignvalue(Item) {
    $('[id$=hfsysid]').val(Item.sys_id);
    $('[id$=PartyName]').val(Item.party_name);
    $('[id$=txtmobile]').val(Item.mobile);
    $('[id$=txtgstno]').val(Item.gst_no);
    $('[id$=txtaddress]').val(Item.address);
    $('[id$=txtdesc]').val(Item.description);
    $('#ddlCompanyType').val(Item.party_company);
}

function Delete(ID) {
    deletedata(ID, "/Party/Delete/")
}

function cleardata() {
    $('.clear').val("");
    BindddlData('#ddlCompanyType', '/Party/GetCompanylist');
    $('[id$=hfsysid]').val("")
}

function Uploadexcel()
{
    excelupload("#Fileupload", "/Party/UploadExcel")
}
