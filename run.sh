#bin/bash

podman run -d --name nodepost1 --network="host" -e DBHOST=localhost -p 13333:3333 localhost/node/postgres
sleep 2
podman ps
