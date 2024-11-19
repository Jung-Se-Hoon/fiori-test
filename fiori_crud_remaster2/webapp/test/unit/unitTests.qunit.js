/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc518gw0003/fiori_crud_remaster2/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
