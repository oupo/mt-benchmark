import Sys;

class MtBenchmark {
	static function next_mt_elem(a:Int, i:Int): Int {
		return 1812433253 * (a ^ (a >>> 30)) + i;
	}

	static function genrand(mt0:Int, mt1:Int, mt397:Int): Int {
		var v:Int;
		v = (mt0 & 0x80000000) | (mt1 & 0x7fffffff);
		v = mt397 ^ (v >>> 1) ^ ((v & 1) != 0 ? 0x9908b0df : 0);
		v ^=  v >>> 11;
		v ^= (v <<  7) & 0x9d2c5680;
		v ^= (v << 15) & 0xefc60000;
		v ^=  v >>> 18;
		return v;
	}

	static function get_first_mt_result(seed:Int): Int {
		var mt0 = seed;
		var mt1 = next_mt_elem(mt0, 1);
		var mt = mt1;
		for (i in 2...398) {
			mt = next_mt_elem(mt, i);
		}
		var mt397 = mt;
		return genrand(mt0, mt1, mt397);
	}

	static function main() {
		var N = 1000000;
		if (Sys.args().length == 1) {
			N = Std.parseInt(Sys.args()[0]);
		}
		var result = 0;
		for (i in 0...N) {
			result += get_first_mt_result(i);
		}
		Sys.println(result);
	}
}
