#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <glib.h>
typedef uint32_t u32;

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

int main(int argc, char **argv) {
	if (argc != 2) return 1;
	int N = atoi(argv[1]);
	gint64 start = g_get_real_time();
	u32 result = 0;
	for (int i = 0; i < N; i ++) {
		result += get_first_mt_result(i);
	}
	double time = (g_get_real_time() - start) / 1e6;
	printf("%.2f sec / result = %u\n", time, result);
	return 0;
}
