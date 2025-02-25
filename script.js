class PomodoroTimer {
    constructor(timerId, autostart = false) {
        // Cache DOM elements.
        this.container = document.getElementById(timerId);
        this.minutesDisplay = this.container.querySelector('.minutes');
        this.secondsDisplay = this.container.querySelector('.seconds');
        this.startButton = this.container.querySelector('.start');
        this.resetButton = this.container.querySelector('.reset');
        this.modeToggle = this.container.querySelector('.mode-toggle');
        this.statusText = this.container.querySelector('.status-text');

        // Define mode durations in seconds.
        this.modes = {
            work: 55 * 60,     // 55 minutes
            exercise: 3 * 60,  // 3 minutes
        };

        // Initial state.
        this.mode = 'work';  // can be 'work' or 'exercise'
        this.timeRemaining = this.modes[this.mode];
        this.isRunning = false;
        this.intervalId = null;

        // Attach event listeners.
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.modeToggle.addEventListener('click', () => this.toggleMode());

        // Set initial display.
        this.updateUI();

        // Optional autostart.
        if (autostart) {
            this.startTimer();
        }
    }

    toggleMode() {
        // Switch mode.
        this.mode = (this.mode === 'work') ? 'exercise' : 'work';
        this.timeRemaining = this.modes[this.mode];

        // Update UI.
        this.updateUI();
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startButton.textContent = 'Pause';

        this.intervalId = setInterval(() => {
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
                this.updateDisplay();
            } else {
                // When time is up, switch to the other mode.
                this.toggleMode();
            }
        }, 1000);
    }

    pauseTimer() {
        this.isRunning = false;
        this.startButton.textContent = 'Start';
        clearInterval(this.intervalId);
    }

    resetTimer() {
        // Stop the timer and reset timeRemaining to the current mode's duration.
        this.pauseTimer();
        this.timeRemaining = this.modes[this.mode];
        this.updateDisplay();
    }

    updateUI() {
        // Update the display for time.
        this.updateDisplay();

        // Update the button text, status, and classes based on the current mode.
        if (this.mode === 'work') {
            this.modeToggle.textContent = 'Exercise Mode';
            this.statusText.textContent = 'Work Time';
            this.modeToggle.className = 'mode-toggle work-mode';
        } else {
            this.modeToggle.textContent = 'Work Mode';
            this.statusText.textContent = 'Exercise Time';
            this.modeToggle.className = 'mode-toggle exercise-mode';
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.minutesDisplay.textContent = String(minutes).padStart(2, '0');
        this.secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }
}

// Initialize the timer
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer('timer1', false);
});
