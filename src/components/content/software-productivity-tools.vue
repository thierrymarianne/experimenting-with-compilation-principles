<template>
  <div class='content'>
    <multimedia-content>Programs are arguably the most complicated
engineering artifacts ever produced; they consist of many many details, every one of which must be correct before the program will work completely. As a result, errors are rampant in programs; errors may crash a system, produce wrong results, render a system vulnerable to security attacks, or even lead to catastrophic failures in critical systems. Testing is the primary technique for locating errors in programs.
<br />An interesting and promising complementary approach is to use data-flow analysis to locate errors statically (that is, before the program is run). Data-flow analysis can find errors along all the possible execution paths, and not just those exercised by the input data sets, as in the case of program testing. Many of the data-flow-analysis techniques, originally developed for compiler optimizations, can be used to create tools that assist programmers in their software engineering tasks.
<br />The problem of finding all program errors is undecidable. A data-flow analysis may be designed to warn the programmers of all possible statements with a particular category of errors. But if most of these warnings are false alarms users will not use the tool.  
Thus, practical error detectors are often neither sound nor complete. That is, they may not find all the errors in the program. and not all errors reported are guaranteed to be real errors.
Nonetheless, various static analyses have been developed and shown to be effective in finding errors, such as dereferencing null or freed pointers, in real programs. The fact that error detectors may be unsound makes them significantly different from compiler optimizations. Optimizers must be conservative and cannot alter the semantics of the program under any circumstances.
<br />
In the balance of this section, we shall mention several ways in which program analysis, building upon techniques originally developed to optimize code in compilers, have improved software productivity. Of special importance are techniques that detect statically when a program might have a security vulnerability.
<h3>Type Checking</h3>
Type checking is an effective and well-established technique to catch inconsistencies in programs. It can be used to catch errors, for example, where an operation is applied to the wrong type of object, or if parameters passed to a procedure do not match the signature of the procedure. Program analysis can go beyond finding type errors by analyzing the flow of data through a program. For example, if a pointer is assigned null and then immediately dereferenced. the program is clearly in error.
The same technology can be used to catch a variety of security holes, in which an attacker supplies a string or other data that is used carelessly by the program. A user-supplied string can be labeled with a type "dangerous." If
this string is not checked for proper format, then it remains "dangerous", and if a string of this type is able to influence the control-flow of the     
code at some point in the program, then there is a potential security flaw.
<h3>Bounds Checking<</h3>
It is easier to make mistakes when programming in a lower-level language than a higher-level one. For example, many security breaches in systems are caused by buffer overflows in programs written in C. Because C does not have array bounds checks, it is up to the user to ensure that the arrays are not accessed out of bounds. Failing to check that the data supplied by the user can overflow a buffer, the program may be tricked into storing user data outside of the buffer. An attacker can manipulate the input data that causes the program to misbehave and compromise the security of the system. Techniques have been developed to find buffer overflows in programs, but with limited success.
<br />Had the program been written in a safe language that includes automatic range checking, this problem would not have occurred. The same data-flow analysis  that  is used  to  eliminate  redundant  range  checks  can  also  be used to locate buffer overflows. The major difference, however, is that failing to elimate a range check would only result in a small run-time cost, while failing to identify a potential buffer overflow may compromise the  security of the system. Thus, while it is adequate to use simple techniques to optimize range checks, sophisticated analyses, such as tracking the  values of pointers across procedures, are needed to get high-quality results in error detection tools.
<h3>Memory-Management Tools</h3>
Garbage collection is another excellent example of the tradeoff between efficiency and a combination of ease of programming and software reliability. Automatic memory management obliterates all memory-management errors (e.g., "memory leaks"), which are a major source of problems in C and C++ programs. Various tools have been developed to help programmers find memory management errors. For example, Purify is a widely used tool that dynamically catches memory management errors as they occur. Tools that help identify some of these problems statically have also been developed.</multimedia-content>
  </div>
</template>
  
<script>
import MultimediaContent from '../multimedia-content.vue';

export default {
  name: 'software-productivity-tools',
  components: {
    'multimedia-content': MultimediaContent
  },
}
</script>
