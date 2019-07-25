# EVM-Lite CLI Framework

Abstract out the common tasks in a command and provide a clean way of revieving variables and errors from those tasks.

One idea could be something like this

```typescript
// import from some hypothetical library
import { listKeystores } from 'evm-lite-cli/frames';

const [keyfiles, error] = listKeystores<TKeyfiles>('PATH_HERE');
if (error) {
	// do some error handling here.
}
```

Maybe even modularise the CLI even further. Suppose we give a more rich feature set from classes like `Staging` and `Session` allowing more flexible CLI constructions.
