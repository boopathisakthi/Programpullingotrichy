$(document).ready(function () {

    LoadData();
})
function cleardata() {
    $('#txtpartnumber').val('');  
    $('#txtbinlocation').val('');
    $('#hfsysid').val('');
}
function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "PartNumber";
    data[2] = "Partdescription";
    data[3] = "PartCategory";
    data[4] = "BinLocation";
    data[5] = "CurrentStock";

    binddataedit("#Gvlist", "/StockReport/Getlist", data);
}


function getbyID(SysId) {

    editassignvalue(SysId, '/Binlocation/GetbyID')
}

function assignvalue(Item) {
    $('#hfsysid').val(Item.sys_id);
    $('#txtpartnumber').val(Item.partnumber);
    $('#txtbinlocation').val(Item.binlocation);
    $('#con-close-modal1').modal('show');
}

function Add() {

        var Product = {
            PartNumber: $('#txtpartnumber').val(),           
            BinLocation: $('#txtbinlocation').val(),            
            Sysid: $('#hfsysid').val()
        };
        return insertdata("#frm", Product, "/Binlocation/Save");
        $('#con-close-modal1').modal('show');

}
function cleardata() {
    $('#hfsysid').val();
    $('#txtpartnumber').val();
    $('#txtbinlocation').val();
    $('#con-close-modal1').modal('hide');
}