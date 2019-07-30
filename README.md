# Monet CLI

[![npm version](https://badge.fury.io/js/monetcli.svg)](https://badge.fury.io/js/monetcli)

A CLI wallet to interact with the Monet Hub.

## Table of Contents

1. [Overview](#overview)
2. [Data Directory](#data-directory)
3. [Proof of Authority](#proof-of-authority)

## Overview

This is a wrapper around [`evm-lite-cli`](https://github.com/mosaicnetworks/evm-lite-cli).

Any Monet Hub specific commands will be implemented here. It is advised to use this CLI to interact with a [`monetd`](https://github.com/mosaicnetworks/monetd) instance as some functionailty may not be accessible through `evm-lite-cli`

## Data Directory

The first time `monetcli` runs it creates a special directory in a default location, where it stores any relevant information.

-   Linux: `~/.monet`
-   Mac OS: `~/Library/MONET`
-   Windows: `~/AppData/Roaming/MONET`

In particular, `monetcli` creates the following:

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

The Monet Hub uses Proof of Authority with [EVM-Lite](https://github.com/mosaicnetworks/evm-lite) and [Babble](https://github.com/mosaicnetworks/babble).

A [Proof of Authority Document](docs/poa.md) demonstrating adding a node is avaiable.
