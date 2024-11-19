/*global QUnit*/

sap.ui.define([
	"zc518gw0003/fiori_crud_remaster2/controller/AirView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AirView Controller");

	QUnit.test("I should test the AirView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
