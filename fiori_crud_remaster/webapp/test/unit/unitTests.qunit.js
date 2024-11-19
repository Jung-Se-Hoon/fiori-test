/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc518gw0002/fiori_crud_remaster/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
