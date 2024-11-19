/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc518cds0002/fiori_cds_02/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
