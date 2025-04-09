import { LightningElement } from 'lwc';
import spotifyCallout from '@salesforce/apex/spotifyCallout.getSearchedSong';

export default class SpotifyApp extends LightningElement {
    data;    
    songName = '';
    songs = [];
    selectedSong = null;
    

    songReader(event) {
        this.songName = event.target.value;
    }  

    searchSongs() {
        spotifyCallout({ trackname: this.songName })
            .then(data => {
                console.log('Before Parsing to JSON:\n', data);

                try {
                    // Parse the JSON response
                    let dataparsed = JSON.parse(data);

                    // Deep clone the object to remove Proxy
                    this.data = structuredClone(dataparsed || {});

                    console.log(this.data);

                    // Correct way to extract track names from the API response
                    if (this.data.tracks && Array.isArray(this.data.tracks.items)) {
                        this.songs = structuredClone(this.data.tracks.items.map(item => {
                            const trackId = item.id; // Corrected track ID extraction
                            return {
                                name: item.name,
                                artist: item.artists[0].name,
                                imageUrl: item.album.images[0].url,
                                songUrl: item.external_urls.spotify,
                                //albumName:item.album.name !==null ? item.album.name : 'No Details Available',
                                previewUrl: item.preview_url, // Handles null values
                                sourceUrl: `https://open.spotify.com/embed/track/${trackId}`
                            }
                    }));
                        console.log(this.songs);
                    } else {
                        console.log('No tracks found');
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    selectSong(event) {
        const songName = event.currentTarget.dataset.name;
        this.selectedSong = this.songs.find(song => song.name === songName);
    }

    closeSelectedSong() {
        this.selectedSong = null;
    }

    playSong() {
        const audio = this.template.querySelector('audio');
        if (audio) {
            audio.play();
        }
    }

    
}