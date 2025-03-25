import { Hyperliquid } from 'hyperliquid';
import {
  candleSnapshotSchema,
  commonAccountSchema,
  l2BookSchema,
  orderStatusSchema,
} from './schemas.js';

// Account
export async function getSpotClearinghouseState(
  sdk: Hyperliquid,
  user: `0x${string}`,
  args: unknown,
) {
  const validatedArgs = commonAccountSchema.parse(args);
  const clearinghouseState = await sdk.info.spot.getSpotClearinghouseState(
    (validatedArgs?.user as `0x${string}`) ?? user,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(clearinghouseState) }],
    isError: false,
  };
}

export async function getPerpClearinghouseState(
  sdk: Hyperliquid,
  user: `0x${string}`,
  args: unknown,
) {
  const validatedArgs = commonAccountSchema.parse(args);
  const clearinghouseState = await sdk.info.perpetuals.getClearinghouseState(
    (validatedArgs?.user as `0x${string}`) ?? user,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(clearinghouseState) }],
    isError: false,
  };
}

// Order
export async function getOrderStatus(sdk: Hyperliquid, args: unknown) {
  const validatedArgs = orderStatusSchema.parse(args);
  const orderStatus = await sdk.info.getOrderStatus(
    validatedArgs.user as `0x${string}`,
    validatedArgs.oid as number,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(orderStatus) }],
    isError: false,
  };
}

export async function getOpenOrders(
  sdk: Hyperliquid,
  user: `0x${string}`,
  args: unknown,
) {
  const validatedArgs = commonAccountSchema.parse(args);
  const openOrders = await sdk.info.getUserOpenOrders(
    (validatedArgs?.user as `0x${string}`) ?? user,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(openOrders) }],
    isError: false,
  };
}

export async function getOrderHistory(
  sdk: Hyperliquid,
  user: `0x${string}`,
  args: unknown,
) {
  const validatedArgs = commonAccountSchema.parse(args);
  const orderHistory = await sdk.info.getHistoricalOrders(
    (validatedArgs?.user as `0x${string}`) ?? user,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(orderHistory) }],
    isError: false,
  };
}

// Market
export async function getL2Book(sdk: Hyperliquid, args: unknown) {
  const validatedArgs = l2BookSchema.parse(args);
  const l2Book = await sdk.info.getL2Book(validatedArgs.coin);
  return {
    content: [{ type: 'text', text: JSON.stringify(l2Book) }],
    isError: false,
  };
}

export async function getAllMids(sdk: Hyperliquid) {
  const allMids = await sdk.info.getAllMids();
  return {
    content: [{ type: 'text', text: JSON.stringify(allMids) }],
    isError: false,
  };
}

export async function getSpotMeta(sdk: Hyperliquid) {
  const spotMeta = await sdk.info.spot.getSpotMeta();
  return {
    content: [{ type: 'text', text: JSON.stringify(spotMeta) }],
    isError: false,
  };
}

export async function getCandleSnapshot(sdk: Hyperliquid, args: unknown) {
  const validatedArgs = candleSnapshotSchema.parse(args);
  const candleSnapshot = await sdk.info.getCandleSnapshot(
    validatedArgs.coin,
    validatedArgs.interval,
    validatedArgs.startTime,
    validatedArgs.endTime ?? 0,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(candleSnapshot) }],
    isError: false,
  };
}
