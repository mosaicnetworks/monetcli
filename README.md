<img width="75px" height="75px" align="right" alt="Monet Logo" src="https://github.com/mosaicnetworks/monetd/raw/master/docs/_static/monet_logo.png" title="Monet CLI"/>

# Monet CLI

[![npm version](https://badge.fury.io/js/monetcli.svg)](https://badge.fury.io/js/monetcli)

A CLI wallet to interact with the Monet Hub.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Data Directory](#data-directory)
    - [Modify Data Directory Path](#modify-data-directory-path)
    - [Configuration](#Configuration)
4. [Proof of Authority](#proof-of-authority)

## Overview

This is a wrapper around [`evm-lite-cli`](https://github.com/mosaicnetworks/evm-lite-cli).

Any Monet Hub specific commands will be implemented here. It is advised to use this CLI to interact with a [`monetd`](https://github.com/mosaicnetworks/monetd) instance as some functionality may not be accessible through `evm-lite-cli`

You can read more about `monetd` and how to get started in the documentation [here](https://monetd.readthedocs.io/en/latest/index.html).

## Installation

You can easily install `monetcli` with NPM

```bash
$ npm install -g monetcli
```

or with `yarn`

```bash
$ yarn global add monetcli
```

## Commands

### Flags

The global flag `-d, --datadir` specifies the directory where `keystore` and `monetcli.toml` are stored unless overwritten by specific flags.

```bash
$ monetcli --datadir <path> <command>
```

Commands also have two logging level flags `--silent` and `--debug` which will silence and show debug logs respectively.

**By default all commands will output formatted output. If you wish to script or require a JSON output use the `-j, --json` flag**.

For example to show JSON output for the `info` command:

```console
$ monetcli info --json

monetcli http GET camille.monet.network:8080/info

{"consensus_events":"4121","consensus_transactions":"99","events_per_second":"0.00","id":"3048798009","last_block_index":"112","last_consensus_round":"445","last_peer_change":"258","min_gas_price":"10","moniker":"mosaic","num_peers":"4","round_events":"0","rounds_per_second":"0.00","state":"Babbling","sync_rate":"1.00","time":"1574268876085188708","transaction_pool":"0","type":"babble","undetermined_events":"19"}
```

## Data Directory

The first time `evmlc` runs, and if no options are specified, it creates a
special directory in a default location, where it
stores any relevant information.

-   Linux: `~/.monet`
-   Mac OS: `~/Library/MONET`
-   Windows: `~/AppData/Roaming/MONET`

In particular, this directory contains the following items:

-   **evmlc.toml**: where global options are specified
-   **keystore**: where all encrypted account keys are stored

**This directory is shared by [monetd](https://github.com/mosaicnetworks/monetd).**

### `evmlc.toml`

Example evmlc.toml:

```toml
[connection]

# The IP address of the EVM-Lite node
host = "localhost"

# The listening port of the EVM-Lite service
port = 8080

[defaults]

# Moniker of the account to be used as default
# usually the filename of the keyfile
from = "moniker"

# Gas will only default to this value for contract
# calls as transfer will take a maximum of 21000 gas
gas = 1000000

# DEPRECATED
# Commands requiring gas price will pull the
# minimum gas price of the requested node and
# use with the transaction.
gasPrice = 0
```

_Note: `from` refers to the `moniker` of the account not the `address`._

To change default configuration values run `evmlc config set -i` or `evmlc c s -i`. You will be
taken to an interactive prompt to change connection and default values.

```console
$ evmlc config set -i

? Host: localhost
? Port: 8080
? From: moniker
? Gas: 1000000
? Gas Price: 0
```

### Change DataDir Path

The global flag `-d, --datadir` specifies the directory where `keystore` and `monetcli.toml` which defaults to the paths defined above.

```bash
$ monetcli --datadir <path> <command>
```

## Proof of Authority

The Monet Hub uses Proof of Authority with [EVM-Lite](https://github.com/mosaicnetworks/evm-lite) and [Babble](https://github.com/mosaicnetworks/babble).
