# Midi Sync
A small web app for synchronised playback of midi files across multiple devices.

## Getting Started
First clone the repo to your computer, then open the folder in a terminal and run the following commands.

### Dependencies
This project has been tested with `Node v20`.

### Enter the project root folder
```bash
cd dotdot
```

### Install dependencies
```bash
npm i
```

### Add Midi Files
Place any Midi files you want to be played back in the `public midi` folder of the frontend app. The folder is found at `dotdot/apps/midi-sync/player/public/midi`.

### Launch the backend and frontend
```bash
npx nx serve-app midi-sync-player
```

### Open the app on the same computer
Open a web browser and navigate to `localhost:4200/playback/midifile` where `midifile` is the name of one of the midi files (not including the `.mid` extension) placed in the public midi folder.

### Open the app on a different device on the same network
Look up the IP Address of the hosting computer. It should be IPv4 address so should be a set of 4 numbers (from 0-255) separated by a period. E.g. `192.168.0.12`
On another device, open a web browser and navigate to `your_ip_address:4200/playback/your_midi_file` where `your_ip_address` is the ip address of the hosting computer and `your_midi_file` is one of the midi files placed in the public midi folder.
