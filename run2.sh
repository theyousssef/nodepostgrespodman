#bin/bash

podman run -d --name nodepost1 -e DBHOST=postgresql-node-post.apps.eu410.prod.nextcle.com -p 13333:3333 localhost/node/postgres
sleep 2
podman ps
