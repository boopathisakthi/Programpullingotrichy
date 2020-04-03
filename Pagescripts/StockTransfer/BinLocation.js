
$(document).ready(function () {
    //LoadData();
})
function LoadData() {
    var data = [];
    data[0] = "SNo";
    data[1] = "Entrydate";
    data[2] = "From_company_Sysid";
    data[3] = "To_company_Sysid";
    data[4] = "Description";
    data[5] = "logname";
    binddataview("#gvproductlist", "/BranchBinLocation/GetList", data);
}           