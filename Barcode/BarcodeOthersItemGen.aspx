<%@ Page Title="Barcode Others ItemWise" Language="C#" CodeBehind="BarcodeOthersItemGen.aspx.cs" Inherits="WebApp.BarCode.BarcodeOthersItemGen" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
    <!-- App css -->
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/assets/css/icons.css" />
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
</head>
<body>
    <div id="wrapper">
        <div class="content">
            <div class="">
                <div class="container">
                    <form id="frm" runat="server">
                        <div class="row">
                            <div class="col-xl-12">

                                <div class="card m-t-30">
                                    <div class="card-heading ">
                                        <h2 class="card-title ">Barcode Table</h2>
                                        <div class="fa-pull-right panel-btns">
                                            <%--<button type="button" style="margin-top:-30px;" class="btn btn-secondary waves-effect btn-sm" data-toggle="modal" data-target="#con-close-modal"><i class="fa fa-plus"></i>&nbsp;Bulk Upload</button>--%>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <asp:DropDownList runat="server" ID="ddlbarcode" onchange="hidetable()"  CssClass="form-control">
                                                        <asp:ListItem value="Specific">Specific</asp:ListItem>
                                                        <asp:ListItem value="All">All</asp:ListItem>
                                                    </asp:DropDownList>
                                                   <%-- <select id="ddlbarcode" onchange="hidetable()" class="form-control">
                                                        <option value="Specific">Specific</option>
                                                        <option value="All">All</option>
                                                    </select>--%>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <asp:HiddenField ID="hfjqdatas" runat="server" />
                                                 <asp:LinkButton ID="btnsave" runat="server" CssClass="btn btn-info" OnClick="btnsave_Click" OnClientClick="return Genarate()">&nbsp;Genarate Barcode</asp:LinkButton>
                                                <%--<button type="button" onclick="return Genarate()" class="btn btn-info waves-effect waves-light">Genarate Barcode</button>--%>
                                            </div>
                                        </div>
                                        <div class="row barcodediv">
                                            <div class="col-md-12 table-responsive">

                                                <table id="tblbarcode" class="" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                                    <tbody class="">
                                                        <tr class="trbody">
                                                            <td class="col-md-12 ">

                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="row">
                                                                            <input type="hidden" id="hfdetailsysid" class="hfdetailsysid  form-control clear1" />
                                                                            <div class="col-md-2">
                                                                                <div class="form-group">
                                                                            <input type="hidden" id="hfvalue" class="hfvalue  form-control clear1" />
                                                                                    <label class="control-label">PartNumber</label>
                                                                                    <input type="tel" class="form-control  txtpartnumber" onblur="Getdetails(this)" id="txtpartnumber" />

                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <div class="form-group">
                                                                                    <label class="control-label">CategoryName</label>
                                                                                    <input type="tel" class="form-control dis  txtcategory" id="txtcategory" />

                                                                                </div>
                                                                            </div>
                                                                              <div class="col-md-3">
                                                                                <div class="form-group">
                                                                                    <label class="control-label">Part Description</label>
                                                                                    <input type="tel" class="form-control dis  txtpartdesc" id="txtpartdesc" />

                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-2">
                                                                                <div class="form-group">
                                                                                    <label class="control-label">Binlocation</label>
                                                                                    <input type="tel" class="form-control dis  txtbinlocation" id="txtbinlocation" />

                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-1">
                                                                                <div class="form-group">
                                                                                    <label class="control-label">Qty</label>
                                                                                    <input type="tel" class="form-control  txtstock" id="txtstock" />

                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-1">

                                                                                <button type='button'
                                                                                    value='Delete' class="btn m-t-20 fa-pull-right  btn-icon btn-danger del">
                                                                                    X
                                                                                </button>
                                                                                <span class='btn m-t-20 fa-pull-right  btn-icon btn-warning lbldel' style='display: none;'><i class="fas fa-trash-alt"></i></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td>
                                                                <div class="fa-pull-right">
                                                                    <button type="button" id="InsertRow" class="btn btn-sm btn-success Footer" onclick="Add_Row()"><i class="fa fa-plus-circle"></i>&nbsp;Add More</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 table-responsive">
                                <asp:ScriptManager runat="server"></asp:ScriptManager>
                                <rsweb:ReportViewer ID="rvMaster" runat="server" Width="900px"></rsweb:ReportViewer>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="footer">
                <%=DateTime.Now.Year%> © Apllication <span class="d-none d-sm-inline-block">Developed by Zerobugz.</span>
            </footer>
        </div>
    </div>

    <script src="/assets/js/jquery.min.js"></script>
    <script src="/assets/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/detect.js"></script>
    <script src="/assets/js/fastclick.js")></script>
    <script src="/assets/js/jquery.blockUI.js"></script>
    <script src="/assets/js/waves.js"></script>
    <script src="/assets/js/jquery.slimscroll.js"></script>
    <script src="/assets/js/jquery.scrollTo.min.js"></script>
    <script src="/plugins/switchery/switchery.min.js"></script>
    <script src="/Scripts/jquery.validate.min.js"></script>
    <script src="/Scripts/jquery.validate.unobtrusive.js"></script>

    <script src="/Pagescripts/keyrestrict.js"></script>
    <script src="/Pagescripts/dynamictable.js"></script>
    <script src="/Pagescripts/Master.js"></script>
    <script src="/Pagescripts/Barcode/Genaratebarcode.js"></script>
</body>
</html>



