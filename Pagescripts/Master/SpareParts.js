$(document).ready(function () {
    LoadData();
    $(".dis").attr("disabled", "disabled");
    Bindddl_Data($('#ddltax'), '/Sparepart/gettax');

})

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "sparename";
    data[2] = "purchaseprice";
    data[3] = "salesprice";

    binddata("#Gvlist", "/Sparepart/Getlist", data);
}

function Add() {
  
    if (parseInt($('#purchaseprice').val()) > parseInt($('#salesprice').val()))
    {
        toastr.error('Purchase Price should be less than sales price');
        return false;
    }
    
    var Data = {
        sparename: $('#sparename').val(),
        hsncode:$('#hsncode').val(),
        description: $('#txtdescription').val(),
        salesprice: $('#salesprice').val(),
        purchaseprice: $('#purchaseprice').val(),
        openingstock: $('#txtopeningstock').val(),
        sysid: $('#hfsysid').val(),
        taxname: $('#ddltax').find('option:selected').text(),
        taxid: $('#ddltax').val()
    };
  
    return insertdata("#frm", Data, "/Sparepart/Save");

   
}
function afterinsertupdate()
{
    LoadData();
    cleardata();
}
function getbyID(SysId) {
    //alert(SysId)
    editassignvalue(SysId, '/Sparepart/GetbyID')
}

function assignvalue(Item) {
    $('#con-close-modal1').modal('show');
    $('#hfsysid').val(Item.sysid);
    $('#sparename').val(Item.sparename);
    $('#description').val(Item.description);
    $('#txtopeningstock').val(Item.openingstock);
    $('#salesprice').val(Item.salesprice);
    $('#purchaseprice').val(Item.purchaseprice);
    $('#ddltax').val(Item.tax);
    $('#hsncode').val(Item.hsncode);
   
}

function Delete(ID) {
    deletedata(ID, "/Sparepart/Delete/");

}

function cleardata() {
    $('#description').val("");
    $('#txtopeningstock').val("");
    $('#sparename').val("");
    $('#hfsysid').val("");
    $('#salesprice').val("");
    $('#purchaseprice').val("");
    $('#hsncode').val("");
    Bindddl_Data($('#ddltax'), '/Sparepart/GetcategoryList');
    $('#ddltax').val('3');
}
function show()
{
    cleardata();
    $('#ddltax').val('3');
    $('#con-close-modal1').modal('show');

}
function closedata()
{
   
    cleardata();
    $('#con-close-modal1').modal('hide');
}

