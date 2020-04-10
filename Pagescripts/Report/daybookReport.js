$(document).ready(function () {
    
  
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
    data[1] = "entrydate";
    data[2] = "type";
    data[3] = "invoiceno";
    data[4] = "customersysid";
    data[5] = "total";
    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
       
    }

    Parameterbinddata("#Gvlist", "/DayBookReport/Getlist", data, FilterParameter);
}