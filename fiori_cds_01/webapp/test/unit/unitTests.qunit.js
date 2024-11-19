/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc518cds0001/fiori_cds_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
