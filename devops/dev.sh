#!/usr/bin/env bash
clear
trap quitProcess EXIT INT TERM

echo
echo "  Launching NVCRM Development Environment..."
echo
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd "$DIR"
cd ..

screen -dmS 'watch-node' bash -c 'parcel watch ./src/testing/node/index.ts --out-dir ./dist/testing/node --target node'
echo "      > screen started: 'watch-node'"
screen -dmS 'watch-browser' bash -c 'parcel watch ./src/testing/node/static/styled/index.html --out-dir ./dist/testing/node/static --target browser'
echo "      > screen started: 'watch-browser'"

node ./dist/testing/node/

# screen -dmS 'nvcrm-serve' bash -c 'node ./dist/testing/node/'
# echo "      > screen started: 'nvcrm-serve'"

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

	# if [[ $response == "c" ]]; then
	# 	open -a Sublime\ Text . || sublimeinstaller
	# 	cleanup
	# else
		# for nodemon_pid in $(ps a | grep "nodemon server.js" | grep -v grep | awk "{print $1}")
		# do
		# 	kill ${nodemon_pid}
		# 	echo "nodemon ${nodemon_pid} terminated"
		# done
		# for node_pid in $(ps a | grep "node server.js" | grep -v grep | awk "{print $1}")
		# do
		# 	kill ${node_pid}
		# 	echo "node ${node_pid} terminated"
		# done
		# for mongo_pid in $(ps a | grep "mongod" | grep -v grep | awk "{print $1}")
		# do
		# 	kill ${mongo_pid}
		# 	echo "mongod ${mongo_pid} terminated"
		# done
		# for inspector_pid in $(ps a | grep "node-inspector" | grep -v grep | awk "{print $1}")
		# do
		# 	kill ${inspector_pid}
		# 	echo "node-inspector ${inspector_pid} terminated"
		# done

		# sleep 1
		# clear
		# exit
	# fi
}