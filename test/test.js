var assert = require('assert');
var Location = require('../index.js');
describe( 'wgsMod',function () {
	describe( '#coordDistance',function () {
		it( 'calculates distance between given co-ordinates',function () {
			location1 = new Location( 13.0475255 , 80.2090117 );
			location2 = new Location( 13.0575255 , 80.2090117);
			assert.equal( location1.distance( location2 ) , 1106.309335142376 );
		} );
		it( 'calculates distance between given co-ordinates at the equator', function () {
			location1 = new Location( 0 , 79.1604861 );
			location2 = new Location( 0 , 79.1679373 );
			assert.equal( ~~location1.distance( location2 ) , 829 );
		} );
		it( 'returns distance as zero for co-incident points' , function () {
			location1 = new Location( 13.0475255 , 80.2090117 );
			location2 = new Location( 13.0475255 , 80.2090117 );
			assert.equal( ~~location1.distance( location2 ) , 0 );
		} );
	} );
	describe( '#perimeter ',function () { 
		before(function () {
			location = new Location( 12.9753583 , 79.1604861 );
			radius = 500;
			range = location.perimeter( radius );
			maxLng = new Location( location.lat , range.maxLng );
			maxLat = new Location( range.maxLat , location.lng );
			minLng = new Location( location.lat , range.minLng );
			minLat = new Location( range.minLat , location.lng );
		} );
		it( 'max range of longitude',function () {
			assert.equal( ~~location.distance( maxLng ) , radius );
		} );
		it( 'max range of latitude',function () {
			assert.equal( ~~location.distance( maxLat ) , radius-1 );
		} );
		it( 'min range of longitude',function () {
			assert.equal( ~~location.distance( minLng ) , radius );
		} );
		it( 'min range of latitude',function () {
			assert.equal( ~~location.distance( minLat ) , radius );
		} );

	} );
} );