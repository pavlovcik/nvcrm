# nvCRM

## Overview

This software will be shared as much as possible, ideally in browser (client) on the inventum digital server (server) and google drive (drive)

There are a few benefits to sharing. Currently, the software compiles the `ACCOUNT`, and `PROJECT` .jsons to create `PROPOSAL` and attaches metadata.

Example generated metadata:
```jsonc
{
	"type": "proposal", //  object type
	"updated": "2019-11-18T18:51:34.968Z",
	"source": "browser-0.0.1",  //  knows where it was compiled/created and with what version of the software (for debugging and handling schema changes)
	"name": "WAMI/Q4-2019"  //  automatically combines the account.meta.name and project.meta.name
}
```

This is anticipated to be useful for the caching engine within `nvCRM` class to resolve the most updated copy of the data from when syncing between client-server-drive.