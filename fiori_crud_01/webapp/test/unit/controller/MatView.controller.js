/*global QUnit*/

sap.ui.define([
	"zc518gw0001/fiori_crud_01/controller/MatView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MatView Controller");

	QUnit.test("I should test the MatView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
