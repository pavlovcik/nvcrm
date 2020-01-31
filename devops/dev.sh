#!/usr/bin/env bash

clear
trap quitProcess EXIT INT TERM

echo
echo "  Launching NVCRM Development Environment..."
echo
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"
cd ..

screen -dmS 'watch-node' bash -c 'parcel watch ./src/testing/node/index.ts --out-dir ./dist/testing/node --target node'
echo "      > screen started: 'watch-node'"
screen -dmS 'watch-browser' bash -c 'parcel watch ./src/testing/node/static/styled/index.html --out-dir ./dist/testing/node/static --target browser'
echo "      > screen started: 'watch-browser'"

node ./dist/testing/node/

function quitProcess() {
    echo
    echo "  Press ENTER to quit."
    read response
    if [[ $response ]]; then
        echo
        echo "  Exiting..."
        killall screen
        sleep 1
        killall node
        sleep 1
        exit
    fi
}
