$(document).ready(function () {
    LoadData();

})

function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "Expanse";
    data[2] = "Description";

    binddata("#Gvlist", "/Expensemasster/Getlist", data);
}

function Add() {
    var Data = {
        Expanse: $('#Expanse').val(),
        Description: $('#Description').val(),      
        Sysid: $('#hfsysid').val()
    };
   
    return insertdata("#frm", Data, "/Expensemasster/Save");

    LoadData();
    cleardata();
}
function afterinsertupdate() {
    cleardata();
    LoadData();
}

function getbyID(SysId) {
    //alert(SysId)
    editassignvalue(SysId, '/Expensemasster/GetbyID')
}

function assignvalue(Item) {
    $('#hfsysid').val(Item.sysid);
    $('#Expanse').val(Item.expansename);
    $('#Description').val(Item.description);
   
}

function Delete(ID) {
    deletedata(ID, "/Expensemasster/Delete/");

}

function cleardata() {
    $('#Expanse').val("");
    $('#Description').val("");
    $('#hfsysid').val("");
}


