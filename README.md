wanna [![Build Status](https://travis-ci.org/mkermani144/wanna.svg?branch=master)](https://travis-ci.org/mkermani144/wanna)
====


**_Latest (6 Oct 2016) app status in a thousand of words:_** :sunglasses::sunglasses:

![alt img](current.gif)


Description
----
Wanna is an alternative to the boring traditional to-do list apps.
It makes you highly flexible, help you manage your time, suggest suitable tasks to do based on your mood, and more.

I hope you enjoy it. Just wait until beta release.


Installation and usage
----
The desktop version of the project is under development at this time and there is no release of the app yet. Everyone can, however, clone the project to see what's going on in the project:
```
git clone https://github.com/mkermani144/wanna.git
```
In order to start the app, you should have `electron` installed on your platform. Then you can easily start the app:
```
cd wanna/desktop
npm install
electron .
```
__Note: The app probably has a mobile version, but it is not ready yet and it's development is not started. My focus is on desktop version at this time.__


Ideas and features to-do
----
Ideas and features to be developed (sorted based on importance):
####Before [beta release](https://github.com/mkermani144/wanna/milestone/1):
- [X] Priorities
- [X] Time consumption estimation
- [X] Sidenav
- [ ] Recurring tasks
- [ ] Idea bank
- [ ] One-day tasks
- [ ] App icon
- [ ] Help pages

####After beta release:
- [ ] Flexible
- [ ] Timer
- [ ] Moods
- [ ] Job type
- [ ] Daily treshold
- [ ] Time consumption AI
- [ ] Day of thing
- [ ] Projects

Known bugs
----
- There are some problems in running the app in Ubuntu 16.04 because of lack of support in one of the project dependency packages(`node-sass` package). That problem will probably be resolved in future versions of `node-sass`; in addition, the project may leave using `node-sass` and [use an alternative](https://github.com/mkermani144/wanna/issues/27).
