# kun-galgame-nuxt3

---

Note: You must use `@socket.io/pm2` instead `pm2`

```shell
npm install -g @socket.io/pm2
```

If pm2 is already installed, you will have to remove it first:

```shell
npm remove -g pm2
```

See: https://socket.io/docs/v4/pm2/

## How to start

Clone this repository.

```shell
git clone https://github.com/KUN1007/kun-galgame-nuxt3
```

Install packages, we recommend you use `pnpm`

```shell
pnpm i
```

Create `.env` file in project root folder.

Reference `.env.example` white your own project config.

Run project, for development environment

```shell
pnpm dev
```
