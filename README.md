# Questify

## Description

Questify is a mobile app inspired by Strava and Instagram where users share the everyday tasks they complete.
Each task is posted to a feed, and the community can react with likes or dislikes.
These reactions impact the author’s experience points (EXP), rewarding consistency and positive feedback.

A website version of the app is available [here](https://poc-questify.vercel.app/).

You will need to create an account to use it.

## Running the code

You will need to have [Node.js](https://nodejs.org/en/download) installed.

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Supabase setup

1. Copy `.env.example` to `.env.local`.
2. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project settings. `SUPABASE_URL` and `SUPABASE_ANON_KEY` are also accepted.
3. Import the shared client from `src/lib/supabase.ts` wherever you need database, auth, or storage access.

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
4. Use [Android Studio](https://developer.android.com/studio) to run it on your device

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
