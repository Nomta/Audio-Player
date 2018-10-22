# Audio Player
A handy playlist widget based on [YandexAudio](https://github.com/yandex/audio-js), displaying tracks as a list.  
*Удобный плей-лист виджет, основанный на YandexAudio, с отображением треков в виде списка.*  

Dependencies: [YandexAudio](https://github.com/yandex/audio-js).

## Usage

```html
  <script src="YandexAudio/index.min.js"></script>
  <script src="audio-player/index.min.js"></script>
  <script>
    var ap = new AudioPlayer({
      tracks: [
	      "one", 
	      "two", 
	      "three"
      ],
      pathName: 'audio/'
    });
  </script>
```

## Options

| Option | Type | Description |
| --- | --- | --- |
| `tracks` | Array | An array of track names. Default: `[]` |
| `pathName` | String | Path to files, must be ended with a slash. Default: `''` |
| `ext` | String | File extension, default: `'.mp3'` |
| `container` | Node | Parent element for play list. Default: `document.body` |
| `className` | String | CSS class name for every track element and prefix for its children. <br> Default: `''` |
| `buttonText` | Array | Text for playback control button, that must have two states. <br> Default: `['Play', 'Pause']` |  

## Global variables
Global variables are used:
- `ya` is from [YandexAudio](https://github.com/yandex/audio-js#%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5): 
an audio player object that you can use to fine tune the player
- `currentTrack` - link to the current playing track, an `audio-track` element

### Browser Support
| Firefox 15+ | Chrome 18+ | Safari 8+ | Opera 18+ | IE 10+ | 
| --- | --- | --- | --- | --- |

### License
This project is available under the [MIT](./license) license.
