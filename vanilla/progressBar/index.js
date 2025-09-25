(function () {
  const progressBar = document.getElementById('progress-bar');
  const progress = document.getElementById('progress');

  const progressText = document.createElement('p');
  progressText.id = 'progress-text';
  progressBar.appendChild(progressText);

  let intervalId;
  let currentProgress = 0;

  const getRandomValue = (baseValue = 0) => {
    return Math.ceil(Math.random() * baseValue);
  };

  // updates progress bar UI to indicate current fill value
  const updateProgressBar = () => {
    progress.style.flexBasis = `${currentProgress}%`;
    progressText.textContent = `${currentProgress}%`;
  };

  // updates progress of the bar till progress isn't 100%
  const updateProgress = () => {
    if (currentProgress >= 100) {
      clearInterval(intervalId);
      return;
    }
    currentProgress = Math.min(100, currentProgress + getRandomValue(25));
    updateProgressBar();
  };

  intervalId = setInterval(updateProgress, 1000 + getRandomValue(1000))
})();