const AudioButtons = ({ isAudioOn, toggleAudio }) => {
    return (
      <div>
        {isAudioOn ? (
          <button type="button" onClick={toggleAudio}>
            <img
              src="images/audio-on.png"
              alt="audio off button"
              className="h-10 w-10 rounded-full fixed top-0 right-0 mt-5 lg:mt-2 mr-4 md:h-20 md:w-20 border-2 border-pink-500 border-solid"
            />
          </button>
        ) : (
          <button type="button" onClick={toggleAudio}>
            <img
              src="images/audio-off.png"
              alt="audio on button"
              className={`h-10 w-10 rounded-full fixed top-0 right-0 mt-5 lg:mt-2 mr-4 md:h-20 md:w-20 border-2 border-pink-500 border-inset opacity-60 ${
                isAudioOn ? 'hidden' : '' // Hide audio-off image when audio is on
              }`}
            />
          </button>
        )}
      </div>
    );
  };
  
  export default AudioButtons;
  
