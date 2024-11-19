/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc518gw0001/fiori_crud_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
