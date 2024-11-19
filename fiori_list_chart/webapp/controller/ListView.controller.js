sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/viz/ui5/data/FlattenedDataset"
],
function (Controller, Filter, FilterOperator, FlattenedDataset ) {
    "use strict";

    return Controller.extend("zc518.gw0003.fiorilistchart.controller.ListView", {
        onInit: function () 
        {

        },

        goSpfli: function(oEvent)
        {   
            let oData    = oEvent.getSource().getBindingContext().getObject(),
                oTable   = this.getView().byId("scheduleList"),
                oBinding = oTable.getBinding("rows"),
                oBindingFli = this.getView().byId("flightList").getBinding(),
                oChart      = this.getView().byId("bookChart"),
                oFilter  = null;

                oFilter = new Filter({
                    path: "Carrid",
                    operator: FilterOperator.EQ,
                    value1 : oData.Carrid
                });

                oBinding.filter(oFilter);
                oBindingFli.filter();
                this.clearChart(oChart);
        },

        goSflight: function(oEvent)
        {
            let oContext = oEvent.getParameter("rowContext"),
                oData    = oContext.getObject(),
                oTable   = this.getView().byId("flightList"),
                oBinding = oTable.getBinding("rows"),
                aFilter  = [],
                oFilter  = null;

            oFilter = new Filter({
                path: "Carrid",
                operator: FilterOperator.EQ,
                value1: oData.Carrid
            });

            aFilter.push(oFilter);

            oFilter = null;
            oFilter = new Filter({
                path: "Connid",
                operator: FilterOperator.EQ,
                value1: oData.Connid
            });

            aFilter.push(oFilter);

            oBinding.filter(aFilter);
        },

        goSbook: function(oEvent)
        {
            let oData   = oEvent.getParameter("rowContext").getObject(),
                oChart  = this.getView().byId("bookChart"),
                oDataSet = null,
                oFilter = null,
                aFilter = [];

            oFilter = new Filter
            (
                {
                    path: "Carrid",
                    operator: FilterOperator.EQ,
                    value1: oData.Carrid
                }
            );

            aFilter.push(oFilter);

            oFilter = null;
            oFilter = new Filter
            (
                {
                    path: "Connid",
                    operator: FilterOperator.EQ,
                    value1: oData.Connid
                }
            );

            aFilter.push(oFilter);

            oDataSet = new FlattenedDataset
            (
                {
                    dimensions:
                    [
                        {
                            name:"Airline",
                            value: "{Carrid}"
                        },
                        {
                            name:"Flight Number",
                            value: "{Connid}"
                        },
                        {
                            name:"Date",
                            value: "{Fldate}"
                        }
                    ],

                    measures:
                    [
                        {
                            name:"Weight",
                            value:"{LuggWeight}"
                        },
                        {
                            name:"Price",
                            value:"{ForCuram}"
                        }
                    ],

                    data:
                    {
                        path:"/BookSet",
                        filters: aFilter
                    }
                }
            );

            oChart.removeAllFeeds();
            oChart.setDataset(oDataSet);
        },

        clearChart: function (pChart)
        {
            let oDataSet = new FlattenedDataset
            (
                {
                    dimensions:
                    [
                        {
                            name:"Airline",
                            value: ""
                        },
                        {
                            name:"Flight Number",
                            value: ""
                        },
                        {
                            name:"Date",
                            value: "0000000"
                        }
                    ],

                    measures:
                    [
                        {
                            name:"Weight",
                            value:"0"
                        },
                        {
                            name:"Price",
                            value:"0"
                        }
                    ],

                    data:
                    {
                        path:"/BookSet",
                        filters: ""
                    }
                }
            );

            pChart.setDataset(oDataSet);
        }
    });
});
