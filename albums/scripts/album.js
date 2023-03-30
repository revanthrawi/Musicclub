var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';

var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentlyPlayingSongNumber = null;

var currentAlbum = null;

var currentSongFromAlbum = null;

// buzz library will be used.  currentSoundFile Will hold buzz object
var currentSoundFile = null;

var currentVolume = 50;

// Used to select songs inside the player bar
var $previousButton = $('.main-controls .previous');

var $nextButton = $('.main-controls .next');

//used to change the current song's playback location
var seek = function(time) {
     if (currentSoundFile) {
        currentSoundFile.setTime(time); //setTime is a Buzz method that can change a song's specified time.
     }
}

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume); //setVolume is a buzz library method
    }
 };

// assigns value to currentlyPlayingSongNumber and currentSoundFile.  Sets volume level
var setSong = function(songNumber){
    if (currentSoundFile) { 
        currentSoundFile.stop(); //stops whatever song is already playing
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    setVolume(currentVolume);
};

//Returns the jQuery html element that has a song's number, based on a song's number 
var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
}

// updates the player bar when a new song is chosen
var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

// Creates a row for a song with the song's number in the album, name of the song, the song's length
var createSongRow = function(songNumber, songName, songLength) {

    var template =
        '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
    ;

    var $row = $(template);

// add event listener and song playing/pausing action to the cell (that contains the song number)
    var clickHandler = function() {

        var songNumber = parseInt($(this).attr('data-song-number'));
        
        // User cliked on new row
        // Revert the old cell to the old song number because user started playing new song.
        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        // choosing a new song
        if (currentlyPlayingSongNumber !== songNumber) {
            setSong(songNumber); //assigns value to assigns value to currentSoundFile, currentlyPlayingSongNumber
+           currentSoundFile.play();
            updateSeekBarWhileSongPlays();
            $(this).html(pauseButtonTemplate); //adds Pause button to indicate new song is playing.
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            
            var $volumeFill = $('.volume .fill'); // when starting a song for the first time, sets a volume
            var $volumeThumb = $('.volume .thumb');
            $volumeFill.width(currentVolume + '%');
            $volumeThumb.css({left: currentVolume + '%'});

            updatePlayerBarSong();
            //if a song that's playing is clicked on again
        } else if (currentlyPlayingSongNumber === songNumber) {
            // if the song was paused, start playing again
            if (currentSoundFile.isPaused()) { //isPaused is a buzz library method
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);//might have to be updated
                currentSoundFile.play();
                updateSeekBarWhileSongPlays();
            } else {
            //If the music was playing, pause it
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton); // might have to be updated
                currentSoundFile.pause(); //.pause is a buzz library method   
            }
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number')); //traverse and find song number

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

    $row.find(".song-item-number").click(clickHandler); // finds element (that has the song number) and adds an event listener

    $row.hover(onHover, offHover);

    return $row;
};

var setCurrentAlbum = function(album) { // album is an object with many properties

    currentAlbum = album;

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo =$('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    //uses the properties from album object to generate appropriate html for a given album 
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    $albumSongList.empty; // be sure no songs are currently in the element

    // goes through all the songs from the specified album object. Insert them into the HTML, one by one.
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);        
    }
};

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        //timeupdate is a custom Buzz event that fires repeatedly while time elapses during song playback
        currentSoundFile.bind('timeupdate', function(event) {
        // We use Buzz's getTime()  to get the current time of the song and 
        // getDuration() method for getting the total length of the song. Both values return time in seconds.
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
 
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }// if currentSoundFile exists
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;

    offsetXPercent = Math.max(0, offsetXPercent); // make sure offsetXPercent isn't less than zero 
    offsetXPercent = Math.min(100, offsetXPercent);  //make  our percentage isn't greater than 100 

    var percentageString = offsetXPercent + '%'; // converts percentage to string to use css
    
    $seekBar.find('.fill').width(percentageString); //fills bar with background appropriately
    $seekBar.find('.thumb').css({left: percentageString}); // moves the thumb to porportion
};

var setupSeekBars = function() {
    
    //selects both seek bars
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) { // respond to clicking on a seekbar
        // subtracting $(this).offset().left from the event.pageX value gives us a proportion of the seek bar
        var offsetX = event.pageX - $(this).offset().left;  
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }

    updateSeekPercentage($(this), seekBarFillRatio); // pass $(this) and seekBarFillRatio to update the bar percentage().
    });
    
    $seekBars.find('.thumb').mousedown(function(event) { // place the white ball on a specific location on the seek bar when user press down and drags

        var $seekBar = $(this).parent();  // selects the seekbar that the mousedown event fired on
        
        // we want to be able to move around the entire document to choose a certain song duration
        $(document).bind('mousemove.thumb', function(event){     
        //bind allows us to namespace event listeners.
        //jQuery event namespaces are offset with a period and followed by a string.
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());   
            } else {
                setVolume(seekBarFillRatio);
            }
 
        updateSeekPercentage($seekBar, seekBarFillRatio);
        });
 
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};

//helper function to get a songs position in the songs array
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

// used for player bar
var nextSong = function() {
    
    //returns the song number: 1,2,3 etc. after we pass in song array number[] 
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    //return (array) index position of current song
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Assigns a new current song number
    setSong(currentSongIndex + 1);
    
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber); // needs better name.  This is the curernt cell after clicking the button
        
    //update html element (td song number) after choosing new song
    $nextSongNumberCell.html(pauseButtonTemplate); // this is the currently playing song
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {

    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song. assigns value to currentlyPlayingSongNumber and currentSoundFile.  Sets volume level
    setSong(currentSongIndex + 1);
    
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell =getSongNumberCell(lastSongNumber );
    
    $previousSongNumberCell.html(pauseButtonTemplate); // this is the currently playing song's cell
    $lastSongNumberCell.html(lastSongNumber);  
};





$(document).ready(function() {
    setCurrentAlbum(albumName);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
