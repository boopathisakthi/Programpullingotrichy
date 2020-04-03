$(document).ready(function () {
    //  
    Bindddl_Data($('#ddlsupplier'), '/Customer/GetSupplierdropdown');
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);

    $("#txtfromdate").datepicker().datepicker("setDate", startDateFrom);
    $("#txttodate").datepicker().datepicker("setDate", currentTime);
    LoadData();
})

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "customersysid";
    data[2] = "total_invoice";
    data[3] = "mobile";
    data[4] = "total";
    data[5] = "description";
    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
        customersysid: $('#ddlsupplier').val()
    }

    Parameterbinddata("#Gvlist", "/SupplierBalance/Getlist", data, FilterParameter);
}
function DownloadData() {

    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
        customersysid: $('#ddlcustomer').val()
    }


    $.ajax({
        url: "/SupplierBalance/Downloadex/",
        data: JSON.stringify(FilterParameter),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (Rdata) {

            if (Rdata.Status == false) {


                toastr.error("Something Went Wrong");

            }
            else {
                debugger;
                var bytes = new Uint8Array(Rdata.FileContents);
                var blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                var d = new Date($.now());
                var time = (d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                link.download = "SupplierBalance" + time + ".xlsx";
                link.click();
            }

        },
        error: function (err) {
            toastr.error("Something Went Wrong");
        }

    });
    return false;

}