import { Hyperliquid } from 'hyperliquid';
import {
  cancelOrderParamsSchema,
  orderParamsSchema,
  transferSpotPerpParamsSchema,
} from './schema.js';

export async function order(sdk: Hyperliquid, args: undefined) {
  const validatedArgs = orderParamsSchema.parse(args);
  const result = await sdk.exchange.placeOrder(validatedArgs as any);
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
    isError: false,
  };
}

export async function cancelOrder(sdk: Hyperliquid, args: unknown) {
  const validatedArgs = cancelOrderParamsSchema.parse(args);
  const result = await sdk.exchange.cancelOrder(validatedArgs);
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
    isError: false,
  };
}

export async function transferSpotPerp(sdk: Hyperliquid, args: unknown) {
  const validatedArgs = transferSpotPerpParamsSchema.parse(args);
  const result = await sdk.exchange.transferBetweenSpotAndPerp(
    validatedArgs.amount,
    validatedArgs.to_perp,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
    isError: false,
  };
}

// Market Close & Transfer - not supported yet, waiting for the SDK bug fix
// export async function spotTransfer(sdk: Hyperliquid, args: unknown) {
//   const validatedArgs = spotTransferParamsSchema.parse(args);
//   const result = await sdk.exchange.spotTransfer(
//     validatedArgs.destination,
//     validatedArgs.token,
//     validatedArgs.amount
//   );
//   return {
//     content: [{ type: 'text', text: JSON.stringify(result) }],
//     isError: false,
//   };
// }

// export async function marketClose(sdk: Hyperliquid, args: unknown) {
//   const validatedArgs = marketCloseParamsSchema.parse(args);
//   const result = await sdk.custom.marketClose(validatedArgs.symbol);
//   return {
//     content: [{ type: 'text', text: JSON.stringify(result) }],
//     isError: false,
//   };
// }

// export async function closeAllPositions(sdk: Hyperliquid, args: unknown) {
//   const validatedArgs = closeAllPositionsParamsSchema.parse(args);
//   const result = await sdk.custom.closeAllPositions(validatedArgs.slippage);
//   return {
//     content: [{ type: 'text', text: JSON.stringify(result) }],
//     isError: false,
//   };
// }
