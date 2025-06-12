import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError, type z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function validateWithZod<T>(schema: z.ZodType<T>, value: unknown): { isValid: boolean; errorMessage?: string } {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        isValid: false,
        errorMessage: e.errors[0]?.message ?? "Validation failed",
      };
    }
    return {
      isValid: false,
      errorMessage: "Unknown validation error",
    };
  }
}
