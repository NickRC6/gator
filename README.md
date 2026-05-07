# Gator — Terminal RSS Feed Aggregator
 
Gator is a command-line tool for tracking and reading blog posts from RSS feeds. Subscribe to sources, pull content on a schedule, and read everything from your terminal without touching a browser.
 
## Tech Stack
 
- **Runtime:** Node.js 22 + TypeScript
- **Database:** PostgreSQL via Drizzle ORM
- **Feed Parsing:** fast-xml-parser
## Getting Started
 
### Requirements
 
- Node.js 22 or higher
- PostgreSQL
### Install Dependencies
 
```bash
npm install
```
 
### Configure
 
Create `~/.gatorconfig.json` with your database connection and leave `current_user_name` blank — it gets populated on login:
 
```json
{
  "db_url": "postgresql://user:password@localhost:5432/gator",
  "current_user_name": ""
}
```
 
### Run Migrations
 
```bash
npm run migrate
```
 
## Commands
 
Run any command with:
 
```bash
npm start <command> [args...]
```
 
| Command | Args | Needs Login | What It Does |
|---|---|---|---|
| `register` | `<username>` | | Create an account and sign in |
| `login` | `<username>` | | Switch to an existing account |
| `users` | | | Show all registered accounts |
| `addfeed` | `<name> <url>` | ✓ | Add a feed and follow it automatically |
| `feeds` | | | List every feed in the system |
| `follow` | `<feed_url>` | ✓ | Follow a feed that already exists |
| `following` | | ✓ | Show feeds you currently follow |
| `unfollow` | `<feed_url>` | ✓ | Stop following a feed |
| `agg` | `<duration>` | | Fetch new posts on a repeating interval |
| `browse` | `[limit]` | ✓ | Read recent posts from your followed feeds |
| `reset` | | | Wipe all users from the database |
 
## Quick Example
 
```bash
# Create an account and subscribe to a feed
npm start register alice
npm start addfeed "Go Blog" https://go.dev/blog/feed.atom
 
# Fetch new posts every 30 seconds
npm start agg 30s
 
# Read the 5 most recent posts
npm start browse 5
```
 
## Duration Format
 
The `agg` command accepts human-readable durations: `30s`, `5m`, `1h`, or combined values like `1h30m`.
 
## Database Schema
 
```
users ──< feeds ──< posts
  │                  │
  └──< feed_follows >┘
```
 
- **users** — registered accounts
- **feeds** — RSS sources, each owned by a user
- **posts** — individual articles pulled from feeds
- **feed_follows** — the many-to-many link between users and feeds
## Development
 
```bash
# Run the CLI
npm start
 
# Generate migrations after schema changes
npm run generate
 
# Apply pending migrations
npm run migrate
```
