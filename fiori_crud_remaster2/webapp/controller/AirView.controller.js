sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("zc518.gw0003.fioricrudremaster2.controller.AirView", {
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

        },

        // Form에 있는 내용 삭제
        onClear: function()
        {

                this.getView().byId("Carrid").setValue("");
                this.getView().byId("Connid").setValue("");
                this.getView().byId("Fldate").setValue("");
                this.getView().byId("Price").setValue(0);
                this.getView().byId("Currency").setValue("");
                this.getView().byId("Weight").setValue(0);
                this.getView().byId("Unit").setValue("");
                this.getView().byId("DepTime").setValue("");

        },

        // 선택한 행의 정보를 불러오는 것
        onDisplay: function()
        {
            let oTable   = this.getView().byId("airList"),
                oBinding = oTable.getBinding("rows"),
                aIndex   = oTable.getSelectedIndices(),             // 선택한 행 정보 조회
                oContext = oTable.getContextByIndex(aIndex[0]),     // 어차피 한 행밖에 없어서 0번째
                oData    = oContext.getObject();                    // 해당 행의 레코드 정보 조회

                // console.log(oData);

                this.getView().byId("Carrid").setValue(oData.Carrid);
                this.getView().byId("Connid").setValue(oData.Connid);
                this.getView().byId("Fldate").setValue(oData.Fldate);
                this.getView().byId("Price").setValue(oData.Price);
                this.getView().byId("Currency").setValue(oData.Currency);
                this.getView().byId("Weight").setValue(oData.Weight);
                this.getView().byId("Unit").setValue(oData.Unit);
                this.getView().byId("DepTime").setValue(oData.DepTime);

        },

        // Entitiy에 있는 정보를 읽어오는 것 (Display와 다르다)
        onRead: function()
        {

            let oTable   = this.getView().byId("airList"),
                oModel   = oTable.getModel(),                    // getEntitySet 메소드 호출해주는 객체
                aIndex   = oTable.getSelectedIndices(),          // 선택한 행 정보 조회          
                oContext = oTable.getContextByIndex(aIndex[0]),  // 어차피 한 행밖에 없어서 0번째  
                oData    = oContext.getObject();                 // 해당 행의 레코드 정보 조회

            oModel.read
            (
                "/AirlineSet(Carrid='"+oData.Carrid+"',Connid='"+oData.Connid+"',Fldate='"+oData.Fldate.replaceAll('-','')+"')",
                {
                    success: function(oReturn)
                    {
                        this.getView().byId("Carrid").setValue(oReturn.Carrid);
                        this.getView().byId("Connid").setValue(oReturn.Connid);
                        this.getView().byId("Fldate").setValue(oReturn.Fldate);
                        this.getView().byId("Price").setValue(oReturn.Price);
                        this.getView().byId("Currency").setValue(oReturn.Currency);
                        this.getView().byId("Weight").setValue(oReturn.Weight);
                        this.getView().byId("Unit").setValue(oReturn.Unit);
                        this.getView().byId("DepTime").setValue(oReturn.DepTime);

                        MessageToast.show("Information Read Success");
                    }.bind(this),

                    error: function()
                    {
                        MessageToast.show("Information Read Error");
                    }
                }
                
            )
            
        },

        onCreate: function()
        {
            let oModel    = this.getView().byId("airList").getModel(),   // 한 번에 모델까지 가져올 수 있음 (위에선 2줄로 선언)
                oCreate   = {};

            var vCarrid   = this.getView().byId("Carrid").getValue(),
                vConnid   = this.getView().byId("Connid").getValue(),
                vFldate   = this.getView().byId("Fldate").getValue().replaceAll('-',''),
                vPrice    = this.getView().byId("Price").getValue(),
                vCurrency = this.getView().byId("Currency").getValue(),
                vWeight   = this.getView().byId("Weight").getValue(),
                vUnit     = this.getView().byId("Unit").getValue(),
                vDepTime  = this.getView().byId("DepTime").getValue().replaceAll(':','');

            if (vPrice == "")           // Price가 비어있으면 int형 0 삽입
            {
                vPrice = parseInt(0);
            };

            if (vWeight == "")          // Weight가 비어있으면 int형 0 삽입
            {
                vWeight = parseInt(0);
            };

            vFldate  = vFldate.substr(0,4) + "-" + vFldate.substr(4,2) + "-" + vFldate.substr(6,2);     // 달력 형식으로 맞추기
            vDepTime = vDepTime.substr(0,2) + ":" + vDepTime.substr(2,2) + ":" + vDepTime.substr(4,2);  // 시간 형식으로 맞추기

            // oData Create는 이런 형태이다 --> create(sPath, oData, mParameters?) : object
            oCreate = 
            {
                Carrid:   vCarrid,
                Connid:   vConnid,
                Fldate:   vFldate,
                Price:    vPrice,
                Currency: vCurrency,
                Weight:   vWeight,
                Unit :    vUnit,
                DepTime : vDepTime
            };

            oModel.create
            (
                "/AirlineSet",
                oCreate,
                {
                    success: function()
                    {
                        oModel.refresh();
                        MessageToast.show("Airline Information Created")
                    }.bind(this),
                    error: function()
                    {
                        MessageToast.show("Airline Information Fail")
                    }
                }
            );

        },

        onUpdate: function()
        {

            let oTable   = this.getView().byId("airList"),
                oModel   = oTable.getModel(),                    // getEntitySet 메소드 호출해주는 객체
                aIndex   = oTable.getSelectedIndices(),          // 선택한 행 정보 조회          
                oContext = oTable.getContextByIndex(aIndex[0]),  // 어차피 한 행밖에 없어서 0번째  
                oData    = oContext.getObject(),                 // 해당 행의 레코드 정보 조회
                oUpdate  = {};

            var vCarrid   = oData.Carrid,
                vConnid   = oData.Connid,
                vFldate   = oData.Fldate.replaceAll('-',''),
                vPrice    = this.getView().byId("Price").getValue(),
                vCurrency = this.getView().byId("Currency").getValue(),
                vWeight   = this.getView().byId("Weight").getValue(),
                vUnit     = this.getView().byId("Unit").getValue(),
                vDepTime  = this.getView().byId("DepTime").getValue().replaceAll(':','');

            if (vPrice == "")           // Price가 비어있으면 int형 0 삽입
            {
                vPrice = parseInt(0);
            };

            if (vWeight == "")          // Weight가 비어있으면 int형 0 삽입
            {
                vWeight = parseInt(0);
            };

            vFldate  = vFldate.substr(0,4) + "-" + vFldate.substr(4,2) + "-" + vFldate.substr(6,2);     // 달력 형식으로 맞추기
            vDepTime = vDepTime.substr(0,2) + ":" + vDepTime.substr(2,2) + ":" + vDepTime.substr(4,2);  // 시간 형식으로 맞추기

            oUpdate = 
            {
                Carrid:   vCarrid,
                Connid:   vConnid,
                Fldate:   vFldate,
                Price:    vPrice,
                Currency: vCurrency,
                Weight:   vWeight,
                Unit :    vUnit,
                DepTime : vDepTime
            };

            oModel.update
            (
                "/AirlineSet(Carrid='"+vCarrid+"',Connid='"+vConnid+"',Fldate='"+vFldate.replaceAll('-','')+"')",
                oUpdate,
                {
                    success: function()
                    {
                        oModel.refresh();
                        MessageToast.show("Information Update Success")

                    }.bind(this),

                    error: function()
                    {
                        MessageToast.show("Information Update Fail");
                    }
                }
                
            )
    
        },

        onDelete: function()
        {

            let oTable   = this.getView().byId("airList"),
                oModel   = oTable.getModel(),                    // getEntitySet 메소드 호출해주는 객체
                aIndex   = oTable.getSelectedIndices(),          // 선택한 행 정보 조회          
                oContext = oTable.getContextByIndex(aIndex[0]),  // 어차피 한 행밖에 없어서 0번째  
                oData    = oContext.getObject();                 // 해당 행의 레코드 정보 조회

            oModel.remove
            (
                "/AirlineSet(Carrid='"+oData.Carrid+"',Connid='"+oData.Connid+"',Fldate='"+oData.Fldate.replaceAll('-','')+"')", 
                {
                    success: function()
                    {   
                        oModel.refresh();
                        MessageToast.show("Information Delete Success");
                    }.bind(this),

                    error: function()
                    {
                        MessageToast.show("Information Delete Error");
                    }
                }
                
            )  
        },
    });
});
