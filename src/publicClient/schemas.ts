import { z } from 'zod';

// Account
export const commonAccountSchema = z
  .object({
    user: z
      .string()
      .regex(/^0x[A-Fa-f0-9]+$/, 'Must be a valid hex address')
      .optional(),
  })
  .strict()
  .transform((data) => ({
    user: data.user,
  }));

// Order
export const orderStatusSchema = z
  .object({
    user: z
      .string()
      .regex(/^0x[A-Fa-f0-9]+$/, 'Must be a valid hex address')
      .optional(),
    oid: z
      .number()
      .or(z.string().regex(/^0x[A-Fa-f0-9]+$/, 'Must be a valid hex address')),
  })
  .strict()
  .transform((data) => ({
    user: data.user,
    oid: data.oid,
  }));

// Market
export const candleSnapshotSchema = z
  .object({
    symbol: z.string({ required_error: 'Symbol must be a string' }),
    interval: z.any(),
    startTime: z.number({ required_error: 'Start time must be a number' }),
    endTime: z.number().nullable().optional(),
  })
  .strict()
  .transform((data) => ({
    coin: data.symbol.toUpperCase(),
    interval: data.interval,
    startTime: data.startTime,
    endTime: data.endTime,
  }));

export const l2BookSchema = z
  .object({
    coin: z.string(),
  })
  .strict()
  .transform((data) => ({
    coin: data.coin.toUpperCase(),
  }));
