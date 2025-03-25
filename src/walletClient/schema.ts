import { z } from 'zod';

const TifSchema = z.enum(['Gtc', 'Ioc', 'Alo']);

export const orderParamsSchema = z
  .object({
    coin: z.string(),
    is_buy: z.boolean().or(z.string()),
    sz: z.number().or(z.string()),
    limit_px: z.number().or(z.string()),
    tif: TifSchema.optional(),
    reduce_only: z.boolean().optional(),
    vaultAddress: z.string().optional(),
    is_limit: z.boolean().or(z.string()).optional(),
    trigger_px: z.number().or(z.string()).optional(),
    is_market: z.boolean().or(z.string()).optional(),
    tpsl: z.enum(['tp', 'sl']).optional(),
  })
  .strict()
  .transform((data) => ({
    coin: data.coin.toUpperCase(),
    is_buy: String(data.is_buy).toLowerCase() === 'true' ? true : false,
    sz: data.sz,
    limit_px: data.limit_px,
    order_type:
      String(data.is_limit ?? true).toLowerCase() === 'true'
        ? {
            limit: {
              tif: data.tif ?? 'Gtc',
            },
          }
        : {
            trigger: {
              trigger_px: data.trigger_px,
              is_market:
                String(data.is_market).toLowerCase() === 'true' ? true : false,
              tpsl: data.tpsl,
            },
          },
    reduce_only: data.reduce_only ?? false,
    vault_address: data.vaultAddress ?? '',
  }));

export const cancelOrderParamsSchema = z
  .object({
    coin: z.string(),
    o: z.number().or(z.string()),
  })
  .strict()
  .transform((data) => ({
    coin: data.coin.toUpperCase(),
    o: Number(data.o),
  }));

export const transferSpotPerpParamsSchema = z
  .object({
    amount: z.number().or(z.string()),
    to_perp: z.boolean().or(z.string()),
  })
  .strict()
  .transform((data) => ({
    amount: Number(data.amount),
    to_perp: String(data.to_perp).toLowerCase() === 'true' ? true : false,
  }));

export const marketCloseParamsSchema = z
  .object({
    symbol: z.string(),
  })
  .strict()
  .transform((data) => ({
    symbol: data.symbol.toUpperCase(),
  }));

export const closeAllPositionsParamsSchema = z
  .object({
    slippage: z.number().or(z.string()).optional(),
  })
  .strict()
  .transform((data) => ({
    slippage: Number(data.slippage ?? '0.05'),
  }));

export const spotTransferParamsSchema = z
  .object({
    destination: z.string(),
    amount: z.number().or(z.string()),
    token: z.string(),
  })
  .strict()
  .transform((data) => ({
    destination: data.destination,
    amount: String(data.amount),
    token: data.token,
  }));
