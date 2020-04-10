$(document).ready(function () {

    $('#wrapper').addClass("enlarged forced");
    $('ul').removeAttr("style");
    loadtotal_profit();
    loadlessstock();
   // Loadoutofstock();
   // Loadfreq();
  //  Loadfreqproduct();
})

function loadtotal_profit() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/Gettotalprofit";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                $("#lbltotalsales").html(item.totalsales)
                $("#lbltotalpurchase").html(item.totalpurchase)
                $("#lbltotalexpense").html(item.totalexpense)
                $("#lblsuppliercount").html(item.suppliercount)
                $("#lblsalescount").html(item.dealercount)
                $("#lblprofit").html(item.profit)
                var rows = "<tr>"
        + "<td>" + item.SNo + "</td>"
        + "<td>" + item.PartNumber + "</td>"
        + "<td>" + item.Partdescription + "</td>"
        + "<td>" + item.PartCategory + "</td>"

        + "<td>" + item.BinLocation + "</td>"
        + "<td>" + parseInt(item.CurrentStock) + "</td>"
        + "</tr>";
                $('#gvfreqqty tbody').append(rows);
            });
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
    return false

}
function loadlessstock() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/Getlessstock";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows = '<a>' +
                     '<div class="inbox-item">' +
                        '<div class="inbox-item-img"><h5>' + item.SNo + '</h5></div>' +
                        '<p class="inbox-item-author"><span class="text-danger text-dark">' + item.sparename + '</span></p>' +
                        '<p class="inbox-item-text">' + (item.description == '' ? 'no description' : item.description) + '</p>' +
                        '<p class="inbox-item-date"><span class="avatar-sm-box bg-pink">' + parseInt(item.availableqty) + '</span></p>' +
                    '</div>' +
                     '</a>';
                $('#divfreq').append(rows);
            });
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
    return false

}
function Loadoutofstock() {
    var data = [];
    data[0] = "SNo";
    data[1] = "PartNumber";
    data[2] = "Partdescription";
    data[3] = "PartCategory";
    data[4] = "BinLocation";
    data[5] = "CurrentStock";
    bindReportdata("#gvlessqty", "/Dashboard/Getlessqtylist", data);
}
function Loadoutofstock1() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/Getlessqtylist";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows = "<tr>"
        + "<td>" + item.SNo + "</td>"
        + "<td>" + item.PartNumber + "</td>"
        + "<td>" + item.Partdescription + "</td>"
        + "<td>" + item.PartCategory + "</td>"

        + "<td>" + item.BinLocation + "</td>"
        + "<td>" + item.CurrentStock + "</td>"
        + "</tr>";
                $('#gvlessqty tbody').append(rows);
            });
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
    return false

}
function Loadfreq() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/GetFreqqtylist";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows = "<tr>"
        + "<td>" + item.SNo + "</td>"
        + "<td>" + item.PartNumber + "</td>"
        + "<td>" + item.Partdescription + "</td>"
        + "<td>" + item.PartCategory + "</td>"

        + "<td>" + item.BinLocation + "</td>"
        + "<td>" +parseInt(item.CurrentStock) + "</td>"
        + "</tr>";
                $('#gvfreqqty tbody').append(rows);
            });
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
    return false

}
function Loadfreqproduct() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/GetFreqqtylist";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows ='<a>' +
                     '<div class="inbox-item">' +
                        '<div class="inbox-item-img"><h5>' + item.SNo + '</h5></div>' +
                        '<p class="inbox-item-author"><span class="text-danger text-dark">' + item.PartNumber + '</span>~<span class="text-success text-right">' + item.PartCategory + '</span></p>' +
                        '<p class="inbox-item-text">' + item.Partdescription + '</p>' +
                        '<p class="inbox-item-date"><span class="avatar-sm-box bg-pink">' + parseInt(item.CurrentStock) + '</span></p>' +
                    '</div>' +
                     '</a>';
                $('#divfreq').append(rows);
            });
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
    return false

}