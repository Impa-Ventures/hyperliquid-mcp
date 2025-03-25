import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as dotenv from 'dotenv';
import { Hyperliquid } from 'hyperliquid';
import { privateKeyToAccount } from 'viem/accounts';
import {
  getAllMids,
  getCandleSnapshot,
  getL2Book,
  getOpenOrders,
  getOrderHistory,
  getOrderStatus,
  getPerpClearinghouseState,
  getSpotClearinghouseState,
  getSpotMeta,
} from './publicClient/actions.js';
import {
  ALL_MIDS_TOOL,
  CANDLE_SNAPSHOT_TOOL,
  L2_BOOK_TOOL,
  OPEN_ORDERS_TOOL,
  ORDER_HISTORY_TOOL,
  ORDER_STATUS_TOOL,
  PERP_CLEARINGHOUSE_STATE_TOOL,
  SPOT_CLEARINGHOUSE_STATE_TOOL,
  SPOT_META_TOOL,
} from './publicClient/tools.js';
import {
  cancelOrder,
  order,
  transferSpotPerp,
} from './walletClient/actions.js';
import {
  CANCEL_ORDER_TOOL,
  ORDER_TOOL,
  TRANSFER_SPOT_PERP_TOOL,
} from './walletClient/tools.js';

async function main() {
  dotenv.config();
  const privateKey = process.env.PRIVATE_KEY;
  console.error('Starting Hyperliquid MCP server...');

  if (!privateKey) {
    console.error('Please set PRIVATE_KEY environment variables');
    process.exit(1);
  }

  const server = new Server(
    {
      name: 'hyperliquid-mcp',
      version: '0.0.1',
    },
    { capabilities: { tools: {} } },
  );

  console.error('Starting Hyperliquid client');

  const sdk = new Hyperliquid({
    enableWs: true,
    privateKey: privateKey,
    testnet: false,
    walletAddress: privateKey,
  });

  const viemAccount = privateKeyToAccount(privateKey as `0x${string}`);
  const walletAddress = viemAccount.address;

  server.setRequestHandler(
    CallToolRequestSchema,
    async (request: CallToolRequest) => {
      console.error('Received CallToolRequest:', request);
      try {
        const { name, arguments: args } = request.params;

        if (!args) {
          throw new Error('No arguments provided');
        }

        console.error('args =', args);

        switch (name) {
          // Public
          case 'get_spot_clearinghouse_state': {
            return await getSpotClearinghouseState(sdk, walletAddress, args);
          }
          case 'get_perp_clearinghouse_state': {
            return await getPerpClearinghouseState(sdk, walletAddress, args);
          }
          case 'get_order_status': {
            return await getOrderStatus(sdk, args);
          }
          case 'get_open_orders': {
            return await getOpenOrders(sdk, walletAddress, args);
          }
          case 'get_order_history': {
            return await getOrderHistory(sdk, walletAddress, args);
          }
          case 'get_l2_book': {
            return await getL2Book(sdk, args);
          }
          case 'get_all_mids': {
            return await getAllMids(sdk);
          }
          case 'get_spot_meta': {
            return await getSpotMeta(sdk);
          }
          case 'get_candle_snapshot': {
            return await getCandleSnapshot(sdk, args);
          }
          // Wallet
          case 'order': {
            return await order(sdk, args as any);
          }
          case 'cancel_order': {
            return await cancelOrder(sdk, args);
          }
          case 'transfer_spot_perp': {
            return await transferSpotPerp(sdk, args);
          }
          default:
            return {
              content: [{ type: 'text', text: `Unknown tool: ${name}` }],
              isError: true,
            };
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error('Received ListToolsRequest');
    return {
      tools: [
        // Public
        SPOT_CLEARINGHOUSE_STATE_TOOL,
        PERP_CLEARINGHOUSE_STATE_TOOL,
        ORDER_STATUS_TOOL,
        OPEN_ORDERS_TOOL,
        ORDER_HISTORY_TOOL,
        ALL_MIDS_TOOL,
        SPOT_META_TOOL,
        CANDLE_SNAPSHOT_TOOL,
        L2_BOOK_TOOL,
        // Wallet
        ORDER_TOOL,
        CANCEL_ORDER_TOOL,
        TRANSFER_SPOT_PERP_TOOL,
      ],
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Hyperliquid MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
