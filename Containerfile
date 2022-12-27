#FROM registry.redhat.io/ubi8/nodejs-16
FROM docker.io/library/node:16

#apparently we will need to install node.js inside the container ourselves, or look for a better builder image for node 16

#copy the files and unzip

#RUN useradd ucfx -d /home/ucfx && \
#    mkdir -p /app/nodepg && \
#    chown -R ucfx /app/nodepg

#RUN cd /home/ucfx && ls

#USER ucfx

RUN mkdir -p /app/nodepg && \
    chown -R node /app/nodepg

USER node

WORKDIR /app/nodepg/

ADD np.zip .

RUN unzip np.zip && \
    npm install

#create environment variables
ENV DBUSER=postgres
ENV DBNAME=testdb1
ENV DBPASS=100101
#ENV DBHOST=localhost #I'll pass this through the run command whether through podman or oc

#navigate to the source code folder
#install the needed packages

#run the app
ENTRYPOINT npm start
