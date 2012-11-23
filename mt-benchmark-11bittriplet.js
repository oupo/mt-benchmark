var mtBenchmark_11bitTriplet;
(function() {
mtBenchmark_11bitTriplet = main;

var MASK_11 = (1<<11)-1;
var MASK_10 = (1<<10)-1;

function main(N) {
	var start = Date.now();
	var result = 0;
	for (var i = 0; i < N; i ++) {
		result = u32(result + get_first_mt_result(i));
	}
	var time = (Date.now() - start) / 1000;
	var out = time + " sec / result = "+result;
	return out;
}

function u32(x) { return x >>> 0; }

function triplet_to_u32(triplet) {
	return u32(triplet[0] | triplet[1] << 11 | triplet[2] << 22);
}

function to_triplet(x) {
	return [x & MASK_11, (x >>> 11) & MASK_11, x >>> 22];
}

function mul(a, b0, b1, b2) {
	var a0 = a[0], a1 = a[1], a2 = a[2];
	var x = a0 * b0;
	a[0] = x & MASK_11;
	var x = a1 * b0 + a0 * b1 + (x >>> 11);
	a[1] = x & MASK_11;
	var x = a2 * b0 + a1 * b1 + a0 * b2 + (x >>> 11);
	a[2] = x & MASK_10;
}

function add(a, b0, b1, b2) {
	var x = a[0] + b0;
	a[0] = x & MASK_11;
	var x = a[1] + b1 + (x > MASK_11);
	a[1] = x & MASK_11;
	var x = a[2] + b2 + (x > MASK_11);
	a[2] = x & MASK_10;
}

function next_mt_elem(a, i) {
	var M = 1812433253;
	a[0] ^= (a[2] >>> (30-22));
	mul(a, M & MASK_11, (M >>> 11) & MASK_11, M >>> 22);
	add(a, i, 0, 0);
	return a;
}

function genrand(mt0, mt1, mt397) {
	mt0 = triplet_to_u32(mt0);
	mt1 = triplet_to_u32(mt1);
	mt397 = triplet_to_u32(mt397);
	var v;
	v = (mt0 & 0x80000000) | (mt1 & 0x7fffffff);
	v = mt397 ^ (v >>> 1) ^ ((v & 1) ? 0x9908b0df : 0);
	v ^=  v >>> 11;
	v ^= (v <<  7) & 0x9d2c5680;
	v ^= (v << 15) & 0xefc60000;
	v ^=  v >>> 18;
	return u32(v);
}

function get_first_mt_result(seed) {
	var mt, mt0, mt1, mt397;
	mt0 = to_triplet(seed);
	mt1 = next_mt_elem(mt0.slice(), 1);
	mt = mt1.slice();
	for (var i = 2; i <= 397; i++) {
		next_mt_elem(mt, i);
	}
	mt397 = mt;
	return genrand(mt0, mt1, mt397);
}
})();
