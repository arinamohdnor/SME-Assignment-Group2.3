
![Main](https://github.com/arinamohdnor/SME-Assignment-Group2.3/workflows/Main%20Branch/badge.svg)
![Pull Requests](https://github.com/arinamohdnor/SME-Assignment-Group2.3/workflows/Pull%20Requests/badge.svg)

# SME-Assignment-Group2.3

Installation tutorial:

1. Make sure npm and node.js is installed in your device.
2. Clone this git. 
 ``` git clone https://github.com/arinamohdnor/SME-Assignment-Group2.3/```
3. Open terminal and direct to project directory.
4. Run 'npm install -g @ionic/cli' to install ionic commands. (if u haven't installed it) 
5. Run 'npm install --save' to install dependencies.
6. If counter any error, run 'npm install firebase @angular/fire --save'
7. Run 'ionic serve' and head to localhost.

Running this app on emulator (local)

*Steps may vary depending on user

1. Download and install Android Studio (https://developer.android.com/studio).
2. Open terminal.
3. Install cordova via ```npm install -g cordova```.
4. Direct to project directory.
5. Run ```ionic cordova emulate android```.
6. You'll most likely encounter one of these error, and here are the solutions:

- Something about JAVA_HOME not being set, or you have JDK 15 instead of JDK 8 (install JDK 8 if you haven't): https://stackoverflow.com/a/63152392
- Gradle not installed, or missing path: https://stackoverflow.com/a/43692039
- Android SDK licenses issue: https://stackoverflow.com/a/57554165

7. Repeat step 5-6 until an error regarding come up 'no emulators available'. This means all the necessary build errors are out of the way.
8. Open Android Studio, run the emulator (create new empty project if needed).
9. Run ```ionic cordova emulate android``` for the last time.
10. You're done and the application should be on the emulator!
