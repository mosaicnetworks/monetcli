<img width="75px" height="75px" align="right" alt="Monet Logo" src="https://github.com/mosaicnetworks/monetd/raw/master/docs/assets/monet_logo.png" title="Monet CLI"/>

# Monet CLI

[![npm version](https://badge.fury.io/js/monetcli.svg)](https://badge.fury.io/js/monetcli)

A CLI wallet to interact with the Monet Hub.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Data Directory](#data-directory)
4. [Proof of Authority](#proof-of-authority)

## Overview

This is a wrapper around [`evm-lite-cli`](https://github.com/mosaicnetworks/evm-lite-cli).

Any Monet Hub specific commands will be implemented here. It is advised to use this CLI to interact with a [`monetd`](https://github.com/mosaicnetworks/monetd) instance as some functionality may not be accessible through `evm-lite-cli`

## Installation

You can easily install `monetcli` with NPM

```bash
npm install -g monetcli
```

or with `yarn`

```bash
yarn global add monetcli
```

## Data Directory

The first time `monetcli` runs it creates a special directory in a default location, where it stores any relevant information.

-   Linux: `~/.monet`
-   Mac OS: `~/Library/MONET`
-   Windows: `~/AppData/Roaming/MONET`

In particular, `monetcli` creates the following:

-   **monetcli.toml**: where global options are specified (these values can be
    updated by `monetcli config` command)

    ```toml
    [connection]
    host = "127.0.0.1"
    port = 8000

    [defaults]
    from = "moniker"
    gas = 1000000000000
    gasPrice = 0
    ```

-   **keystore**: where all encrypted account keys are stored (ordered by `UTC timestamps`)

### Cofiguration

To change default configuration values in `monetcli.toml` run `monetcli config set -i` or `monetcli c s -i`.

You will be
taken to an interactive prompt to change connection and default values.

```console
$ monetcli config set -i

? Host: 127.0.0.1
? Port: 8000
? From: moniker
? Gas: 1000000000000
? Gas Price: 0
```

## Proof of Authority

The Monet Hub uses Proof of Authority with [EVM-Lite](https://github.com/mosaicnetworks/evm-lite) and [Babble](https://github.com/mosaicnetworks/babble).

A [Proof of Authority Document](docs/poa.md) demonstrating adding a node is avaiable.
