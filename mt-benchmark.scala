object MtBenchmark {
	def main(args: Array[String]) {
		var N = Integer.parseInt(args(0));
		var start = System.currentTimeMillis();
		var result = 0;
		for (i <- 0 until N) {
			result += get_first_mt_result(i);
		}
		var time = (System.currentTimeMillis() - start) / 1000.0;
		printf("%.2f sec / result = %d\n", time, if (result >= 0) result else result+0x100000000l);
	}

	def next_mt_elem(a:Int, i:Int) : Int = {
		return 1812433253 * (a ^ (a >>> 30)) + i;
	}

	def genrand(mt0:Int, mt1:Int, mt397:Int) : Int = {
		var v : Int = 0;
		v = (mt0 & 0x80000000) | (mt1 & 0x7fffffff);
		v = mt397 ^ (v >>> 1) ^ (if ((v & 1) != 0) 0x9908b0df else 0);
		v ^=  v >>> 11;
		v ^= (v <<  7) & 0x9d2c5680;
		v ^= (v << 15) & 0xefc60000;
		v ^=  v >>> 18;
		return v;
	}

	def get_first_mt_result(seed:Int) : Int = {
		var mt, mt0, mt1, mt397 : Int = 0;
		mt0 = seed;
		mt1 = next_mt_elem(mt0, 1);
		mt = mt1;
		for (i <- 2 to 397) {
			mt = next_mt_elem(mt, i);
		}
		mt397 = mt;
		return genrand(mt0, mt1, mt397);
	}
}
