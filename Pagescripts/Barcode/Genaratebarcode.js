
$(document).ready(function () {
   
    $(".dis").attr("disabled", "disabled");
   

})

function hidetable() {
    
    if ($('#ddlbarcode').val() == 'All') {
       
        $('.barcodediv').toggle('slow');
    } else {
        $('.barcodediv').toggle('slow');

    }
}

function Genarate() {
        var list = [];

        $('#tblbarcode tbody tr').each(function (index, ele) {
            if ($('.del', this).val() =='Delete')
            {
            var Barcode = {
                sys_id: $('.hfvalue', this).val(),
                PartNumber: $('.txtpartnumber', this).val(),
                PartCategory: $('.txtcategory', this).val(),
                BinLocation: $('.txtbinlocation', this).val(),
                StockQty: $('.txtstock', this).val(),
                PartDescription: $('.txtpartdesc', this).val(),
                IsDelete: ($('.del', this).val())

            }
            list.push(Barcode);
        }
        })
        var Updatedatas = {
            Type: $('#ddlbarcode').val(),
            BarcodeDetails: list
        };
        console.log(list);
        //alert(JSON.stringify(list));
        $('#hfjqdatas').val(JSON.stringify(list))
        var i = $(btn).attr("href");
        i = i.slice(25, i.length);
        i = i.substring(0, i.length - 5);
        __doPostBack(i, '');
        return false;

       // console.log(Updatedatas);

       // insertdatatrip("#frm", Updatedatas, "/Barcode/save");
      //  return false;
   
}

function insertdatatrip(frmname, fieldvalue, uri) {

    $.ajax({
        url: uri,
        data: JSON.stringify(fieldvalue),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.Status == true) {
                toastr.success(result.Message);
                cleardata();
                LoadData();
                $('#con-close-modal1').modal('hide');

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
}
//-----------------getbarcode start-----------------//
function Getdetails(ctrl) {
   
    var barcode = $(ctrl).closest('tr').find('.txtpartnumber').val(); 
    Getdatawithctrl(ctrl, barcode, '/Barcode/Getbarcodevalues')
}
function SetValues(ctrl, Item) {
    
    $(ctrl).closest('tr').find('.txtcategory').val(Item.category);
    $(ctrl).closest('tr').find('.hfvalue').val('KMP'+Item.sys_id);
    $(ctrl).closest('tr').find('.txtbinlocation').val(Item.binlocation);
    $(ctrl).closest('tr').find('.txtpartdesc').val(Item.partdescription);
    $(ctrl).closest('tr').find('.txtstock').val('1'); 
   
}
//----------------- end---------------------//

//-----------------details table --------------//
$("#tblbarcode tbody").on('click', '.del', function () {
    var currentRow = $(this).closest("tr");
    $(currentRow).find('.del').val("Deleted");
    $(currentRow).find('.del').attr("style", "display: none;");
    $(currentRow).find('.lbldel').attr("style", "display: block;background-color: #e6b800;color: white;padding:8px 15px; border-radius:3px; font-weight: bold;");
    $(currentRow).find('.removediv').hide();


    //check();removediv
});
function Add_Row() {
    $('.removediv').show();
    var row = $("#tblbarcode .trbody").first().clone();
    clear(row);
    $('#tblbarcode').append(row);

    return false;
}
function clear(row) {
    var sno = parseInt($(row).find('.sno').text()) + 1;
    $(row).find('.sno').text(sno);
    $(row).find('.ddl').val("0");
    $(row).find('.sysid').val("");
    $(row).find('.hfdetailsysid').val("");
    $("td input:text", row).val("");
    $('td .lbldel', row).attr("style", "display: none;");
    $("td button[type=button]", row).val('Delete');
    $("td button[type=button]", row).attr("style", "display: block");
    $("td input[type=date]", row).val('');
    $("td input[type=time]", row).val('');
    $(".Place", row).val('');

    $(".txtcategory", row).val('');
    $(".txtpartnumber", row).val('');
    $(".txtpartdesc", row).val('');
    $(".txtbinlocation", row).val('');
    $(".txtstock", row).val('');
   

}
//----------------end-------------------------//