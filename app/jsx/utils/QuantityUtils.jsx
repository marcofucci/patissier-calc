var MAPPING = {
	all: []
};

function addConversion(_type, conversion, alias) {
	conversion.map(function(c) {
		var from = c[0],
				val = c[1],
				to = c[2];

		[from, to].map(function(fromto) {
			if (typeof MAPPING[fromto] == 'undefined') {
				MAPPING[fromto] = {
					_type: _type
				};

				if (typeof alias != 'undefined') {
					MAPPING[fromto]['_alias'] = alias[fromto];
				}
			}
		});

		MAPPING[from][from] = 1;
		MAPPING[from][to] = val;
		MAPPING[to][to] = 1;
		MAPPING[to][from] = 1 / val;

		[from, to].map(function(fromto) {
			if (MAPPING.all.indexOf(fromto) == -1) {
				MAPPING.all.push(fromto);
			}
		});
	});
}

addConversion('kg', [
	['kg', 1000, 'gr']
], {
	'kg': 'l',
	'gr': 'ml'
});
addConversion('litre', [
  ['l', 100, 'cl'],
  ['l', 1000, 'ml'],
  ['cl', 10, 'ml']
]);
addConversion('unit', [
	['unit', 1, 'unit']
]);


var QuantityUtils = {
	convert: function(mFrom, mTo) {
		var mFromData = MAPPING[mFrom],
				mToData = MAPPING[mTo];

		if (typeof mFromData == 'undefined' || typeof mToData == 'undefined') {
			return NaN;
		}

		if (mFromData._type != mToData._type) {
			if (typeof mFromData._alias != 'undefined') {
				return this.convert(mFromData._alias, mTo);
			}

			if (typeof mToData._alias != 'undefined') {
				return this.convert(mFrom, mToData._alias);
			}

			return NaN;
		}


		return mFromData[mTo];
	},

	getAllTypes: function() {
		return MAPPING.all;
	}
}

module.exports = QuantityUtils;
