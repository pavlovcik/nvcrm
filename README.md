# nvCRM

## Overview

This software will be shared as much as possible, ideally in browser (client) on the inventum digital server (server) and google drive (drive)

There are a few benefits to sharing. Currently, the software compiles the `ACCOUNT`, and `PROJECT` .jsons to create `PROPOSAL` and attaches metadata.

Example generated `PROPOSAL` metadata:
```jsonc
{
	"type": "proposal", //  object type
	"updated": "2019-11-18T18:51:34.968Z",
	"source": "browser-0.0.1",  //  knows where it was compiled/created and with what version of the software (for debugging and handling schema changes)
	"name": "WAMI/Q4-2019"  //  automatically combines the account.meta.name and project.meta.name
}
```

This is anticipated to be useful for the caching engine within `nvCRM` class to resolve the most updated copy of the data from when syncing between client-server-drive.

## syncEngine
```typescript
class syncEngine extends nvCRM {    //  not sure if correct syntax
    resolve(local: Proposal, remote: Proposal) : Proposal
    cache(latest: Proposal) : Proposal
    async push(latest: Proposal) : Promise<xhr.statusCode> //  @TODO: what is the return value? the statuscode?
}

```
How it could be used:
```typescript

let latestProposal =

        nvCRM.syncEngine.resolve(
            local: Proposal,
            remote: Proposal
        ) : Proposal;

nvCRM.syncEngine.cache(latestProposal);
nvCRM.syncEngine.push(latestProposal);

// Maybe `nvCRM.syncEngine(local, remote)` can abstract all the steps, and run the resolve, store and sync routines in series?

```

+ `syncEngine.resolve();` should resolve and return the latest copy of the proposal.
+ `syncEngine.cache();` should be abstracted using the adapters (adapter selected based on the execution environment) and then properly cache/save the proposal.

```typescript
local: Proposal
```

+ The local copy of the proposal (and handle if it does not exist)
  + If it does not exist, then save the remote copy to local automatically.
  + If it does exist, return latest proposal based on the `meta.updated` property.
    + Do not offer revision control because Google Drive models it differently and it will not be worth it.

```typescript
remote: Proposal
```

+ The remote copy (and handle if it does not exist)
  + If it is out of date OR it does not exist:
    + The server should receive the client copy and also use the same resolving engine before committing changes.
      + Revision control may be handled by Google Drive (for at least 30 days...but maybe do not write custom revision management code)
    + and update drive to reflect this, which is gonna be quite complicated, but will create the ACCOUNT folder and the PROJECT folders within the ACCOUNT folder, and then save the deconstructed jsons in their appropriate places.

## syncEngine.cache.adapter
This section still needs a lot more thought but I imagine that functions that bridge different storage conditions should be useful, particularly given that the routines required to store data using localStorage and Google Drive are so different.

```typescript
class adapter {
    /**
    * Understands how to work with localStorage
    */
    get browser() { return latestProposal: Proposal};
    set browser() { };

    /**
    * JSON storage, server will call this routine when nvCRM.environment === "node"
    */
    get node() { return latestProposal: Proposal};
    set node() { };

    /**
    * DriveApp.Folder, DriveApp.File
    * might have to be async which could be interesting.
    */
    get drive() { return latestProposal: Proposal};
    set drive() { };
}

class syncEngine extends nvCRM {
    //  not sure if extends is correct syntax but could also nest syncEngine inside of class nvCRM.
    // pretty sure needs to be nested inside of class nvCRM...

	resolve: () => {};
	cache: (proposal: Proposal) => {
        // ... should be replaced with adapters upon construction
    };
    push () => {};

    constructor() {  //  adapter selection upon construction
        let selectedAdapter = null;
        selectedAdapter = adapter[super().environment]  // nvCRM.environment
        this.store = selectedAdapter;
    }
}
```