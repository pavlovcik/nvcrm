#!/usr/bin/env bash

function quitProcess() {
    echo
    echo
    echo "  Ending background tasks..."
    echo
    echo
    screen -ls | grep '(Detached)' | awk '{print $1}' | xargs -I % -t screen -X -S % quit
    exit
}

clear

echo
echo "  Launching NVCRM Development Environment..."
echo
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"
cd ..

trap quitProcess EXIT # INT TERM

rsync -a src/testing/node/static/client/ dist/testing/node/static/client
rsync -a src/testing/node/static/images dist/testing/node/static/
rsync -a src/testing/node/static/spreads dist/testing/node/static/
rsync -a src/testing/node/static/styled dist/testing/node/static/
rsync -a src/testing/node/static/styles dist/testing/node/static/

screen -dmS 'watch-node' bash -c 'parcel watch ./src/testing/node/index.ts --out-dir ./dist/testing/node --target node'
echo "      > screen started: 'watch-node'"
screen -dmS 'watch-browser' bash -c 'parcel watch ./src/testing/node/static/styled/index.html --out-dir ./dist/testing/node/static --target browser'
echo "      > screen started: 'watch-browser'"

node ./dist/testing/node/