# Vietnam Community League Overlay
A complete rework of [vcl-tournament-overlay-tosu](https://github.com/vncommunityleague/vcl-tournament-overlay-tosu), using [Z-Engine](https://www.npmjs.com/package/@fukutotojido/z-engine) as value change listener. Made by [ANON TOKYO](https://github.com/FukutoTojido) of Vietnam Community League.

## Why this thing exist?
- You hate configuring Lazer
- You want the experience look that Lazer provides but want to spend less time setting things up
- You prefer the ease of customizing an open-source overlay

## Setup
- Install [tosu](https://github.com/tosuapp/tosu/releases/tag/v4.4.3)
- Download the latest release from the [Release](https://github.com/vncommunityleague/vcl-overlay/Releases) page of this repository
- Extract the downloaded zip file to `static` folder of tosu.
- Your file structure should be like this
```
static
  vcl-overlay
    assets/
    check.svg
    data.json
    index.html
    vcl.svg
```
- Update data in `data.json` file (example is provided in the file)

## Usage
- Add a new Browser Source in OBS:
  - URL: `http://127.0.0.1:24050/vcl-overlay`
  - Width: `1920`
  - Height: `1368`
- Click on `Interact` button below the preview to interact with the overlay
- **Toggle Mappool** to show the mappool panel
  - **Left Click** a beatmap to pick the beatmap for **Left** team
  - **Shift + Left Click** a beatmap to ban the beatmap for **Left** team
  - **Right Click** a beatmap to pick the beatmap for **Right** team
  - **Shift + Right Click** a beatmap to ban the beatmap for **Right** team
  - **Ctrl + Click / Right Click** a beatmap to remove any ban/pick on the beatmap

## Development
Just as a head-up, since this overlay is completely reworked on Vite, you cannot directly change the HTML, CSS and JS directly just like the old overlay but rather spin up a development server on your local machine and work with it for modification. After you have done everything, you should build the overlay and paste the files in the `dist` folder to tosu folder again.

- Install [Bun](https://bun.sh/docs/installation)
- Clone the repository and start developing
```
git clone https://github.com/vncommunityleague/vcl-overlays.git
bun install
bun dev
```
- Your overlay should be available at `http://localhost:5173`

## Build
- Build the overlay
```
bun run build
```

## FAQs
**Does this support accuracy?**
- To be implemented

**Does this support automatic pick?**
- I have come to the decision to remove the automatic pick functionality as a whole due to its complexity and I'm just fed up with being told to add that it and remove that out over and over again

**Who should I contact to get support?**
- For additional support, DM `hoaq#6054` on Discord (or ping in osu! Tournament Hub) - note that any requests regarding modifying overlay design will be ignored.
- If you are modifying this overlay, please make a fork so we know which tournament this is being used for :D