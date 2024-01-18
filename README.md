# Stackup Invaders Bounty

Live Preview - [stackup-invaders.netlify.app](https://stackup-invaders.netlify.app)

I made four improvements to the initial application which can be put into four groups:

- UI Improvements
- UX Improvements
- Bug Fixes
- Feature Addition

## Tool

I have used [Alpine Js](https://alpinejs.dev/) throughout the application.

This is because working with vanilla js can get very complex even for very minor features. Also, updating the application with a new framework like React is also not feasible without rebuilding the application from scratch.

Alpine Js is an extremely lightweight library which I can use alongside the initial application without breaking anything while also adding interactivity and state very easily

```html
<button
        x-cloak
      x-show="!user"

      @click="
        loadingUser = true
        try {
          await connectPassport()
          user = window.userProfile
        }
        catch(err){
          console.log(err)
        }
        finally {
          loadingUser = false
        }
				">
....
```

Above shows how I added the functionality to the connect wallet button while also ensuring it only shows when a user is not connected.

## UI Improvements

I improved the user interface in the following ways

1. I added 'space-y' background which was more in-line with the theme of the game
2. I improved the onboarding process by putting the connect button in a more standard position and adding the loading feedback when the user is signing in
3. I improved the look of all the buttons in the game

## UX Improvements

I made the experience playing the game even better in the following ways

1. I added sounds for every activity that happens in the game. As this is standard expectation in [fixed shooter games](https://en.wikipedia.org/wiki/Category:Fixed_shooters).
The main sounds category are:

- **Fail Sound**. When the user is defeated. Found in [/sounds/fail.wav](/sounds/fail.wav)
- **Shotting Sound**. There two shooter sounds. One for the player ([/sounds/shoot2.wav](/sounds/shoot2.wav)) on the other for the invaders
([/sounds/shoot.wav](/sounds/shoot.wav)) .
- **In Game Sound**. This is the continuous sound that plays as the game is being played. Found in [/sounds/in-game.wav](/sounds/in-game.wav) .
- **Upgrade Sound**. This is the sound that plays whenever the player levels up (gets a chance the mint a new NFT). As there are three possible NFTs to win, there are three upgrade sounds: [/sounds/upgrade1.wav](/sounds/upgrade1.wav),

[/sounds/upgrade2.wav](/sounds/upgrade2.wav),

[/sounds/upgrade3.wav](/sounds/upgrade3.wav)

- **Start Up Sound**. This is sound that plays when the game begins. Found in [/sounds/start.wav](/sounds/start.wav) .

2. I added a start button which is click to restart the game when it ends. This makes it clearer what to do to restart the game.

3. I added feedback when minting an NFT. This way, the user knows an activity is in progress. In the initial application, there's no feedback and the user could even click it a lot of times.

## Bug Fix

In the original application, the `claim` button which was used to `mint` a new NFT did not work.

The method which was recommended by the immutable team only worked in a node environment and could only work in the browser if used with a build step (like in a framework like NextJs). This was not an option since I couldn't rewrite the entire application for that singular reason.

After going through the immutable contracts source code (`@imtbl/contracts` which we had used in a node environment). I found that we used class called `ERC721Client` was just a wrapper around the `ethers` contract factory. It implemented some new helpful methods like `populateMint` and `populateMintBatch` which was used a mint NFTs. But this had not special code that call the `mint` function of the `ethers` contract factory

```javascript
async populateMint(to, tokenId, overrides = {}) {
        return await this.contract.populateTransaction.mint(to, tokenId, { ...overrides_1.defaultGasOverrides, ...overrides });
    }
```

Above is what the definition of the `populateMint` function is where `this` in that case is simple the `ethers` contract factory.

I simply replaced the `populateMint` method with `populateTransaction.mint` and used the default `ethers.Contract` factory which I had access via the `ethers` esm package imported in the browser.

The entire code is found in the `mintNft` function in  [/assets/js/login.js](/assets/js/login.js)

## Feature Addition

I added three new features to the game play:

1. I added a third NFT minting step which signified the last level. Also, I deployed new contracts with new images.

2. I added a new spaceship look and bullet at the third upgrade level. Where spaceship shoots three bullets rather than two.

3. I added an global high score. For every user that beats this high score, the user's address and the new high score is saved to a Redis database via a serverless function on vercel.
Save and Load Score Code found [Here](https://github.com/Complexlity/immutable-game/blob/main/src/pages/api/scoring.js)

## Getting Started

To test this application locally, run the following commands on the terminal

- Clone the repository

```bash
git clone https://github.com/Complexlity/stackup-invaders
cd stackup-invaders
```

- Open the `index.html` file in the browser!. No more installations needed
