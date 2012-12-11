package main
import (
	"os"
	"flag"
	"fmt"
	"strconv"
	"time"
)
type u32 uint32

func main() {
	flag.Parse()
	N, err := strconv.Atoi(flag.Arg(0))
	if err != nil { os.Exit(1) }
	start := time.Now()
	var result u32 = 0
	for i := 0; i < N; i ++ {
		result += get_first_mt_result(u32(i))
	}
	t := float64(time.Now().Sub(start).Nanoseconds()) / 1e9;
	fmt.Printf("%.2f sec / result = %d\n", t, result)
}

func next_mt_elem(a u32, i int) u32 {
	return 1812433253 * (a ^ (a >> 30)) + u32(i)
}

func genrand(mt0 u32, mt1 u32, mt397 u32) u32 {
	var v u32
	v = (mt0 & 0x80000000) | (mt1 & 0x7fffffff)
	if (v & 1) != 0 {
		v = mt397 ^ (v >> 1) ^ 0x9908b0df
	} else {
		v = mt397 ^ (v >> 1)
	}
	v ^=  v >> 11
	v ^= (v <<  7) & 0x9d2c5680
	v ^= (v << 15) & 0xefc60000
	v ^=  v >> 18
	return v
}

func get_first_mt_result(seed u32) u32 {
	var mt, mt0, mt1, mt397 u32
	mt0 = seed
	mt1 = next_mt_elem(mt0, 1)
	mt = mt1
	for i := 2; i <= 397; i++ {
		mt = next_mt_elem(mt, i)
	}
	mt397 = mt
	return genrand(mt0, mt1, mt397)
}
