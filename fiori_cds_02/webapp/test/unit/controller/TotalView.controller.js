/*global QUnit*/

sap.ui.define([
	"zc518cds0002/fiori_cds_02/controller/TotalView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("TotalView Controller");

	QUnit.test("I should test the TotalView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
