<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucRecord_Search.ascx.cs" Inherits="SRILAKSHMIAGENCIES.User_Control.ucRecord_Search" %>
<div class="col-md-3">
    <div class="form-group">
        <label>Show entries:</label>
        <asp:DropDownList ID="ddlRecordSearch" runat="server" CssClass="form-control" data-search="true" OnSelectedIndexChanged="ddlRecordSearch_SelectedIndexChanged" AutoPostBack="true">
            <asp:ListItem Selected="True" Value="5">5</asp:ListItem>
            <asp:ListItem Value="10">10</asp:ListItem>
            <asp:ListItem Value="25">25</asp:ListItem>
            <asp:ListItem Value="50">50</asp:ListItem>
            <asp:ListItem Value="75">75</asp:ListItem>
            <asp:ListItem Value="100">100</asp:ListItem>
            <asp:ListItem Value="50000">Show All</asp:ListItem>
        </asp:DropDownList>
    </div>
</div>
<div class="col-md-3"></div>

<div class="col-md-3">
    <div class="form-group">
        <label>Search By</label>
        <asp:DropDownList ID="ddlColName" runat="server" CssClass="form-control" data-search="true" DataTextField="DisplayName"
            DataValueField="ColumnName">
        </asp:DropDownList>
    </div>
</div>
<div class="col-md-3">
    <div class="form-group">
        <label>Search Text</label>
        <div class="input-group">
            <asp:TextBox ID="txtSearchText" runat="server" class="form-control"></asp:TextBox>
            <asp:LinkButton ID="btnSearch" runat="server" CssClass="input-group-addon btn-primary" OnClick="btnSearch_Click"><i class="fa fa-search p-0"></i></asp:LinkButton>
        </div>
    </div>
</div>

