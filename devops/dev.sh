#!/usr/bin/env bash

# function mountReloader() {
#     ScriptLoc=/Users/Pavlovcik/repos/personal/nvcrm/devops/dev.sh
#     alias reload='echo "reload"; exec "$ScriptLoc"'
#     fswatch -o . | while read f; do reload; done
# }

function rebuildCSS() {
    # ScriptLoc=/Users/Pavlovcik/repos/personal/nvcrm/devops/dev.sh
    alias rebuild='npm run-script build-browser'
    fswatch -o . | while read f; do rebuild; done
}

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

# rsync -a dist/testing/node/static/client src/testing/node/static/client/ # grab FROM dist

# rsync -a src/testing/node/static/client dist/testing/node/static/client/ # push TO dist

# rsync -a src/testing/node/static/images dist/testing/node/static/
# rsync -a src/testing/node/static/spreads dist/testing/node/static/
# rsync -a src/testing/node/static/styles dist/testing/node/static/

screen -dmS 'watch-node' bash -c 'npm run-script watch-node'
echo "      > screen started: 'watch-node'"
screen -dmS 'watch-browser' bash -c 'npm run-script watch-browser'
echo "      > screen started: 'watch-browser'"

# screen -dmS 'watch' bash -c 'npm run-script watch'
# echo "      > screen started: 'watch'"

# mountReloader()

# fswatch --exclude='(dist|\.cache)' -vo . | while read f; do echo "reload"; exec /Users/Pavlovcik/repos/personal/nvcrm/devops/dev.sh; done

nodemon ./dist/testing/node/