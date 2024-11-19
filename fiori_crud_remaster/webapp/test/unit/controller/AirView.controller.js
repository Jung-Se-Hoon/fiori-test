/*global QUnit*/

sap.ui.define([
	"zc518gw0002/fiori_crud_remaster/controller/AirView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AirView Controller");

	QUnit.test("I should test the AirView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
