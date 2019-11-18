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

## .sync
```typescript
class sync extends nvCRM {    //  not sure if correct syntax
    resolve(local: Proposal, remote: Proposal) : Proposal
    cache(latest: Proposal) : Proposal
    async pull(latest: Proposal) : Promise<Proposal> //  @TODO: not sure if necessary
    async push(latest: Proposal) : Promise<xhr.statusCode> //  @TODO: what is the return value? the statuscode?
}

```
How it could be used:
```typescript
let latestProposal =

        nvCRM.sync.resolve(
            local: Proposal,
            remote: Proposal
        ) : Proposal;

nvCRM.sync.cache(latestProposal);
nvCRM.sync.push(latestProposal);

// Maybe `nvCRM.sync(local, remote)` can abstract all the steps, and run the resolve, store and sync routines in series?
```

### .sync.resolve();
Should resolve and return the latest copy of the proposal.

```typescript
// @param local { Proposal }
```

+ The local copy of the proposal (and handle if it does not exist)
  + If it does not exist, then save the remote copy to local automatically.
  + If it does exist, return latest proposal based on the `meta.updated` property.
    + Do not offer revision control because Google Drive models it differently and it will not be worth it.

```typescript
// @param remote { Proposal }
```

+ The remote copy (and handle if it does not exist)
  + If it is out of date OR it does not exist:
    + The server should receive the client copy and also use the same resolving engine before committing changes.
      + Revision control may be handled by Google Drive (for at least 30 days...but maybe do not write custom revision management code)
    + and update drive to reflect this, which is gonna be quite complicated, but will create the ACCOUNT folder and the PROJECT folders within the ACCOUNT folder, and then save the deconstructed jsons in their appropriate places.

### .sync.cache();
Should be abstracted using the adapters (adapter selected based on the execution environment) and then properly cache/save the proposal.

#### .sync.cache.adapter[*]
This section still needs a lot more thought but I imagine that functions that bridge different storage conditions should be useful, particularly given that the routines required to store data using localStorage and Google Drive are so different.

```typescript
class sync extends nvCRM {
    //  not sure if extends is correct syntax but could also nest sync inside of class nvCRM.
    // pretty sure needs to be nested inside of class nvCRM..

    private adapter = { //  is this proper syntax?
        get browser() { return function browserAdapter() { /*... understands how to work with localStorage */ } };
        // set browser() { };   @TODO: not sure if necessary
        get node() { return function nodeAdapter() { /*... understands how to work with JSON file storage and fs.write */ } };
        // set node() { };  @TODO: not sure if necessary
        get drive() { return function driveAdapter() { /*... understands how to work with DriveApp.Folder, DriveApp.File etc. Might have to be async which could be interesting.  */ } };
        // set drive() { }; @TODO: not sure if necessary
    };

	public resolve = () => {};
	public cache = (proposal: Proposal) => {
        // ... should be replaced with adapters upon construction
    };
    public pull = async function pull () {}; //  @TODO: needs to be async
    public push = async function push () {}; //  @TODO: needs to be async

    constructor() {  //  adapter selection upon construction
        let selectedAdapter = null;
        selectedAdapter = adapter[super().environment]  // nvCRM.environment
        this.store = selectedAdapter;
    }
}
```