sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("zc518.gw0002.fioricrudremaster.controller.AirView", {
        onInit: function () 
        {

        },

        onSearch: function()
        {
    
            let oTable   = this.getView().byId("airList"), // 현재 View에서 사용할 Table을 가져와야함.
                oBinding = oTable.getBinding("rows"),      // Binding을 이용해서 Rows에 있는 EntitiySet을 가져옴
                oFilter  = null,                           // 검색조건
                aFilter  = [];                             // 검색 조건이 2개 이상일수도 있어서 Array에 감싸서 가져와야함

            var vCarrid  = this.getView().byId("ICarrid").getValue(),   
                vConnid  = this.getView().byId("IConnid").getValue();   // 입력한 값 받아옴

            if (vCarrid != "")  // 사용자가 입력을 했다면
            {
                oFilter = new Filter
                (
                    {
                        path: "Carrid",
                        operator: FilterOperator.Contains,  // Contains : 포함하고 있는 것
                        value1 : vCarrid
                    }
                );

                aFilter.push(oFilter);  // oFilter의 값을 aFilter에 넣어줌.
                oFilter = null;
            }

            if (vConnid != "")  // 사용자가 입력을 했다면
            {
                oFilter = new Filter
                (
                    {
                        path: "Connid",
                        operator: FilterOperator.EQ,    // Connid가 N Type이라 숫자만 들어가므로 EQ로 해야함.
                        value1 : vConnid
                    }
                );

                aFilter.push(oFilter);
                oFilter = null;
            };

            oBinding.filter(aFilter);

        }
    });
});
