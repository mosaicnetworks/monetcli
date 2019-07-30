# Proof of Authority Commands

We explain how to use `monetcli` with the Proof of Authroity contract.

We will walk through nominating a new `address`, voting for that address and other PoA commands.

## 1. Run `monetcli` in interactive mode

```bash
$ monetcli i

  __  __                          _        ____   _       ___
 |  \/  |   ___    _ __     ___  | |_     / ___| | |     |_ _|
 | |\/| |  / _ \  | '_ \   / _ \ | __|   | |     | |      | |
 | |  | | | (_) | | | | | |  __/ | |_    | |___  | |___   | |
 |_|  |_|  \___/  |_| |_|  \___|  \__|    \____| |_____| |___|

 Mode:        Interactive
 Data Dir:    ~/.monet
 Config File: ~/.monet/monetcli.toml
 Keystore:    ~/.monet/keystore

  Commands:

    help [command...]                    Provides help for a given command.
    exit                                 Exits application.
    accounts create [options]            Creates an encrypted keypair locally
    accounts get [options] [address]     Fetches account details from a connected node
    accounts list [options]              List all accounts in the local keystore directory
    accounts update [options] [address]  Update passphrase for a local account
    accounts import [options]            Import an encrypted keyfile to the keystore
    config set [options]                 Set values of the configuration inside the data directory
    config view [options]                Output current configuration file
    poa check [options] [address]        Check whether an address is on the whitelist
    poa info [options]                   Display Proof of Authority information
    poa nominate [options] [address]     Nominate an address to proceed to election
    poa nomineelist [options]            List nominees for a connected node
    poa vote [options] [address]         Vote for an nominee currently in election
    poa whitelist [options]              List whitelist entries for a connected node
    transfer [options]                   Initiate a transfer of token(s) to an address
    info [options]                       Display information about node
    version [options]                    Display current version of cli
    debug                                Toggle debug mode
    clear                                Clear output on screen


monetcli$
```

## 2. List accounts and create an account to nominate

We will need to create an account to nominate as a validator for the network. Firstly we can view our accounts by running `accounts list -f` (`-f` specified formatted output).

```bash
monetcli$ accounts list -f

.-----------------------------------------------------------------------------.
|                  Address                   |        Balance         | Nonce |
|--------------------------------------------|------------------------|-------|
| 0x702B0ad02a7a6056EB16A697A96d849c228F5fB4 | 1337000000000000000000 |     0 |
'-----------------------------------------------------------------------------'
```

Now we will need to create an account. We can do this by running `accounts create` and following the prompts on the screen.

```bash
monetcli$ accounts create

? Passphrase:  [hidden]
? Re-enter passphrase:  [hidden]

{"version":3,"id":"1153fee6-79e7-46d3-a3cd-93cb86dd71f5","address":"221eff07bd1bf1e1fe21a069523413218c32be42","crypto":{"ciphertext":"a672a0c40304717ac36fab3d69f3e07d7703
6f7cb0669ae299f58a47b3af9efc","cipherparams":{"iv":"d818e6da4347a5f8a8bf8a9ef7bc36b3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"0d50a248ac6ad
f0933af1d1a4316d1339cd042f489f63ed5218589f0b4963618","n":8192,"r":8,"p":1},"mac":"84168ff91a8191f37c738e93d8bec07226eccf2e1928e544cb2b35797d6ea125"}}
```

## 3. List whitelist

As a sanity check, we will need to see the entire whitelist. We can do this by running `poa whitelist -f`.

```bash
monetcli$ poa whitelist -f

.----------------------------------------------------------------------.
|         Moniker         |                  Address                   |
|-------------------------|--------------------------------------------|
|         node0           | 0x702b0ad02a7a6056eb16a697a96d849c228f5fb4 |
'----------------------------------------------------------------------'
```

## 4. Nominate a new node

We will nominate the created account `221eff07bd1bf1e1fe21a069523413218c32be42` to go through election using the command `poa nominate`.

```bash
monetcli$ poa nominate

? From:  702b0ad02a7a6056eb16a697a96d849c228f5fb4
? Passphrase:  [hidden]
? Nominee:  0x221eFf07BD1bF1e1FE21A069523413218c32bE42
? Moniker:  node1

You (0x702b0ad02a7a6056eb16a697a96d849c228f5fb4) nominated 'node1' (0x221eff07bd1bf1e1fe21a069523413218c32be42)
```

## 5. List nominees

Now that we have nominated an address we can view the nominee list by running `poa nominee list -f`

```bash
monetcli$ poa nominee list -f

.------------------------------------------------------------------------------.
| Moniker |                  Address                   | Up Votes | Down Votes |
|---------|--------------------------------------------|----------|------------|
| Node1   | 0x221eff07bd1bf1e1fe21a069523413218c32be42 |        0 |          0 |
'------------------------------------------------------------------------------'
```

## 6. Vote for the nominee

We can now vote for the nominee by running `poa vote` and following the on-screen prompts.

```bash
monetcli$ poa vote

? From:  702b0ad02a7a6056eb16a697a96d849c228f5fb4
? Passphrase:  [hidden]
? Nominee:  0x221eff07bd1bf1e1fe21a069523413218c32be42
? Verdict:  Yes

You (0x702b0ad02a7a6056eb16a697a96d849c228f5fb4) voted 'Yes' for '0x221eff07bd1bf1e1fe21a069523413218c32be42'.
Election completed with the nominee being 'Accepted'.
```

Since we were the only whitelisted address, the only vote a nominee needs to get whitelisted is ours.

## 7. Check whitelist

We now check the updated whitelist to see if the nominee was officially accepted.

```bash
monetcli$ poa whitelist -f
.----------------------------------------------------------------------.
|         Moniker         |                  Address                   |
|-------------------------|--------------------------------------------|
| Node0                   | 0x702b0ad02a7a6056eb16a697a96d849c228f5fb4 |
| Node1                   | 0x221eff07bd1bf1e1fe21a069523413218c32be42 |
'----------------------------------------------------------------------'
```
