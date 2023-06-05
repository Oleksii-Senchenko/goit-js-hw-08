import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const LOCAL_KEY = "videoplayer-current-time"

const iframeEl = document.querySelector('iframe')
const player = new Player(iframeEl);



 function updateTime({seconds}) {
    localStorage.setItem(LOCAL_KEY, seconds)
}


player.setCurrentTime(localStorage.getItem(LOCAL_KEY) || 0)

player.on('timeupdate', throttle(updateTime, 1000) );