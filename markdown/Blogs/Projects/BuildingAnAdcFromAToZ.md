![Title Banner full](markdown/Blogs/Projects/images/BuildingAnAdcFromAToZBanner.png)

# This is a test

## Sub test

![Initial Output half-center](markdown/Blogs/Projects/images/initial_output.PNG)

# Background 
This project was one of those that came out of nowhere, I don’t even remember what sparked it, but one day, I started chatting to my favourite LLM about how ADCs work, and the feasibility of making one myself.

From this discussion I decided to focus on a Successive Approximation Register (SAR) ADC, the basic principle of this is to perform a binary search to approximate the input signal over n comparisons, where n is the number of bits of resolution. 
# Basic function
As the name suggests, a Successive Approximation Register ADC, approximates the input voltage by comparing it with successively closer known voltages using a binary search algorithm.
# Block diagram
The SAR ADC consists of the following main component parts:
**Insert block diagram here**
### Controller
This coordinates the conversion process, in the simplest case, it sets the DAC to a known voltage and reads the comparator output to determine if the input voltage is higher or lower than that known voltage, this process is repeated using a binary search algorithm, until the input voltage level is determined to be between 2 voltage levels.
### R-2R ladder DAC
This
### Comparator
This
### Buffers
These
### Input Anti-aliasing filter
This
### Sample and hold circuit
This
