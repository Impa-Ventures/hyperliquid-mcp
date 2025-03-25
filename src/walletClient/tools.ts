import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

export const ORDER_TOOL: Tool = {
  name: 'order',
  description: 'Place an order on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      coin: z.string(),
      is_buy: z.boolean().or(z.string()),
      sz: z.number().or(z.string()),
      limit_px: z.number().or(z.string()),
      tif: z.enum(['Gtc', 'Ioc', 'Alo']).optional(),
      reduce_only: z.boolean().optional(),
      vaultAddress: z.string().optional(),
      is_limit: z.boolean().or(z.string()).optional(),
      trigger_px: z.number().or(z.string()).optional(),
      is_market: z.boolean().or(z.string()).optional(),
      tpsl: z.enum(['tp', 'sl']).optional(),
    },
    required: ['coin', 'is_buy', 'sz', 'limit_px'],
  },
};

export const CANCEL_ORDER_TOOL: Tool = {
  name: 'cancel_order',
  description: 'Cancel an order on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      coin: z.string(),
      o: z.number().or(z.string()),
    },
    required: ['coin', 'o'],
  },
};

export const TRANSFER_SPOT_PERP_TOOL: Tool = {
  name: 'transfer_spot_perp',
  description:
    'Transfer spot to perp, or perp to spot, based on the toPerp value',
  inputSchema: {
    type: 'object',
    properties: {
      amount: z.number().or(z.string()),
      to_perp: z.boolean().or(z.string()),
    },
    required: ['amount', 'toPerp'],
  },
};

export const MARKET_CLOSE_TOOL: Tool = {
  name: 'market_close',
  description: 'Close a position on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      symbol: z.string(),
    },
    required: ['symbol'],
  },
};

export const CLOSE_ALL_POSITIONS_TOOL: Tool = {
  name: 'close_all_positions',
  description: 'Close all positions on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      slippage: z.number().or(z.string()).optional(),
    },
    required: [],
  },
};

export const SPOT_TRANSFER_TOOL: Tool = {
  name: 'spot_transfer',
  description:
    "Transfer SPOT assets i.e PURR to another wallet (doesn't touch bridge, so no fees)",
  inputSchema: {
    type: 'object',
    properties: {
      destination: z.string(),
      amount: z.number().or(z.string()),
      token: z.string(),
    },
    required: ['destination', 'amount', 'token'],
  },
};
