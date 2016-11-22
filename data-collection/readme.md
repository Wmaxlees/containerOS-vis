Matthew Kalan
11/21/2016

This folder will contain all of the data collection scripts/code for the project

The createContainer.sh will create a new docker container that runs a stress test. The script accepts one arguement (either a 1 or 2) 1 will create a cpu stress test, while 2 will create vm stress test. I intended to use the vm stress test to stimulate large memory usage, but it does not appear to substantially draw memory usage, so this still needs work. 

Before running these stress test the stress-ng application needs to be downloaded. To download stress-ng use the command: 

$ docker pull lorel/docker-stress-ng


