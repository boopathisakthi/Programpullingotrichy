$(document).ready(function () {
    LoadData();
})

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "sparename";
    data[2] = "hsncode";
    data[3] = "taxname";
    data[4] = "openingstock";
    data[5] = "stockinhand";

    bindReportdata("#Gvlist", "/StockReport/Getlist", data);
}

//---------------------------------download excell file--------------------------------------//
function DownloadData() {

    var FilterParameter = {
        Fdate: 'test',
    }

    $.ajax({
        url: "/StockReport/Downloadex/",
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
                link.download = "Stock" + time + ".xlsx";
                link.click();
            }

        },
        error: function (err) {
            toastr.error("Something Went Wrong");
        }

    });
    return false;

}