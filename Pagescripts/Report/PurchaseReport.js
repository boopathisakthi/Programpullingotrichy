$(document).ready(function () {
    //  LoadData();
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
    data[1] = "invoiceno";
    data[2] = "entrydate";
    data[3] = "customersysid";
    data[4] = "total";
    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
        customersysid: $('#ddlsupplier').val()
    }

    Parameterbindwithviewdata("#Gvlist", "/PurchaseReport/Getlist", data, FilterParameter);
}
function DownloadData() {

    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
        customersysid: $('#ddlsupplier').val()
    }


    $.ajax({
        url: "/PurchaseReport/Downloadex/",
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
                link.download = "purchase" + time + ".xlsx";
                link.click();
            }

        },
        error: function (err) {
            toastr.error("Something Went Wrong");
        }

    });
    return false;

}

function getdetails(sysid) {
    $.ajax({
        url: '/Stock/GetById',
        data: "{ 'sysid': '" + sysid + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            $("#detailsTable tbody").empty();
            $.each(res.result.SpareDetails, function (i, v) {
                let sno = i + 1;
                let row = `<tr><td>` + sno + `</td><td>` + v.sparename + `</td><td>` + v.hsncode + `</td><td>` + v.purchaseprice + `</td><td>` + v.qty + `</td><td>` + (v.qty*v.purchaseprice) + `</td></tr>`;
                $("#detailsTable tbody").append(row);
            })
            $('#con-close-modal1').modal('show')

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