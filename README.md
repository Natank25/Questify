# Application mobile AntiProcrastination

This is a code bundle for Application mobile de fitness. The original project is
available
at https://www.figma.com/design/0HceDyZWO2CQKeke66dDwe/Application-mobile-de-fitness.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Testing on Mobile

### Android

#### Using Android Studio or Android emulator:
```bash
npm run build
npx cap sync android
npx cap run android
```

#### Using a connected Android device:
1. Enable Developer Options on your device
2. Enable USB debugging
3. Connect your device via USB
4. Run the commands above

### iOS

#### On macOS with Xcode:
```bash
npm run build
npx cap sync ios
npx cap open ios
```
Then run from Xcode on either an iPhone simulator or a real device.

#### On Linux (testing on real iPhone):
Since iOS simulator requires macOS, test on a real iPhone with Safari:

1. Build and start the dev server:
   ```bash
   npm run dev -- --host 0.0.0.0
   ```

2. Find your computer's IP address:
   ```bash
   ip addr
   ```

3. Open Safari on your iPhone and visit:
   ```
   http://<your-computer-ip>:5173
   ```

### Quick browser testing

To test the web app on any mobile device without building native apps:

```bash
npm run dev -- --host 0.0.0.0
```

Then open your device's browser and visit `http://<your-computer-ip>:5173` where `<your-computer-ip>` is your machine's local network IP address.
