var mtBenchmark_TinyMul_1;
(function() {
mtBenchmark_TinyMul_1 = main;

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

function mul(a, b) {
	var a1 = a >>> 16, a2 = a & 0xffff;
	return u32(((b * a1) << 16) + b * a2);
}

function next_mt_elem(a, i) {
	return u32(mul(1812433253, (a ^ (a >>> 30))) + i);
}

function genrand(mt0, mt1, mt397) {
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
	mt0 = seed;
	mt1 = next_mt_elem(mt0, 1);
	mt = mt1;
	for (var i = 2; i <= 397; i++) {
		mt = next_mt_elem(mt, i);
	}
	mt397 = mt;
	return genrand(mt0, mt1, mt397);
}
})();
