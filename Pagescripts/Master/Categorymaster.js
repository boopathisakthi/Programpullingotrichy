$(document).ready(function () {
    LoadData();

})

function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "Category";
    data[2] = "Description";

    binddata("#Gvlist", "/Category/Getlist", data);
}

function Add() {
    var Data = {
        Category: $('#Category').val(),
        Description: $('#Description').val(),
      
        Sysid: $('#hfsysid').val()
    };
    console.log(Data);
    return insertdata("#frm", Data, "/Category/Save");

    LoadData();
    cleardata();
}

function getbyID(SysId) {
    //alert(SysId)
    editassignvalue(SysId, '/Category/GetbyID')
}

function assignvalue(Item) {
    $('#hfsysid').val(Item.sys_id);
    $('#Category').val(Item.category);
    $('#Description').val(Item.description);
   
}

function Delete(ID) {
    deletedata(ID, "/Category/Delete/");

}

function cleardata() {
    $('#Category').val("");
    $('#Description').val("");
    $('#hfsysid').val("");
}


