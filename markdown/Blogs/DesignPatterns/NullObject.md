---
title: The Null Object Pattern
category: DesignPatterns
---

# The Null Object Pattern

In embedded software, defensive programming often leads to a lot of `if (ptr != NULL)` checks scattered throughout the codebase. The **Null Object pattern** offers a different approach: instead of propagating `NULL` pointers, you provide a concrete object that implements the same interface but does “nothing”.

## Motivation

Consider a driver interface that may or may not be present on a given hardware configuration. A traditional implementation might look like this:

```c
if (g_logger != NULL)
{
    g_logger->write("System started");
}
```

As the system grows, these checks multiply and distract from the core logic.

## Applying the pattern

With the Null Object pattern, you define an implementation that safely ignores all calls:

```c
static void null_logger_write(const char *msg)
{
    (void)msg; /* intentionally ignore */
}
```

The rest of the system always calls `g_logger->write(...)` without checking for `NULL`. On configurations where logging is disabled, `g_logger` simply points to the null logger implementation.

## Benefits

- **Cleaner control flow**: Fewer `if (x != NULL)` checks.
- **Safer defaults**: Components that forget to configure a real implementation still behave safely.
- **Testability**: The null implementation is a useful test double when you only care that calls can be made, not what they do.

## When not to use it

The Null Object pattern is not a substitute for error handling. If absence of a component is truly an error, you should surface that explicitly rather than quietly doing nothing.

For optional or “best effort” services in embedded systems, however, a Null Object can simplify code and make intent clearer.

