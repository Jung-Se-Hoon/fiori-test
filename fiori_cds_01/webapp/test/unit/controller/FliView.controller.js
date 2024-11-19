/*global QUnit*/

sap.ui.define([
	"zc518cds0001/fiori_cds_01/controller/FliView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FliView Controller");

	QUnit.test("I should test the FliView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
