var assert = require('assert');
var wgsMod = require('../index.js');
describe( 'wgsMod',function () {
	describe( '#coordDistance',function () {
		it( 'calculates distance between given co-ordinates',function () {
			coords = {
				lat1 : 13.0475255,
				lng1 : 80.2090117,
				lat2 : 13.0575255,
				lng2 : 80.2090117
			};
			assert(wgsMod.coordDistance( coords ),1.111389095);
		} );
	} );
} );