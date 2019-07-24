# Monet CLI

> **_Requires development version of `evm-lite-cli`!_**

[![npm version](https://badge.fury.io/js/monetcli.svg)](https://badge.fury.io/js/monetcli)

A Command Line Interface to interact with a [Monet](https://github.com/mosaicnetworks/monetd#readme) node.

_This module `monetcli` is an extension of `evm-lite-cli`_

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Commands](#commands)
    - [Documentation](#documentation)
    - [Flags](#flags)
4. [Data Directory](#data-directory)
5. [Proof of Authority](#proof-of-authority)
6. [Developers](#developers)

## Installation

You can easily install `monet` with NPM

```bash
npm install -g monetcli
```

or with `yarn`

```bash
yarn global add monetcli
```

## Getting Started

There is a [Getting Started Document](https://github.com/mosaicnetworks/evm-lite-cli/blob/devlop/docs/getting-started.md) available in the `evm-lite-cli` repository.

## Commands

### Documentation

A list of all supported commands along with documentation can be found in the [`evm-lite-cli`](https://github.com/mosaicnetworks/evm-lite-cli/blob/devlop/docs/README.md) repository.

### Flags

The global flag `-d, --datadir` specifies the directory where `keystore` and `monetcli.toml` are stored unless overwritten by specific flags.

_Note: that if this flag is not provided, it will default to `~/.monet`._

```bash
monet --datadir [path] interactive
```

## Data Directory

The first time `monet` runs, and if no options are specified, it creates a
special directory in a default location where it
stores any relevant information.

-   Windows: `~/AppData/Roaming/MONET`
-   Mac OS: `~/Library/MONET`
-   Linux: `~/.monet`

**This directory is also shared by [`monetd`](https://github.com/mosaicnetworks/monetd).**

In particular, this directory contains the
following items:

-   **monetcli.toml**: where global options are specified. These values may be
    overwritten by CLI flags.
-   **keystore**: where all encrypted account keys are stored.

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

To change default configuration values run `monet config set -i` or `monet c s -i`. You will be
taken to an interactive prompt to change connection and default values.

```console
$ monet config set -i

? Host: 127.0.0.1
? Port: 8000
? From: 0x702B0ad02a7a6056EB16A697A96d849c228F5fB4
? Gas: 1000000000000
? Gas Price: 0
```

## Proof of Authority

The Monet Hub using Proof of Authority with EVM-Lite and Babble.

A [Proof of Authority Document](https://github.com/mosaicnetworks/evm-lite-cli/blob/devlop/docs/proof-of-authority.md) explaining how to add a node to the whitelist is available in the `evm-lite-cli` repository.

## Developers

Notes for developers are in a [developers document](https://github.com/mosaicnetworks/evm-lite-cli/blob/devlop/docs/developer.md) in the `evm-lite-cli` repository.
