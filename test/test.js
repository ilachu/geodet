var assert = require('assert');
var wgsMod = require('../index.js');
describe( 'wgsMod',function () {
	describe( '#coordDistance',function () {
		it( 'calculates distance between given co-ordinates #1',function () {
			coords = {
				lat1 : 13.0475255,
				lng1 : 80.2090117,
				lat2 : 13.0575255,
				lng2 : 80.2090117
			};
			assert.equal(wgsMod.coordDistance( coords ), 1105.747919147229 );
		} );
		it( 'calculates distance between given co-ordinates #2', function () {
			coords = {
				lat1 : 12.9753583,
				lng1 : 79.1604861,
				lat2 : 12.9663408,
				lng2 : 79.1679373
			};
			assert.equal( wgsMod.coordDistance( coords ) , 1283.4144216524535 );
		} );
		it( 'returns distance as zero for co-incident points' , function () {
			coords = {
				lat1 : 13.0475255,
				lng1 : 80.2090117,
				lat2 : 13.0475255,
				lng2 : 80.2090117
			};
			assert.equal(wgsMod.coordDistance( coords ) , 0 );
		} );
	} );
	describe( '#perimeter ',function () { 
		it( 'gives the range of co-ordinates to search for in db',function () {
			coord = { 
				lat : 1,
				lng : 1
			};
			assert( wgsMod.perimeter( coord , 500 ) , true );
		} );
	} ); 
} );