import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Account
export const SPOT_CLEARINGHOUSE_STATE_TOOL: Tool = {
  name: 'get_spot_clearinghouse_state',
  description:
    'Get the clearinghouse state of a user on Hyperliquid, if no user is provided, the clearinghouse state of the wallet address will be returned',
  inputSchema: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: 'Get the clearinghouse state of a user on Hyperliquid',
      },
    },
    required: [],
  },
};

export const PERP_CLEARINGHOUSE_STATE_TOOL: Tool = {
  name: 'get_perp_clearinghouse_state',
  description:
    'Get the clearinghouse state of a user on Hyperliquid, if no user is provided, the clearinghouse state of the wallet address will be returned',
  inputSchema: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: 'Get the clearinghouse state of a user on Hyperliquid',
      },
    },
    required: [],
  },
};
// Order
export const ORDER_STATUS_TOOL: Tool = {
  name: 'get_order_status',
  description: 'Get the status of an order on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: 'Get the status of an order on Hyperliquid',
      },
      oid: {
        type: ['number', 'string'],
        description: 'The order id of the order to get the status of',
      },
    },
    required: ['user', 'oid'],
  },
};

export const OPEN_ORDERS_TOOL: Tool = {
  name: 'get_open_orders',
  description:
    'Get all open orders on Hyperliquid, if no user is provided, the open orders of the wallet address will be returned',
  inputSchema: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: 'Get user all open orders on Hyperliquid',
      },
    },
    required: [],
  },
};

export const ORDER_HISTORY_TOOL: Tool = {
  name: 'get_order_history',
  description:
    'Get all order history on Hyperliquid, if no user is provided, the order history of the wallet address will be returned',
  inputSchema: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: 'Get user all order history on Hyperliquid',
      },
    },
    required: [],
  },
};

// Market
export const ALL_MIDS_TOOL: Tool = {
  name: 'get_all_mids',
  description: 'Get mid prices for all coins on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
};

export const SPOT_META_TOOL: Tool = {
  name: 'get_spot_meta',
  description: 'Request spot trading metadata',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
};

export const CANDLE_SNAPSHOT_TOOL: Tool = {
  name: 'get_candle_snapshot',
  description: 'Get candlestick data for a token on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      coin: {
        type: 'string',
        description: 'The symbol of the token to get candlestick data for',
      },
      interval: {
        type: 'string',
        description: "Time interval (e.g., '15m', '1h')",
      },
      startTime: {
        type: 'number',
        description: 'Start time in milliseconds since epoch',
      },
      endTime: {
        type: 'number',
        description: 'End time in milliseconds since epoch (optional)',
      },
    },
    required: ['coin', 'interval', 'startTime'],
  },
};

export const L2_BOOK_TOOL: Tool = {
  name: 'get_l2_book',
  description: 'Get the L2 book of a token on Hyperliquid',
  inputSchema: {
    type: 'object',
    properties: {
      coin: {
        type: 'string',
        description:
          'The symbol of the token to get the price of, such as "BTC-PERP", "ETH-PERP", "SOL-PERP", "BTC-SPOT"',
      },
      required: ['coin'],
    },
  },
};
