# Live Cricket Score

![build-test](https://github.com/sanwebinfo/next-cricket-score/workflows/build-test/badge.svg)  

Simple web app to Get Live Cricket Score updates.

![Screenshot from 2023-09-09 18-09-44](https://github.com/sanwebinfo/next-cricket-score/assets/10300271/fc4990a5-1983-45f3-bff1-687b22762056)

> This project is for Educational and Learning usage - all data credits go to Cricbuzz.

⚛ React + Next JS | 🌩 Vercel  

## Free Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanwebinfo%2Fnext-cricket-score)

## Features 🍔

- React + Next JS
- Tailwind CSS
- Power Packed with React and Next Modules
- Next JS API Router for fetch score data from cricbuzz
- PWA Support

```sh

## Homepage - Get Live Score
http://localhost:3000

## Get Match Score by ID
http://localhost:3000/score?id=123456

```

## API 🍪

- API for Get Live Score data

For more check - `/app/live/route.js`

```sh
http://localhost:3000/live
```

- Get Live Score data by match id

For More Check - `/app/match/[slug]/route.js`

```sh
http://localhost:3000/match/53350
```

## Installation 📦

- Clone this repo or Download

```sh
git clone https://github.com/sanwebinfo/next-cricket-score
cd next-cricket-score
yarn
```

- Test the site

```sh
yarn dev
```

- Build the site

```sh
yarn build
```

- Test the production Build on Localhost

```sh
yarn start
```

## Contributing 🙌

Your PR's are Welcome

## Disclaimer 🗃

- This is not an Offical API from Cricbuzz - it's an Unofficial API
- This is for Education Purpose only - use at your own risk on Production Site

## LICENSE ☑

MIT
