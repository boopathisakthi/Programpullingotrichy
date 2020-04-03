<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="salereport.aspx.cs" Inherits="WebApp.Report.SalesReport.salereport" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div class="row">
            <div class="col-md-12 table-responsive">
                <asp:ScriptManager runat="server"></asp:ScriptManager>
                <rsweb:ReportViewer ID="rvMaster" runat="server" Width="900px"></rsweb:ReportViewer>

            </div>
        </div>

    </form>
</body>
</html>
