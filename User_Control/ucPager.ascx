<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucPager.ascx.cs" Inherits="SRILAKSHMIAGENCIES.User_Control.ucPager" %>
<div class="col-md-6">
    <div class="dataTables_paginate pagination2 paging_simple_numbers" style="float:inherit;">
        <ul class="pagination">
            <li class="paginate_button">
                <asp:LinkButton ID="btnPagerinfo" runat="server" OnClientClick="return false;">Page Info: </asp:LinkButton></li>
        </ul>
    </div>
</div>
<div class="col-md-6">
    <div class="dataTables_paginate pagination2 paging_simple_numbers">
        <ul class="pagination">
            <li class="paginate_button">
                <asp:LinkButton ID="btnPagerFirst" runat="server" OnClick="btnPager_Click"><i class="icon icons-multimedia-31"></i></asp:LinkButton></li>
            <li class="paginate_button">
                <asp:LinkButton ID="btnPagerPrev" runat="server" OnClick="btnPager_Click"><i class="icon icons-multimedia-30"></i></asp:LinkButton></li>
            <li class="paginate_button">
                <asp:LinkButton ID="btnPagerNext" runat="server" OnClick="btnPager_Click"><i class="icon icons-multimedia-29"></i></asp:LinkButton></li>
            <li class="paginate_button">
                <asp:LinkButton ID="btnPagerLast" runat="server" OnClick="btnPager_Click"><i class="icon icons-multimedia-32"></i></asp:LinkButton></li>
        </ul>
    </div>
</div>
