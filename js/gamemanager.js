let GameManager = {

    // Login screen
    setLogin: function () {
        let getSelectInterface = document.querySelector(".charSelectionInterface");
        let getLoad = document.querySelector(".load");
        let getUserNameArea = document.querySelector(".userNameArea");
        let user = document.getElementById("username").value;

        let getTop = document.querySelector(".top");

        getTop.style.display = "flex";
        
        // If user has given any name
        if (user.length > 0) {

            // Update myUsername with given username
            var myUsername = document.getElementById("username").value;
            //var myPassword = document.getElementById("password").value;

            getUserNameArea.style.display = "none";

            // Check from database, if there's save game available with given username and alive character.
            return axios.get("http://localhost:3000/save", {
                params: {
                    name: myUsername,
                   // password: myPassword,
                    isDead: 0
                }
            })  // If save is found, show load and delete buttons
                .then(response => {
                    //if ((response.data.name == myUsername) && (response.data.password == myPassword)) {
                    if (response.data.name == myUsername) {

                        getLoad.style.display = "flex";
                        deleteBTN.style.visibility = "visible";
                        console.log("Save was found by given username/password:")
                        console.log(response.data)

                        // +++LOAD SCREEN?
                    }
                })
                .catch(error => {
                    console.log(error);
                    // Hide login screen and show interface/header (character selection screen)
                    getSelectInterface.style.visibility = "visible";
                    getSelectInterface.style.display = "flex";
                });
        }
    },

    // Async function. Depending on player's choise, sets up game with new character or old save.
    setGameStart: async function (classType) {

        // get player HPBar to change later
        let getPlayerHPBar = document.getElementById('playerBar');
        
        let getSelectInterface = document.querySelector(".charSelectionInterface");
        getSelectInterface.style.display = "none";
        

        // Switch to update player info with chosen class or load game info
        switch (classType) {
            case "Warrior":
                player = new Player(document.getElementById("username").value, 1, 0, classType, 200, 0, 200, 100, 50, 200, "cityDusthollow", [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                break;

            case "Rogue":
                player = new Player(document.getElementById("username").value, 1, 0, classType, 100, 0, 100, 150, 200, 100, "cityDusthollow", [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                break;

            case "Mage":
                player = new Player(document.getElementById("username").value, 1, 0, classType, 80, 200, 50, 50, 50, 80, "cityDusthollow", [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                break;

            case "Hunter":
                player = new Player(document.getElementById("username").value, 1, 0, classType, 200, 0, 50, 200, 100, 200, "cityDusthollow", [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                break;

            case "Load":

                // Set current username to myUsername variable
                var myUsername = document.getElementById("username").value;

                // Function that gets saved game from the database and sets up player object with according stats.
                function getMySave() {

                    // Request save from database, using current username as search parameter
                    return axios.get("http://localhost:3000/save", {
                        params: {
                            name: myUsername
                        }
                    })
                        .then(response => {
                            console.log("Game successfully loaded.")
                            return response.data
                        })
                        .catch(error => {
                            console.log(error);
                            return Promise.reject(error);
                        });
                }
                const waitIgetMySave = async () => {
                    const playerSave = await getMySave();
                    return playerSave;
                };
                // Await for call and then set response.data to playerSave
                playerSave = await waitIgetMySave();

                // Set username as name and stats from playerSave for new player object to use in this session.
                player = new Player(myUsername, playerSave.playerLvl, playerSave.playerLvlUp, playerSave.class, playerSave.health, playerSave.mana, playerSave.strength, playerSave.agility, playerSave.speed, playerSave.maxhp, playerSave.currentLoc, playerSave.playerInv, playerSave.playerGold, playerSave.playerExp, playerSave.playerScore, playerSave.isDead, playerSave.currentHour, playerSave.currentDay, playerSave.killedGoblin, playerSave.killedTroll, playerSave.killedSpider, playerSave.killedWerewolf, playerSave.killedMorko);
                classType = playerSave.class;

                break;
        }
        // getInterface to change later
        let getInterface = document.querySelector(".interface");

        let getBottom = document.querySelector(".bottom");

        let getTownWindow = document.querySelector(".townWindow");

        let getCharSelectionWrapper = document.querySelector(".charSelectionWrapper");

        getCharSelectionWrapper.style.display = "none";

        getInterface.style.visibility = "visible";
        getInterface.style.display = "flex";

        getBottom.style.visibility = "visible";
        getBottom.style.display = "flex";

        getTownWindow.style.display = "flex";

        // Update interface with player info
        /*getInterface.innerHTML = '<img src="pics/heroes/' + classType.toLowerCase() +
            '.png" class="img-avatar"><div><h3 class ="classLvl-player">' + classType + ', Level: ' + player.playerLvl + '</h3><p class="health-player">Health: ' + player.health + ' / ' + player.maxhp +
            '</p><p class="mana-player">Mana: ' + player.mana + '</p><p class="strength-player">Strength: ' + player.strength + '</p><p class="agility-player">Agility: ' +
            player.agility + '</p><p class="speed-player">Speed: ' + player.speed + '</p><p class="gold-player">Gold: ' + player.playerGold + '</p><p class="exp-player">Exp: ' + player.playerExp + '</p>';*/

            /*getInterface.innerHTML = '<img src="pics/heroes/' + classType.toLowerCase() +
            '.png" class="img-avatar"><div><h3 class ="classLvl-player">' + classType + ', Level: ' + player.playerLvl + '</h3><p class="health-player">Health: ' + player.health + ' / ' + player.maxhp +
            '</p><p class="mana-player">Mana: ' + player.mana + '</p><p class="gold-player">Gold: ' + player.playerGold + '</p><p class="exp-player">Exp: ' + player.playerExp + '</p>';*/

            getInterface.innerHTML = '<img src="pics/heroes/' + classType.toLowerCase() +
            '.png" class="img-avatar"><div><h3 class ="classLvl-player">' + classType + ', Level: ' + player.playerLvl + '</h3><p class="health-player">Health: ' + player.health + ' / ' + player.maxhp +
            '</p><p class="mana-player">Mana: ' + player.mana + '</p><p class="gold-player">Gold: ' + player.playerGold + '</p><p class="exp-player">Exp: ' + player.playerExp + '</p>';
        
        // Check experience for possible lvlUps
        PlayerLevels.calcExperience();

        getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";

        console.log(player)

        enemy = new Enemy("Placeholder", 0, 0, 0, 0, 0, 0);

        // Change properties of explore button for new area
        document.getElementById('exploreBTN').setAttribute('onclick', 'Locations.' + player.currentLoc + '("explore")')
        // Change properties of retreat button for new area
        document.getElementById('retreatBTN').setAttribute('onclick', 'Locations.' + player.currentLoc + '("retreat")')

        // Call load function based on current location to start game
        currentLocation = player.currentLoc;
        // Access the Locations property
        const fn = Locations[currentLocation];
        // Invoke the function
        fn(`load`);
    },

    setSave: function () {
        // Get messages to change later
        let getMessages = document.querySelector(".messages");

        // If player is dead:
        if (player.isDead == 1) {

            // Make save variable with dead player stats and add (dead) to name, which all will be sent into the database
            var save = {
                name: player.name + ' (dead)', playerLvl: player.playerLvl, playerLvlUp: player.playerLvlUp, class: player.classType, health: player.health, mana: player.mana, strength: player.strength, agility: player.agility, speed: player.speed, currentLoc: player.currentLoc, playerInv: player.playerInv, maxhp: player.maxhp, currentHour: player.currentHour, currentDay: player.currentDay, playerGold: player.playerGold, playerExp: player.playerExp, playerScore: player.playerScore, isDead: player.isDead, killedBy: enemy.enemyType, killedGoblin: player.killedGoblin, killedTroll: player.killedTroll, killedSpider: player.killedSpider, killedWerewolf: player.killedWerewolf, killedMorko: player.killedMorko
            }

            GameManager.setDelete();

            // POST new save with Axios.
            axios.post('http://localhost:3000/save/', save)
                .then(function (response) {
                    console.log(response.data)
                    console.log("Response = ", response.status)
                })
                .catch(function (error) {
                    console.log(error.response)
                });
        } else {

            // Make save variable with player stats, which will be sent into the database
            var save = {
                name: player.name, playerLvl: player.playerLvl, playerLvlUp: player.playerLvlUp, class: player.classType, health: player.health, mana: player.mana, strength: player.strength, agility: player.agility, speed: player.speed, maxhp: player.maxhp, currentHour: player.currentHour, currentDay: player.currentDay, currentLoc: player.currentLoc, playerInv: player.playerInv, playerGold: player.playerGold, playerExp: player.playerExp, playerScore: player.playerScore, isDead: player.isDead, killedGoblin: player.killedGoblin, killedTroll: player.killedTroll, killedSpider: player.killedSpider, killedWerewolf: player.killedWerewolf, killedMorko: player.killedMorko
            }

            // Check from database, if there's save game available with given username and alive character.
            return axios.get("http://localhost:3000/save", {
                params: {
                    name: player.name,
                    isDead: 0
                }
            })  // If save is found
                .then(response => {
                    // If username already existed, use PUT to update)
                    axios.put('http://localhost:3000/save/' + player.name, save)
                        .then(function (response) {

                            console.log(response.data)

                            // If player is alive when saving, tell that game is saved
                            if (player.isDead = 0) {
                                getMessages.innerHTML = ("Game saved!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error.response)
                        });
                })
                .catch(error => {
                    console.log(error);
                    // POST new save with Axios.
                    axios.post('http://localhost:3000/save/', save)
                        .then(function (response) {
                            console.log(response.data)
                            console.log("Response = ", response.status)
                        })
                        .catch(function (error) {
                            console.log(error.response)
                        });
                });
        }
    },

    setHeal: function (healType) {
        // Get messages to change later
        let getMessages = document.querySelector(".messages");

        // Get player health and hpbar to change later
        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerHPBar = document.getElementById('playerBar');

        // Get player's gold amount to update later
        let getPlayerGold = document.querySelector(".gold-player");

        switch (healType) {
            case "priest":

                if (player.playerGold > 0) {
                    // After clicking heal button, hide heal button
                    healBTN.style.visibility = "hidden";

                    // Heal player to full hp and update stats + HPBar
                    player.health = player.maxhp;
                    getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
                    getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";

                    //Update gold amount
                    player.playerGold--;
                    getPlayerGold.innerHTML = 'Gold: ' + player.playerGold;

                    // Tell player, that he's healed up
                    getMessages.innerHTML = ('Priest heals you, turns around and flips the coin up in the air while yelling: "Nuns! More wine I say!"');
                } else {
                    getMessages.innerHTML = ("There's no charity in this church! Begone!");
                }

                break;
            case "camp":

                player.currentHour += 2;
                if (player.currentHour >= 24) {
                    player.currentHour = (player.currentHour - 24);
                    player.currentDay += 1;
                }

                const campFunction = Locations[currentLocation];
                campFunction(`camp`);

                break;
        }
    },

    setDelete: function () {
        // DELETE THE SAVE FROM DB:

        let getSelectInterface = document.querySelector(".charSelectionInterface");
        let getLoad = document.querySelector(".load");

        // Update myUsername with given username
        var myUsername = document.getElementById("username").value;

        axios.delete('http://localhost:3000/save/' + myUsername)
            .then(function (response) {
                console.log(response.data)
                console.log("Response = ", response.status)

                getLoad.style.display = "none";
                deleteBTN.style.display = "none";
            })
            .catch(function (error) {
                console.log("error in deleting save", error)
            });

        // Bring back the interface
        getSelectInterface.style.visibility = "visible";
        getSelectInterface.style.display = "flex";
    },

    setLvlUp: function (stat) {

        let getInterface = document.querySelector(".interface");
        //let getArena = document.querySelector(".arena");
        let getLvlUpScreen = document.querySelector(".lvlUpScreen");
        let getHeader = document.querySelector(".header");
       // let getTownTitle = document.querySelector(".townTitle");
        let getTownImage = document.querySelector(".townImage");
        

        let getPlayerHP = document.querySelector(".playerProgress");
        let getPlayerHPBar = document.getElementById('playerBar');

        // Get enemy info to change them later
        let getEnemy = document.querySelector(".enemy");
        let getEnemyHP = document.querySelector(".enemyProgress");
        let getEnemyHPBar = document.getElementById('enemyBar');


        // Switch to update player info with chosen class or load game info
        switch (stat) {
            case "maxHP":
                player.maxhp += 10;
                break;

            case "Str":
                player.strength += 5;
                break;

            case "Man":
                player.mana += 5;
                break;

            case "Agi":
                player.agility += 5;
                break;

            case "Spd":
                player.speed += 5;
                break;
        }

        // Hide LvlUpScreen
        getLvlUpScreen.style.display = "none";

        // Hide enemy info
        getEnemy.innerHTML = "";
        getEnemyHPBar.style.width = (100) + "%";
        getEnemyHP.style.visibility = "hidden";

        // Show normal town view with buttons again
        getInterface.style.visibility = "visible";
       // getArena.style.visibility = "visible";
        exploreBTN.style.visibility = "visible";
        healBTN.style.visibility = "visible";
        getPlayerHP.style.visibility = "visible";
        getHeader.style.visibility = "visible";
        saveBTN.style.visibility = "visible";
        restartBTN.style.visibility = "visible";
        scoreBTN.style.visibility = "visible";
       // getTownTitle.style.visibility = "visible";
        getTownImage.style.visibility = "visible";

        // Update interface with new stats
        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerStrength = document.querySelector(".strength-player");
        let getPlayerMana = document.querySelector(".mana-player");
        let getPlayerAgility = document.querySelector(".agility-player");
        let getPlayerSpeed = document.querySelector(".speed-player");

        player.playerLvlUp--;

        getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
        getPlayerStrength.innerHTML = 'Strength: ' + player.strength;
        getPlayerMana.innerHTML = 'Mana: ' + player.mana;
        getPlayerAgility.innerHTML = 'Agility: ' + player.agility;
        getPlayerSpeed.innerHTML = 'Speed: ' + player.speed;
        getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";
    },

    setScore: function () {

        // Get ScoreScreen and set display to flex
        let getScoreScreen = document.querySelector(".scoreScreen");
        getScoreScreen.style.display = "flex";

        // If player is dead, don't show OK button at bottom of ScoreScreen (so only option is to restart)
        if (player.isDead == 1) {
            scoreOK.style.visibility = "hidden";
        }

        // Set column titles
        col = ["Name", "Lvl", "Class", "Score", "Killed by"];

        // Get save data
        axios.get('http://localhost:3000/saves')
            .then(function (response) {
                // Save data from database is stored into mySaves variable
                mySaves = response.data

                // CREATE A TABLE.
                var table = document.getElementById("scoreTable");
                table.setAttribute('name', 'playerTable');     // SET TABLE ID.

                // Insert row (header)
                var tr = table.insertRow(-1)

                // Add Table headers
                col.forEach(function (val) {
                    var th = document.createElement('th')
                    th.innerHTML = val
                    tr.appendChild(th)
                })

                // Go through mySaves and add data to table
                mySaves.forEach(function (mySave, index) {
                    tr = table.insertRow(-1);

                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = mySave["name"]

                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = mySave["playerLvl"]

                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = mySave["class"]

                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = mySave["playerScore"]

                    tabCell = tr.insertCell(-1);
                    // If savedata is from dead player, show killedBy information
                    if (mySave.isDead == 1) {
                        tabCell.innerHTML = mySave["killedBy"] // + " in " + mySave["currentLoc"]
                        // Otherwise show empty cell
                    } else {
                        tabCell.innerHTML = "";
                    }
                });
            })
            .catch(function (error) {
                console.log("error in fetching the save", error)
            });
    },
    
    setCanvas: function () {

        // Get interface, arena, player HPBar and lvlUpscreen to change visibility later
        let getInterface = document.querySelector(".interface");
        let getCanvas = document.querySelector(".canvas");

        //let getArena = document.querySelector(".arena");
        let getPlayerHP = document.querySelector(".playerProgress");
        let getHeader = document.querySelector(".header");
        let getPlayerHPBar = document.getElementById('playerBar');
        //let getTownTitle = document.querySelector(".townTitle");
        let getTownImage = document.querySelector(".townImage");

        // Get enemy info to change them later
        let getEnemy = document.querySelector(".enemy");
        let getEnemyHP = document.querySelector(".enemyProgress");
        let getEnemyHPBar = document.getElementById('enemyBar');

        // Hide unwanted stuff from screen
        getInterface.style.display = "none";
        //getHeader.style.visibility = "hidden";
       // getArena.style.display = "none";
        exploreBTN.style.display = "none";
        healBTN.style.display = "none";
        scoreBTN.style.display = "none";
        getPlayerHP.style.display = "none";
        getPlayerHPBar.style.display = "none";
        saveBTN.style.display = "none";
        restartBTN.style.display = "none";
        //getTownTitle.style.display = "none";
        getTownImage.style.display = "none";

        // Hide enemy info
        getEnemy.innerHTML = "";
        getEnemyHPBar.style.width = (100) + "%";
        getEnemyHP.style.display = "none";

        getCanvas.style.display = "visible";

        /* // Näinkin se toimii
                var middleColumn = document.getElementById("colMiddle");
        
                middleColumn.style.display = "none";
                */

        var canvas = document.querySelector('canvas');

        var c = canvas.getContext('2d');

        //canvas.width = window.innerWidth;
        //canvas.heigth = window.innerHeight;

        //c.fillRect(x, y, width, height);
        //c.fillRect(20, 20, 50, 50);

        // Add background image
        var forestbg = new Image();
        forestbg.src = "pics/forestbg.png";

        // Make sure the image is loaded first otherwise nothing will draw.
        forestbg.onload = function () {
            c.drawImage(forestbg, 0, 0, canvas.width, canvas.height);
        }

        make_hero();

        function make_hero() {
            hero = new Image();
            hero.src = 'pics/heroes/warrior_small.png';

            hero.onload = function () {
                c.drawImage(hero, 30, 80); // , hero.width *0.2, hero.height * 0.2
            }
        }

        make_enemy();

        function make_enemy() {
            enemy = new Image();
            enemy.src = 'pics/monsters/goblin_small.png';

            enemy.onload = function () {
                c.drawImage(enemy, 230, 80); // , enemy.width *0.2, enemy.height * 0.2
            }
        }

        /*
        // Calculates distance between two items
        function getDistance (x1, y1, x2, y2) {
            let xDistance = x2 - x1;
            let yDistance = y2 - y1;

            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
        }

        console.log("distance = " + getDistance(hero.x, hero.y, enemy.x, enemy.y))
        */

    },

    setMap: function () {

        // ANIMATE MOVING THROUGH MAP WITH TRANSITION: /////////////////////

        // Get current location
        getCurrentLoc = Locations.currentLocation();
        const x1 = getCurrentLoc[0],
            y1 = getCurrentLoc[1];

        // Get element travelTransit
        let elem = document.getElementById("travelTransit");

        elem.style.backgroundImage = 'url("/pics/heroes/' + player.classType.toLowerCase() + '_small.png")';

        // Change transitionproperty and duration to none, so transition doesnt start until current location is set
        elem.style.transitionProperty = "none";
        elem.style.WebkitTransitionProperty = "none";
        elem.style.transitionDuration = "none";
        elem.style.WebkitTransitionDuration = "none";

        // Set starting point of transition to current location coordinates (-offset)
        elem.style.top = (y1 - 25) + 'px';
        elem.style.left = (x1 - 25) + 'px';

        // Force DOM to recalculate itself, as it doesnt do it normally when changing properties
        let x = elem.offsetLeft;

        /////////////////////// End of transition continues in GameManager.setTravel()

        // Get map container and show it
        let getMap = document.querySelector(".mapContainer");
        getMap.style.display = "flex";

        GameManager.setDisableButtons("true");

    },

    // Function that is used in imageMap, when choosing travel location
    setTravel: function (loc) {

        // If traveltarget is different than current location of player
        if (player.currentLoc != loc) {

            scoreBTN.style.display = "none";
            saveBTN.style.display = "none";
            restartBTN.style.display = "none";
            healBTN.style.display = "none";

            let getMap = document.querySelector(".mapContainer");
            getMap.style.pointerEvents = "none";

            // Get target location
            getTargetLoc = Locations.targetLocation(loc);
            const x2 = getTargetLoc[0],
                y2 = getTargetLoc[1];

            /////////////Transition anim continues, starts from GameManager.setMap()//////////

            // Get element travelTransit
            let elem = document.getElementById("travelTransit");

            // Change transitionProperty and duration back to active state
            elem.style.transitionProperty = "top,left";
            elem.style.WebkitTransitionProperty = "top,left";
            elem.style.transitionDuration = "2s";
            elem.style.WebkitTransitionDuration = "2s";

            // Set target location's coordinates (-offset), which also now starts animation
            elem.style.top = (y2 - 25) + 'px';
            elem.style.left = (x2 - 25) + 'px';

            ///////////////////////////Transition anim ends////////////////////////////

            // Delay map hiding for 2500ms so player has time to see transition
            setTimeout(function () {
                // Hide map
                let getMap = document.querySelector('.mapContainer');
                getMap.style.display = 'none';

                // Change properties of explore button for new area, loc = target area
                document.getElementById('exploreBTN').setAttribute('onclick', 'Locations.' + loc + '("explore")')
                // Change properties of retreat button for new area, loc = target area
                document.getElementById('retreatBTN').setAttribute('onclick', 'Locations.' + loc + '("retreat")')

                // Call travelTime function to calculate traveltime and add time into clock
                Locations.travelTime(loc);

                //************* RANDOMGEN EVENTS HERE OR INSIDE SWITCH? (what happened during travel) */
                switch (loc) {
                    case "mistyForest":

                        // Call for Location.mistyForestEntrance() to show player entrance view of Misty Forest.
                        Locations.mistyForest("travel");

                        break;

                    case "seasideMtn":

                        // Create enemy
                        CreateEnemy.createEnemyNormal();

                        break;

                    case "cityDusthollow":

                        Locations.cityDusthollow("travel")

                        break;
                }

                GameManager.setDisableButtons("false");

                getMap.style.pointerEvents = "auto";
            }, 2800);
        }
    },

    setDisableButtons: function (set) {
        switch (set) {

            case "true":
                // Disable buttons for transition period
                document.getElementById("scoreBTN").disabled = true;
                document.getElementById("restartBTN").disabled = true;
                document.getElementById("saveBTN").disabled = true;
                document.getElementById("campBTN").disabled = true;
                document.getElementById("healBTN").disabled = true;
                document.getElementById("mapBTN").disabled = true;

                // Make buttons greyed out for transition period
                restartBTN.style.opacity = "0.5";
                scoreBTN.style.opacity = "0.5";
                saveBTN.style.opacity = "0.5";
                campBTN.style.opacity = "0.5";
                healBTN.style.opacity = "0.5";
                mapBTN.style.opacity = "0.5";

                break;

            case "false":

                // Now that transition is over, make buttons clickable again
                document.getElementById("scoreBTN").disabled = false;
                document.getElementById("restartBTN").disabled = false;
                document.getElementById("saveBTN").disabled = false;
                document.getElementById("campBTN").disabled = false;
                document.getElementById("healBTN").disabled = false;
                document.getElementById("mapBTN").disabled = false;

                // Set opacity back to normal
                restartBTN.style.opacity = "1";
                scoreBTN.style.opacity = "1";
                saveBTN.style.opacity = "1";
                campBTN.style.opacity = "1";
                healBTN.style.opacity = "1";
                mapBTN.style.opacity = "1";

                break;
        }
    },

    setPlayerInventory: function () {

        let getPlayerInvScreen = document.querySelector(".playerInvScreen");
        getPlayerInvScreen.style.display = "flex";

        const draggables = document.querySelectorAll('.draggable')
        const containers = document.querySelectorAll('.invContainer')

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging')
            })

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging')
            })
        })

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
                const afterElement = getDragAfterElement(container, e.clientY)
                const draggable = document.querySelector('.dragging')
                if (afterElement == null) {
                    container.appendChild(draggable)
                } else {
                    container.insertBefore(draggable, afterElement)
                }
            })
        })

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = y - box.top - box.height / 2
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }
    }
}
