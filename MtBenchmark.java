public class MtBenchmark {
	public static void main(String[] args) {
		int N = Integer.parseInt(args[0]);
		long start = System.currentTimeMillis();
		int result = 0;
		for (int i = 0; i < N; i ++) {
			result += get_first_mt_result(i);
		}
		double time = (System.currentTimeMillis() - start) / 1000.0;
		System.out.printf("%.2f sec / result = %d\n", time, result >= 0 ? (long)result : result+0x100000000l);
	}

	static int next_mt_elem(int a, int i) {
		return 1812433253 * (a ^ (a >>> 30)) + i;
	}

	static int genrand(int mt0, int mt1, int mt397) {
		int v;
		v = (mt0 & 0x80000000) | (mt1 & 0x7fffffff);
		v = mt397 ^ (v >>> 1) ^ (((v & 1) != 0) ? 0x9908b0df : 0);
		v ^=  v >>> 11;
		v ^= (v <<  7) & 0x9d2c5680;
		v ^= (v << 15) & 0xefc60000;
		v ^=  v >>> 18;
		return v;
	}

	static int get_first_mt_result(int seed) {
		int mt, mt0, mt1, mt397;
		int i;
		mt0 = seed;
		mt1 = next_mt_elem(mt0, 1);
		mt = mt1;
		for (i = 2; i <= 397; i++) {
			mt = next_mt_elem(mt, i);
		}
		mt397 = mt;
		return genrand(mt0, mt1, mt397);
	}
}
