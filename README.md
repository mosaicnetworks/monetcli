# Monet CLI

[![npm version](https://badge.fury.io/js/monetcli.svg)](https://badge.fury.io/js/monetcli)

A CLI wallet to interact with the Monet Hub.

## Data Directory

The first time `monetcli` runs it creates a special directory in a default location, where it stores any relevant information.

-   Linux: `~/.monet`
-   Mac OS: `~/Library/MONET`
-   Windows: `~/AppData/Roaming/MONET`

In particular, this directory contains the following items:

-   **monetcli.toml**: where global options are specified. These values may be
    updated by `monetcli config` command.
-   **keystore**: where all encrypted account keys are stored (ordered by `UTC timestamps`).

### `monetcli.toml`

Example monetcli.toml:

```toml
[connection]
host = "127.0.0.1"
port = 8000

[defaults]
from = "0x702B0ad02a7a6056EB16A697A96d849c228F5fB4"
gas = 1000000000000
gasPrice = 0
```

To change default configuration values run `monetcli config set -i` or `monetcli c s -i`. You will be
taken to an interactive prompt to change connection and default values.

```console
$ monetcli config set -i

? Host: 127.0.0.1
? Port: 8000
? From: 0x702B0ad02a7a6056EB16A697A96d849c228F5fB4
? Gas: 1000000000000
? Gas Price: 0
```

## Proof of Authority

The Monet Hub uses Proof of Authority with EVM-Lite and Babble.

A [Proof of Authority Document](docs/poa.md) demonstrating adding a node is avaiable.
