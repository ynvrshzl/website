# GDS
Graph Debugging System (GDS)
[debugger.js](../../src/debugger.js)

## Ethical: Purpose
_Why do we have a debugging system?_ 

In a system as complex as a Canvas Graphics Engine (CGE), debugging provides a safe enviornment sandbox, to test different parts of the system, and ensure sustainability.

The Debugger system is an integral module in the Network Graph component. It provides safe access to the system, without the fear of making irreversible changes or introducing system volatility. **Essentially, a safe sandbox experiment environment for engineers to test and play with the Graph. <mark>That's the driver of this engine</mark>**


## Technical: GDS Overview
The debug process is instanced in [data.js &rarr; class Mode &rarr; debug()](../../src/data.js) in which the debugger is treated as a separate [Mode]() separate from the main ecosystem.


## Systemic: Anatomy
The main modules of this Debugging System 

- class Main - entry point for the debugging system
- Modular Tests - each test is a single operation. Swappable architecture.

## Programming: How to run tests

The variables control which tests are loaded by the Debugger. 