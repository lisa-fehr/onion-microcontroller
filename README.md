Used on an Onion Omega2 Plus to read one json item of 0 and 1s from a url containing:
[{"content":"0001100000001000","columns":8}]

Setup:
- opkg update
- opkg install nodejs
- opkg install node-oled-exp
- opkg install npm
- npm install request -g

Option to add this to the /etc/rc.local file to start the script on boot:
```
# Put your custom commands here that should be executed once
# the system init finished. By default this file does nothing.

node /root/oled-node.js

exit 0
```

Pending Goals:
- add an sd card to my Onion Omega2 Plus, I ran out of space
- get git auth working on my microcontroller, user posts were not helpful
- show more than one pixel image, pages on the Omega were not what I had expected (they are rows)
