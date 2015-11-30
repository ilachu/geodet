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
			assert.equal(wgsMod.coordDistance( coords ), 1105.747919147229 );
		} );
		it( 'calculates distance between given co-ordinates at the equator', function () {
			coords = {
				lat1 : 0,
				lng1 : 79.1604861,
				lat2 : 0,
				lng2 : 79.1679373
			};
			assert.equal( ~~wgsMod.coordDistance( coords ) , 829 );
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
		before(function () {
			coord = { 
				lat : 12.9753583,
				lng : 79.1604861
			};
		} );
		it( 'gives the max range of co-ordinates',function () {
			assert.equal( ~~wgsMod.coordDistance( {
				lat1 : coord.lat,
				lng1 : coord.lng,
				lat2 : wgsMod.perimeter( coord , 500 ).maxLat,
				lng2 : coord.lng
			} ) , 499 );
			assert.equal( ~~wgsMod.coordDistance( {
				lat1 : coord.lat,
				lng1 : coord.lng,
				lat2 : coord.lat,
				lng2 : wgsMod.perimeter( coord , 500 ).maxLng
			} ) , 500 );
		} );
		it( 'gives the min range of co-ordinates' , function () { 
			assert.equal( ~~wgsMod.coordDistance( {
				lat1 : wgsMod.perimeter( coord , 500 ).minLat,
				lng1 : coord.lng,
				lat2 : coord.lat,
				lng2 : coord.lng
			} ) , 500 );
			assert.equal( ~~wgsMod.coordDistance( {
				lat1 : coord.lat,
				lng1 : wgsMod.perimeter( coord , 500 ).minLng,
				lat2 : coord.lat,
				lng2 : coord.lng
			} ) , 500 );
		});
	} ); 
} );