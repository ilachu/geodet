var wgsMod = {};
Number.prototype.toRad = function() {
	return this*3.14/180;
};
function hav( theta ) { //haversine function
	return Math.pow( Math.sin( theta )/2 , 2 );
}

wgsMod.coordDistance = function ( coords ) {  //haversine formula
	var 
		R = 6371, //radius of Earth
		lat1 = coords.lat1.toRad(),
		lat2 = coords.lat2.toRad(),
		lng1 = coords.lng1.toRad(),
		lng2 = coords.lng2.toRad(),
		deltaLat = lat2 - lat1,
		deltaLng = lng2 - lng1,
		h = hav( deltaLat ) + Math.cos( lat1 )*Math.cos( lat2 )*hav( deltaLng );
	return 2*R*Math.asin( Math.sqrt( h ) );
};

module.exports = wgsMod;