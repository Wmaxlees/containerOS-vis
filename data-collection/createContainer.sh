#! /bin/bash
#createContainer
#Matthew Kalan
#11/21/2016
# Download stress-ng beforehand with the command docker pull lorel/docker-stress-ng
# Call this script with command bash createContainer.sh [1|2]
# 1 runs a cpu stress test
# 2 runs a memory stress test (but this doesn't move percentages)

if [ "1" = "$1" ]; then # CPU
gnome-terminal -e "docker run -it --rm lorel/docker-stress-ng --cpu 1 --timeout 10m"
fi
if [ "2" = "$1" ]; then # MEM <Doesn't work right>
gnome-terminal -e "docker run -it --rm lorel/docker-stress-ng --vm 1 --timeout 10m"
fi
# Print recent container id
docker ps -l -q