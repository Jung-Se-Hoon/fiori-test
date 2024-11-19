sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // MessageToast 사용을 위한 모듈 선언 (밑에 function에도 Define한 순서에 맞게 선언해야함)
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("zc518.gw0001.fioricrud01.controller.MatView", {
        onInit: function () 
        {

        },

        // Search Function
        onSearch: function ()
        {
            let oTable   = this.getView().byId("matList"),
                oBinding = oTable.getBinding("rows"),
                oFilter  = null,
                aFilter  = [];

            var vWerks = this.getView().byId("IWerks").getValue(),
                vMatnr = this.getView().byId("IMatnr").getValue();

            if (vWerks != "")
            {
                oFilter = new Filter({
                    path: "Werks",
                    operator: FilterOperator.Contains,
                    value1: vWerks
                });

                aFilter.push(oFilter);
                oFilter = null;
            };

            if (vMatnr != "")
            {
                oFilter = new Filter({
                    path: "Matnr",
                    operator: FilterOperator.Contains,
                    value1: vMatnr
                });

                aFilter.push(oFilter);
                oFilter = null;
            };

            oBinding.filter(aFilter);
        },

        onClear: function ()
        {
            this.getView().byId("Werks").setSelectedKey("0001");
            this.getView().byId("Matnr").setValue("");
            this.getView().byId("Mtart").setValue("");
            this.getView().byId("Maktl").setValue("");
            this.getView().byId("Menge").setValue(0);
            this.getView().byId("Meins").setValue("");
            this.getView().byId("Dmbtr").setValue(0);
            this.getView().byId("Waers").setValue("");
        },

        onDisplay: function ()
        {
            let oTable   = this.getView().byId("matList"),
                aIndex   = oTable.getSelectedIndices(), //선택한 행들의 번호를 배열로 줌
                oContext = oTable.getContextByIndex(aIndex[0]),//어차피 한개행만 선택 가능해서 0번째 값 전달해서 종합정보센터 Context 받아옴
                oData    = oContext.getObject(); //getObject 메소드 통해서 해당행의 EntitySet 의 레코드를 받아옴

            this.getView().byId("Werks").setSelectedKey(oData.Werks);
            this.getView().byId("Matnr").setValue(oData.Matnr);
            this.getView().byId("Mtart").setValue(oData.Mtart);
            this.getView().byId("Maktl").setValue(oData.Maktl);
            this.getView().byId("Menge").setValue(oData.Menge);
            this.getView().byId("Meins").setValue(oData.Meins);
            this.getView().byId("Dmbtr").setValue(oData.Dmbtr);
            this.getView().byId("Waers").setValue(oData.Waers);
        },

        onRead: function ()
        {
            let oTable   = this.getView().byId("matList"),
                oModel   = oTable.getModel(),
                aIndex   = oTable.getSelectedIndices(),
                oContext = oTable.getContextByIndex(aIndex[0]),
                oData    = oContext.getObject();

            oModel.read("/MatSet(Werks='"+ oData.Werks +"',Matnr='"+ oData.Matnr +"')",
            {
                success: function (oReturn)
                {
                    this.getView().byId("Werks").setSelectedKey(oReturn.Werks);
                    this.getView().byId("Matnr").setValue(oReturn.Matnr);
                    this.getView().byId("Mtart").setValue(oReturn.Mtart);
                    this.getView().byId("Matkl").setValue(oReturn.Maktl);
                    this.getView().byId("Menge").setValue(oReturn.Menge);
                    this.getView().byId("Meins").setValue(oReturn.Meins);
                    this.getView().byId("Dmbtr").setValue(oReturn.Dmbtr);
                    this.getView().byId("Waers").setValue(oReturn.Waers);
                }.bind(this),
                error: function ()
                {
                    MessageToast.show("Mat Infor Read Error");
                }
            });
        },

        onUpdate: function ()
        {
            let oTable   = this.getView().byId("matList"),
                aIndex   = oTable.getSelectedIndices(),
                oContext = oTable.getContextByIndex(aIndex[0]),
                oData    = oContext.getObject(),
                oModel   = oTable.getModel(),
                oUpdate  = {};
            
            var vMenge = this.getView().byId("Menge").getValue().replaceAll(',', ''),
                vDmbtr = this.getView().byId("Dmbtr").getValue().replaceAll(',', '');
                
            if (vMenge == "")
            {
                vMenge = 0;
            };

            if (vDmbtr == "")
            {
                vDmbtr = 0;
            };

            oUpdate = 
            {
                Werks: oData.Werks,
                Matnr: oData.Matnr,
                Mtart: this.getView().byId("Mtart").getValue(),
                Maktl: this.getView().byId("Maktl").getValue(),
                Menge: vMenge,
                Meins: this.getView().byId("Meins").getValue(),
                Dmbtr: vDmbtr,
                Waers: this.getView().byId("Waers").getValue()
            };
            
            oModel.update("/MatSet(Werks='"+ oData.Werks +"',Matnr='"+ oData.Matnr +"')", oUpdate,
            {
                method: "MERGE",
                success: function ()
                {
                    oModel.refresh();
                    MessageToast.show("Mat Infor Update Success");

                }.bind(this),
                error: function ()
                {
                    MessageToast.show("Mat Infor Update Fail");
                }
            });
        },

        onCreate: function ()
        {
            let oTable   = this.getView().byId("matList"),
                oModel   = oTable.getModel(),
                oCreate  = {};
            
            var vMenge = this.getView().byId("Menge").getValue().replaceAll(',', ''),
                vDmbtr = this.getView().byId("Dmbtr").getValue().replaceAll(',', '');
                
            if (vMenge == "")
            {
                vMenge = 0;
            };

            if (vDmbtr == "")
            {
                vDmbtr = 0;
            };

            oCreate = 
            {
                Werks: this.getView().byId("Werks").getSelectedKey(),
                Matnr: this.getView().byId("Matnr").getValue(),
                Mtart: this.getView().byId("Mtart").getValue(),
                Maktl: this.getView().byId("Maktl").getValue(),
                Menge: vMenge,
                Meins: this.getView().byId("Meins").getValue(),
                Dmbtr: vDmbtr,
                Waers: this.getView().byId("Waers").getValue()
            };

            oModel.create("/MatSet", oCreate, 
            {
                method: "POST",
                success: function ()
                {
                    oModel.refresh();
                    MessageToast.show("Mat Infor Create Success");
                }.bind(this),
                error: function ()
                {
                    MessageToast.show("Mat Infor Create Fail");
                }
            });
        },

        onDelete: function ()
        {
            let oTable   = this.getView().byId("matList"),
                aIndex   = oTable.getSelectedIndices(),
                oContext = oTable.getContextByIndex(aIndex[0]),
                oData    = oContext.getObject(),
                oModel   = oTable.getModel();
            
            oModel.remove("/MatSet(Werks='"+ oData.Werks +"',Matnr='"+ oData.Matnr +"')", 
                {
                    method: "DELETE",
                    success: function ()
                    {
                        oModel.refresh();
                        MessageToast.show("Mat Infor Delete Success");
                    }.bind(this),
                    error: function ()
                    {
                        MessageToast.show("Mat Infor Delete Fail");
                    }
                });
        }
    });
});