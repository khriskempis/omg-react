# OMG Documentation 

## User Stories
On initial page load: 
- See a welcome screen w/ a start button
- Start a game as a host to invite people or join a lobby and wait for available players
- Take a tutorial and get an explanation to learn about the game. 

While playing: 
- Options to view my hand and my current set of buildings built as well as a overview of my opponents town
- Scroll through my hand and have a clear view of Card information. 
- Be able to see how much money and vp I have at any given moment
- A menu selection to view items such as view settings and an option to quit a game. 
- View the marketplace and the resources that are populated. 
- Clear input from the server through a message box guiding me about my next turn and the available options that I have at any given phase
- Should have a clear indication of what phase I am currently on
- Be able to view the players who have gone and those who have yet to take a turn.
- Should be clear when I am about to submit a decision and a prompt asking if I am sure
- Should be able to view the buildings I have built along with information pertaining to a building such as how many goods, what the total amount is, if there is a worker or assistant on. 
- Buildings with workers or assistance should be obvious and clear. 
- Should be able to view the assistants available during a game at any time. 
- Clear messages on whether anything that I am doing is not allowed or is an illegal move such as submitting the wrong resources or placing a worker on a building that already has an assistant on it, or trying to move an assistant without first paying the fee. 
- Should be clear when I am able to buy a building or worker.
- Be able to play online with live players



## Overview

## Game Class Objects
Game Object
- End game logic
    - Check when a player has 8 buildings, trigger end game
- Track player order
    - Manage turn order and determine 1st player
- Track which phase of each round
    - Keep track of all Player data
    - Money, score, buildings in town, where worker/assistant is
- Server will be source of truth.
    - game object will be stored on server to manage online games

Player Object
- Store hand object
    - Can view their hand and submit cards to play
- Has list of buildings in a town 
    - Can view their buildings 
- Can place a worker efficiently or inefficiently on a building

Deck Object
- Store Card Objects as an array
- Track length of deck
    -If deck is past a certain length, shuffle in the discard pile to the bottom of deck
- Store discard pile 
- Deal cards from deck
- Shuffle cards

Marketplace
- Store both sunrise and sunset resources
- Only read sun and resource values 
- Discard marketplace cards

Hand Object
- Length of hand
- remove (play) card, add card
- Display all info except for sun data

Town Object
- Length of town
- Total money
- Total VP
- Add building objects

Building Object
- Built from Card data
- Track total goods on building
- Display if has worker/assistant
- Determine if a building produced based on available resources from either hand or marketplace
- Determine ability to chain after a bulidng successfully produces

Good Object
- Keep reference to orginal card id
- Rebuilt as a card when discarded
- Good Object will be determined by building it is currently on








## Data Structures
> **Player Example**
```
“Players” : {
	“id” : “1”,
	“userName” : 'KhrisMan',
	“money” : 12,
	“vp” : 6, 
	“assistants” : [
        { Assistant }
    ],
	“hand” : [
        { Card }
    ],
	“town” : [
        { Building }
    ],
	“isFirstPlayer” : true,
}
```
> **Card Example**
```
“Card” : {
	“id” : 23,
	“name” : “Brick Manufacturer,
	“germanName” : “Ziegelei”,
	“cost” : 2,
	“vp” : 2,
	“img” : “url”
	“hasSun” : false,
	“color” : “red”
	“resource” : { 
        “name” : “clay”,
		“type” : “resource” 
    },
	“requiredResources” : [
        "requiredResource":{
            "hay" : 3,
            "clay" : null,
            "lumber" : null,
            "stone" : null,
            "wool" : 1
        },
	“produce” : { 
        “name” : “brick”,
        “type” : “produce” 
    },
	“value” : 2,
	“chain” : [
		{ 
            “name” : “clay”,
            “type” : “resource” 
            "count" : 1
        },
        { 
            “name” : “coal”,
            “type” : “produce” 
            "count" : 1
        }
	],
}
```
>**Good**
```
“Good” : {
	“id” : card.id,
	“name” : “coal”,
	“type : “produce”,
    "color" : "black
	“value” : 1
}
```
>**Building**
```
“Building” : {
	“id” : card.id,
	“color” : “yellow”,
	“name” : “Shoemaker”,
    “germanName” : “Schusterwerkstatt”,
    “img” : “url”
    “requiredResources” : [
        { 
            “resource” : “hay”, 
            “count” : 4 
        },
        { 
            “resource” : “clay”,
            “count” : 2
        ]
    ],
    “produce” : [
        { Good }
    ],
    “value” : 8,
    “chain” : [
        { Good }
    ]
}
```

