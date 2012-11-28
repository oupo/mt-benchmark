import std.stdio;
import std.perf;
import std.stdint;
alias uint32_t u32;

void main(string[] args) {
	int N = std.conv.to!int(args[1]);
	auto timer = new PerformanceCounter;
	timer.start();
	u32 result = 0;
	for (int i = 0; i < N; i ++) {
		result += get_first_mt_result(i);
	}
	timer.stop();
	writefln("%.2f sec / result = %d", timer.milliseconds / 1000.0, result);
}

u32 next_mt_elem(u32 a, u32 i) {
	return 1812433253 * (a ^ (a >> 30)) + i;
}

u32 genrand(u32 mt0, u32 mt1, u32 mt397) {
	u32 v;
	v = (mt0 & 0x80000000) | (mt1 & 0x7fffffff);
	v = mt397 ^ (v >> 1) ^ ((v & 1) ? 0x9908b0df : 0);
	v ^=  v >> 11;
	v ^= (v <<  7) & 0x9d2c5680;
	v ^= (v << 15) & 0xefc60000;
	v ^=  v >> 18;
	return v;
}

u32 get_first_mt_result(u32 seed) {
	u32 mt, mt0, mt1, mt397;
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
