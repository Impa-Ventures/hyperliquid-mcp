# Hyperliquid MCP Server
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


An MCP server implementation that integrates the [Hyperliquid SDK](https://github.com/nomeida/hyperliquid).

## 📋 Prerequisites

- Node.js (v22.0.0 or higher)
- pnpm or yarn package manager
- Basic understanding of cryptocurrency trading concepts

## 🚀 Installation

### Option 1: Install from pnpm (Recommended)

```bash
# Install globally
pnpm install -g hyperliquid-mcp

# Or install locally in your project
pnpm install hyperliquid-mcp
```

### Option 2: Install from Source

1. Clone this repository:

   ```bash
   git clone
   cd hyperliquid-mcp
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the project:

   ```bash
   pnpm run build
   ```

## 🏗️ Configuration

Create a `.env` file with your credentials:

```
# This is your wallet private key
PRIVATE_KEY=your_private_key
```

## 🔌 Usage with Claude Desktop

To add this MCP server to Claude Desktop:

1. Create or edit the Claude Desktop configuration file at:

   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. Add the following configuration:

```json
{
  "mcpServers": {
    "hyperliquid-mcp": {
      "command": "node",
      "args": ["/path/to/hyperliquid-mcp/dist/index.js"],
      "env": {
        "PRIVATE_KEY": "your_private_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

3. Restart Claude Desktop for the changes to take effect.

### 🏃 NPX

```json
{
  "mcpServers": {
    "hyperliquid-mcp": {
      "command": "npx",
      "args": ["-y", "hyperliquid-mcp"]
    },
    "env": {
      "PRIVATE_KEY": "your_private_key_here"
    }
  }
}
```


## 🧩 Supported Tools

#### get_spot_clearinghouse_state

Get the clearinghouse state of a user on Hyperliquid.

```typescript
{
  user?: string;       // User address (optional, defaults to wallet address)
}
```

Example query to Claude:

> "Show me my spot account state."

#### get_perp_clearinghouse_state

Get the perpetual clearinghouse state of a user on Hyperliquid.

```typescript
{
  user?: string;       // User address (optional, defaults to wallet address)
}
```

Example query to Claude:

> "Show me my perps account state."

#### get_order_status

Get the status of a specific order.

```typescript
{
  user: string; // User address
  oid: number | string; // Order ID
}
```

Example query to Claude:

> "check my wallet order: o123456 status"

#### get_open_orders

Get all open orders for a user.

```typescript
{
  user?: string;       // User address (optional, defaults to wallet address)
}
```

Example query to Claude:

> "check all my open orders"

#### get_order_history

Get order history for a user.

```typescript
{
  user?: string;       // User address (optional, defaults to wallet address)
}
```

Example query to Claude:

> "check my account order history"

#### get_all_mids

Get mid prices for all coins on Hyperliquid.

#### get_spot_meta

Request spot trading metadata.

#### get_candle_snapshot

Get historical candlestick data.

```typescript
{
  coin: string;        // Token symbol, e.g. "BTC"
  interval: string;    // Time interval, e.g. "15m", "1h", "4h", "1d"
  startTime: number;   // Start timestamp in milliseconds
  endTime?: number;    // End timestamp in milliseconds (optional)
}
```

#### get_l2_book

Get L2 order book data.

```typescript
{
  coin: string; // Token symbol, e.g. "BTC-PERP", "ETH-PERP", "SOL-PERP", "BTC-SPOT"
}
```

#### place_order

Place a trading order.

```typescript
{
  coin: string;        // Token symbol
  is_buy: boolean;     // true for buy, false for sell
  sz: number;          // Order size
  limit_px: number;    // Limit price
  tif?: "Gtc" | "Ioc" | "Alo";  // Time-in-force (optional)
  reduce_only?: boolean;         // Reduce-only flag (optional)
  vaultAddress?: string;        // Vault address (optional)
  is_limit?: boolean;           // Limit order flag (optional)
  trigger_px?: number;          // Trigger price (optional)
  is_market?: boolean;          // Market order flag (optional)
  tpsl?: "tp" | "sl";          // Take-profit/Stop-loss type (optional)
}
```

Example query to Claude:

> "Create a HYPE limit order for $10 and set the target price to $20"

#### cancel_order

Cancel an existing order.

```typescript
{
  coin: string; // Token symbol
  o: number; // Order ID
}
```

Example query to Claude:

> "Cancel the order we created earlier"

#### transfer_spot_perp

Transfer between spot and perpetual accounts.

```typescript
{
  amount: number; // Transfer amount
  to_perp: boolean; // true for transfer to perpetual, false for transfer to spot
}
```

Example query to Claude:

> "Transfer $10 from spot to perps"

### Response Format

Each tool returns a Promise that resolves with:

- Success: Returns corresponding data object
- Failure: Throws an error with error message

Note: All numerical parameters accept both number and string inputs. The system will automatically handle type conversion as needed.

## 🔐 Security Considerations

- Private Key Protection: Never expose or hardcode your private key. Use environment variables.
- Consider using environment variables or a secure credential manager instead of hardcoding sensitive information.
- Be cautious when transferring funds or deploying contracts, as these operations are irreversible on the blockchain.
- When using the onramp functionality, ensure you're on a secure connection.
- Verify all transaction details before confirming, especially when transferring funds or buying credits.

## 📷 Troubleshooting

If you encounter issues:

1. Verify that your wallet private key is valid
2. Check the Claude Desktop logs for any error messages

## 📖 License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For detailed guidelines on contributing to Hyperliquid MCP, including:

- Reporting bugs
- Suggesting enhancements
- Development setup
- Coding standards
- Adding tools
- Testing requirements
- Documentation standards

Basic contribution steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the existing style and includes appropriate tests.

---

Built with ❤️ by Impa Ventures
