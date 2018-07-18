<template>
  <div class='content'>
    <multimedia-content>The rapid evolution of computer architectures has
also led to an insatiable demand for new compiler technology. Almost all high-performance systems take advantage of the same two basic techniques: parallelism and memory hierarchies. Parallelism can be found at several levels: at the instruction level, where multiple operations are executed simultaneously and at the processor level, where different threads of the same application are run on different processors. Memory hierarchies are a response to the basic limitation that we can build very fast storage or very large storage, but not storage that is both fast and large.
      <h3>Parallelism</h3>
All modern microprocessors exploit instruction-level parallelism. However, this parallelism can be hidden fron the programmer. Programs are written as if all instructions were executed in sequence; the hardware dynamically checks for dependencies in the sequential instruction stream and issues them in parallel when possible. In some cases, the machine includes a hardware scheduler that can change the instruction ordering to increase the parallelism in the program. Whether the hardware reorders the instructions or not, compilers can rearrange the instructions to make instruction-level parallelism more effective.
<br />
Instruction-level parallelism can also appear explicitly in the instruction set. VLIW (Very Long Instruction Word) machines have instructions that can issue multiple operations in parallel. The Intel IA64 is a well-known example of such an architecture. All high-performance, general-purpose microprocessors also include instructions that can operate on a vector of data at the same time. Compiler techniques have been developed to generate code automatically for such machines from sequential programs.
      <h3>Memory hierarchies</h3>
A memory hierarchy consists of several levels of storage with different speeds
and sizes, with the level closest to the processor being the fastest
but smallest. The average memory-access time of a program is reduced if
most of its accesses are satisfied by the faster levels of the hierarchy.
Both parallelism and the existence of a memory hierarchy improve the potential
performance of a machine, but they must be harnessed effectively by the compiler to deliver real performance on an application.
<br />
Memory hierarchies are found in all machines.
A processor usually has a small number of registers consisting of hundreds of bytes, several levels of caches containing kilobytes to megabytes, physical memory containing megabytes to gigabytes,
and finally secondary storage that contains gigabytes and beyond. Correspondingly, the speed of accesses between adjacent levels of the hierarchy can differ by two or three orders of magnitude. The performance of a system is often limited not by the speed of the processor but by the performance of the memory subsystem. While compilers traditionally focus on optimizing the processor execution, more emphasis is now placed on making the memory hierarchy more effective.

Using registers effectively is probably the single most important problem in optimizing a program. Unlike registers that have to be managed explicitly in software, caches and physical memories are hidden from the instruction set and are managed by hardware. It has been found that cache-management policies implemented by hardware are not effective in some cases, especially in scientific code that has large data structure  (arrays, typically). It is possible to improve the effeciveness of the memory hierarchy by changing the layout of the data, or changing the order of instruct1ons accessing the data. We can also change the layout  of code to improve the effectiveness of instruction caches.</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../multimedia-content.vue';

export default {
  name: 'optimizations-for-computer-architecture',
  components: {
    'multimedia-content': MultimediaContent
  },
}
</script>
