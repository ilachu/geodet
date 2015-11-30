var location = function ( lat , lng ){
	function toRad( degrees ) {
		return degrees * Math.PI / 180;
	}
	this.lat = lat;
	this.lng = lng;
	this.latRad = toRad( lat );
	this.lngRad = toRad( lng );
};

Number.prototype.pow = function ( n ) {
	return Math.pow( this , n );
};
Number.prototype.isPositive = function () {
	return this === 0 || this > 0;
};
//Math functions - better readability
function sin( theta ) {  
	return Math.sin( theta );
}
function sin2( theta ) {
	return sin( theta ).pow( 2 );
}
function cos( theta ) {
	return Math.cos( theta );
}
function cos2( theta ){
	return cos( theta ).pow( 2 );
}

location.prototype.distance = function ( coord ) {
	var 
		lat1 = this.latRad,
		lng1 = this.lngRad,
		lat2 = coord.latRad,
		lng2 = coord.lngRad,
		//CONSTANTS - Ellipsoidal Earth
		f = 1/298.257223563, //inverse flattening
		a = 6378137.0, //semi major axis
		b = 6356752.314245, //semi minor axis
		L = lng2 - lng1,
		U1 = Math.atan( ( 1-f ) * Math.tan( lat1 ) ),
		U2 = Math.atan( ( 1-f ) * Math.tan( lat2 ) ), //reduced latitudes
		lambda = L, //initially
		lambdaP = Math.PI * 2,
		limit = 20; //while loop

		do { 	//iterate until L converges to 1e-12
			sinSigma = Math.sqrt( (cos( U2 ) * sin( lambda ) ).pow( 2 ) + 
				( cos( U1 ) * sin( U2 ) - sin( U1 ) * cos( U2 ) * cos( lambda ) ).pow( 2 ) );
			//co-incident points
			if (!sinSigma) return 0; 
			cosSigma = sin( U1 ) * sin( U2 ) + cos( U1 ) * cos( U2 ) * cos( lambda );
			sigma = Math.atan( sinSigma / cosSigma );
			sinAlpha = ( cos( U1 ) * cos( U2 ) * sin( lambda ) ) / sin ( sigma );
			cos2Alpha = 1 - sinAlpha.pow( 2 );
			cosTwoSigmaBaseM = cosSigma - ( ( 2 * sin( U1 ) * sin( U2 ) ) / cos2Alpha );
			//equator
			if (!cosTwoSigmaBaseM) cosTwoSigmaBaseM = 0; 
			C = ( f / 16 ) * cos2Alpha * ( 4 + f * ( 4 - 3 * cos2Alpha ));
			lambdaP = lambda;
			lambda =  L + ( 1 - C ) * f * sinAlpha * 
				( sigma + C * sinSigma * ( cosTwoSigmaBaseM + C * cosSigma * ( -1 + 2 * cosTwoSigmaBaseM ) ) );
		} while( Math.abs( lambda - lambdaP ) > 1e-12 && limit-->0) ;

		uSq = cos2Alpha * ( ( a.pow( 2 ) - b.pow( 2 ) ) / b.pow( 2 ) );
		A = 1 + ( ( uSq / 16384 ) * ( 4096 + uSq * ( -768 + uSq * ( 320 - 175 * uSq ) ) ) );
		B = uSq / 1024 * ( 256 + uSq * ( -128 + uSq * ( 74 - 47 * uSq ) ) );
		deltaSigma = B * sinSigma * 
			( cosTwoSigmaBaseM + 0.25 * B * ( cosSigma * ( -1 + 2 * cosTwoSigmaBaseM.pow( 2 ) )  - 
			( 1 / 6 ) * B * cosTwoSigmaBaseM * ( -3 + 4 * sinAlpha.pow( 2 ) ) * 
			( -3 + 4 * cosTwoSigmaBaseM ) ) );
		return b * A * ( sigma - deltaSigma );	
};
location.prototype.perimeter = function ( radius ) {
	var
		self = this,
		lat = this.lat,
		lng = this.lng;
	return {
		maxLng : ( function (){
			var maxLng = lng + ( 1 / self.distance ( new location ( lat , lng + 1 ) ) * radius );
			if( maxLng > 180 && maxLng.isPositive() ) {
					return ~( 180 - ( maxLng - 180 ) );
			}
			return maxLng;
		} )(),
		maxLat : ( function () {
			var maxLat = lat + ( 1 / self.distance ( new location ( lat + 1 , lng ) ) * radius );
			if ( maxLat > 90 && maxLat.isPositive() ) {
					return 90;
			}
			return maxLat;
		} )(),
		minLng : ( function () {
			var minLng = lng - ( 1 / self.distance ( new location ( lat , lng - 1 ) ) * radius );
			if ( -180 > minLng && !minLng.isPostive() ) {
					return 180 + ( minLng + 180 );
			}
			return minLng;
		} )(),
		minLat : ( function () {
			var minLat = lat - ( 1 / self.distance ( new location ( lat - 1 , lng ) ) * radius );
			if ( minLat < -90 && !minLat.isPositive() ) {
				return -90;
			}
			return minLat;
		} )()
	};
};
module.exports = location;