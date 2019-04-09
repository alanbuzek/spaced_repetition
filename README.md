# Spaced repetition

An algorithm responsible for deciding intervals for flashcard revision, inspired by the original spacedRepetion algorithm. Currently used at masterlingoapp.com.

## Usage

```js
let quality; // A number between 0 and 5 that indicate the quality of review. 0 is the worse while 5 is the best.
let lastSchedule; // The duration of last review space.
let lastFactor; // The factor that was used to caculate last schedule.
let repetition; // The total number of past repetition of the card, gets reset to 0 if quality under 3
let result = spacedRepetion(quality, lastSchedule, lastFactor, repetition);
```

The output will be:

```js
{
schedule: Number, // The next review space.
factor: Number, // The factor that should be use in the next round of caculation.
isRepeatAgain: Boolean // If is true, should review the item again until the quality is not less than 4.,
repetition: Number // The total number of past repetition of the card, gets reset to 0 if quality under 3
}
```
