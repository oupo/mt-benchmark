var mtBenchmark3;
(function() {
mtBenchmark3 = main;

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

function u16pair_to_u32(pair) {
	return u32(pair[0] | pair[1] << 16);
}

function u16pair(x) {
	return [x & 0xffff, x >>> 16];
}

function mul(a, b0, b1) {
	var low = a[0] * b0;
	var high = a[1] * b0 + a[0] * b1;
	var carryup = low >>> 16;
	a[0] = low & 0xffff;
	a[1] = (high + carryup) & 0xffff;
	return a;
}

function add(a, b0, b1) {
	var low = a[0] + b0;
	var high = a[1] + b1;
	var carryup = (low >= 0x10000) ? 1 : 0;
	a[0] = low & 0xffff;
	a[1] = (high + carryup) & 0xffff;
}

function next_mt_elem(a, i) {
	var M = 1812433253;
	a[0] ^= (a[1] >>> 14);

	// mul
	var b0 = M & 0xffff, b1 = M >>> 16;
	var low = a[0] * b0;
	var high = a[1] * b0 + a[0] * b1;
	var carryup = low >>> 16;
	a[0] = low & 0xffff;
	a[1] = (high + carryup) & 0xffff;

	// add
	var b0 = i, b1 = 0;
	var low = a[0] + b0;
	var high = a[1] + b1;
	var carryup = (low >= 0x10000) ? 1 : 0;
	a[0] = low & 0xffff;
	a[1] = (high + carryup) & 0xffff;
	return a;
}

function genrand(mt0, mt1, mt397) {
	mt0 = u16pair_to_u32(mt0);
	mt1 = u16pair_to_u32(mt1);
	mt397 = u16pair_to_u32(mt397);
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
	mt0 = u16pair(seed);
	mt1 = next_mt_elem(mt0.slice(), 1);
	mt = mt1.slice();
	for (var i = 2; i <= 397; i++) {
		next_mt_elem(mt, i);
	}
	mt397 = mt;
	return genrand(mt0, mt1, mt397);
}
})();
