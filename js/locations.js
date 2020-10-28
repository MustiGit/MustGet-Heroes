let Locations = {

    currentLocation: function () {

        switch (player.currentLoc) {
            case "mistyForest":
                var x1 = 548;
                var y1 = 444;
                break;
            case "cityDusthollow":
                var x1 = 604;
                var y1 = 367;
                break;
            case "seasideMtn":
                var x1 = 446;
                var y1 = 392;
                break;
            case "cityGreenportWharf":
                var x1 = 663;
                var y1 = 516;
                break;
            case "citySaltstoneHarbor":
                var x1 = 294;
                var y1 = 341;
                break;
        }
        // Return as array
        return [x1, y1];
    },

    targetLocation: function (loc) {

        switch (loc) {
            case "mistyForest":
                var x2 = 548;
                var y2 = 444;
                break;
            case "cityDusthollow":
                var x2 = 604;
                var y2 = 367;
                break;
            case "seasideMtn":
                var x2 = 446;
                var y2 = 392;
                break;
            case "cityGreenportWharf":
                var x2 = 663;
                var y2 = 516;
                break;
            case "citySaltstoneHarbor":
                var x2 = 294;
                var y2 = 341;
                break;
        }
        // Return as array
        return [x2, y2];
    },

    travelTime: function (loc) {

        this.currentLocation();
        this.targetLocation(loc);

        // Get current location
        getCurrentLoc = Locations.currentLocation();
        const x1 = getCurrentLoc[0],
            y1 = getCurrentLoc[1];

        // Get target location
        getTargetLoc = Locations.targetLocation();
        const x2 = getTargetLoc[0],
            y2 = getTargetLoc[1];

        var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

        var travelTime = Math.round(dist / 50);

        player.currentHour += travelTime;
        if (player.currentHour >= 24) {
            player.currentHour = (player.currentHour - 24);
            player.currentDay += 1;
        }
    },

    /* 
    /// FUNCTION TO USE FOR NEW AREAS, DO NOT DELETE! Takes eventType expression from function to use in switch to select, which type of event is requested.
    
    placenameHere: function (eventType) {
    
    switch (eventType) {
    
        case "camp":
    
        break;
    
        case "explore":
    
        break;
    
        case "load":
    
        break;
    
        case "retreat":
    
        break;
    
        case "travel":
           
        break;
    }
    }
    */

    cityDusthollow: function (eventType) {

        // Get header to change description later
        let getHeader = document.querySelector(".header");

        // Get Messages to change them later
        let getMessages = document.querySelector(".messages");
        let getMessages2 = document.querySelector(".messages2");

        // Get townTitle and image to change them later with description
      //  let getTownTitle = document.querySelector(".townTitle");
        let getTownImage = document.querySelector(".townImage");

        // Get enemy info to change them later
        let getEnemy = document.querySelector(".enemy");
        let getEnemyHP = document.querySelector(".enemyProgress");
        let getEnemyHPBar = document.getElementById('enemyBar');

        //let getArena = document.querySelector(".arena");
        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerHP = document.querySelector(".playerProgress");
        let getPlayerHPBar = document.getElementById('playerBar');
        let getInterface = document.querySelector(".interface");
        let getScoreScreen = document.querySelector(".scoreScreen");
        let getLvlUpScreen = document.querySelector(".lvlUpScreen");

        document.getElementById("scoreBTN").disabled = false;

        switch (eventType) {

            case "camp":

                // Heal player to full hp and update stats + HPBar
                player.health = player.maxhp;
                getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
                getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";

                // Tell player, that he's healed up
                getMessages.innerHTML = ('You camped for couple hours and feel much better!');

                break;

            case "explore":

                getMessages.innerHTML = (" ");
                getMessages2.innerHTML = (" ");

                // Randomly pick number for Dusthollow selection
                let chooseRandomCityDusthollow = Math.floor(Math.random() * Math.floor(1));

                // Use switch to choose random Dusthollow function
                switch (chooseRandomCityDusthollow) {
                    case 0:
                        cityDusthollow01();
                        break;
                    /*case 1:
                        cityDusthollow02();
                        break;
                    case 2:
                        cityDusthollow03();
                        break;
                    case 3:
                        cityDusthollow04();
                        break;
                    case 4:
                        cityDusthollow05();
                        break;*/
                }

                function cityDusthollow01() {

                    // Update current location
                    player.currentLoc = "cityDusthollow";

                    // Make sure that retreat button shows proper value.
                    document.getElementById('retreatBTN').innerHTML = '<img class="BTNimage" src="pics/retreattr.png" alt="retreattr">' + 'Retreat';

                    // Hide unwanted buttons/titles and show attack/retreat buttons
                    exploreBTN.style.visibility = "hidden";
                    attackBTN.style.visibility = "visible";
                    retreatBTN.style.visibility = "visible";
                    saveBTN.style.visibility = "hidden";
                    restartBTN.style.visibility = "hidden";
                    healBTN.style.visibility = "hidden";
                    campBTN.style.visibility = "hidden";
                    scoreBTN.style.visibility = "hidden";
                 //   getTownTitle.style.visibility = "hidden";
                    getTownImage.style.visibility = "hidden";
                    mapBTN.style.display = "none";

                    // If player is mage, show firebolt button
                    if (player.classType == "Mage") {
                        fireboltBTN.style.display = "flex";
                        fireboltBTN.style.visibility = "visible"
                    }

                    // Clear messages
                   getMessages.innerHTML = "";

                    // Create enemy
                    CreateEnemy.createEnemyNormal();

                    // Update header description and enemy info
                    //getHeader.innerHTML = '<p>As you explore surroundings of Dusthollow Town, you encounter an enemy! Choose your move!</p>';
                    getHeader.innerHTML = '<p>Surrounding area of Dusthollow Town</p>';
                    getEnemy.innerHTML = '<img src ="pics/monsters/' +
                        enemy.enemyType.toLowerCase() + '.png" alt="' + enemy.enemyType + '"class="img-avatar"><div><h3>'
                        + enemy.enemyType + '</h3><p class="health-enemy">Health: ' + enemy.health + '</p><p><Mana: '
                        + enemy.mana + '</p><p>Strength: ' + enemy.strength + '</p><p>Agility: '
                        + enemy.agility + '</p><p>Speed: ' + enemy.speed + '</p></div>';

                    // Set enemyHPbar visible and reset health
                    getEnemyHP.style.visibility = "visible";
                    getEnemyHPBar.style.width = (100) + "%";

                    // Get enemyType and give message, that opponent is charging towards player. ********* RANDOM MESSAGES LATER? ********
                    getMessages2.innerHTML = ("");
                    getMessages.innerHTML = (enemy.enemyType + " notices you and charges towards you!");
                }
                function cityDusthollow02() {

                }
                function cityDusthollow03() {

                }
                function cityDusthollow04() {

                }
                function cityDusthollow05() {

                }

                break;

            case "load":

                getTownImage.src = "pics/dusthollow.jpg";
             //   getTownTitle.innerHTML = "Dusthollow Town";

                exploreBTN.style.visibility = "visible";

                getHeader.style.visibility = "visible";
                scoreBTN.style.visibility = "visible";
                getPlayerHP.style.visibility = "visible";
                getPlayerHPBar.style.visibility = "visible";
               // getArena.style.visibility = "visible";
                getScoreScreen.style.display = "none";
                getInterface.style.visibility = "visible";

                // Hide unwanted attack/retreat buttons and show restart/save/explore/heal buttons.
                restartBTN.style.visibility = "visible";
                exploreBTN.style.visibility = "visible";
                saveBTN.style.visibility = "visible";
                healBTN.style.visibility = "visible";
                healBTN.style.display = "flex";
                campBTN.style.visibility = "visible";
                scoreBTN.style.display = "flex";
                saveBTN.style.display = "flex";
                restartBTN.style.display = "flex";
                scoreBTN.style.visibility = "visible";
                attackBTN.style.visibility = "hidden";
                retreatBTN.style.visibility = "hidden";

                mapBTN.style.display = "flex";

                if (player.classType == "Mage") {
                    fireboltBTN.style.display = "none"
                }

                // Update description, add restart/save buttons and clear messages/enemy info.
                getHeader.innerHTML = '<p>Gates of Dusthollow Town.</p>';
                getMessages.innerHTML = ("");
                getMessages2.innerHTML = ("");
                getEnemy.innerHTML = "";
                getEnemyHPBar.style.width = (100) + "%";
                getEnemyHP.style.visibility = "hidden";
            //    getTownTitle.style.visibility = "visible";
                getTownImage.style.visibility = "visible";

                // Update score amount
                Rewards.killRewardScore();

                // Update current location
                player.currentLoc = "cityDusthollow";

                if (player.playerLvlUp > 0) {

                    // Get interface, arena, player HPBar and lvlUpscreen to change visibility later
                    let getInterface = document.querySelector(".interface");
                    let getLvlUpScreen = document.querySelector(".lvlUpScreen");

                    // Hide unwanted stuff from screen
                    getInterface.style.visibility = "hidden";
                    getHeader.style.visibility = "hidden";
                    //getArena.style.visibility = "hidden";
                    exploreBTN.style.visibility = "hidden";
                    healBTN.style.visibility = "hidden";
                    campBTN.style.visibility = "hidden";
                    scoreBTN.style.visibility = "hidden";
                    getPlayerHP.style.visibility = "hidden";
                    saveBTN.style.visibility = "hidden";
                    restartBTN.style.visibility = "hidden";
                    getEnemyHP.style.visibility = "hidden";
                //    getTownTitle.style.visibility = "hidden";
                    getTownImage.style.visibility = "hidden";

                    // Show lvl up screen
                    getLvlUpScreen.style.display = "flex";
                }

                break;

            case "retreat":

                getMessages.innerHTML = (" ");
                getMessages2.innerHTML = (" ");
                
                // TÄSSÄ VOISI TEHDÄ RANDOMROLLIN MAHDOLLISESTA RETREAT EVENTEISTÄ JA JOKO PÄÄSTÄÄ PELAAJA KARKUUN NÄTISTI, TAI TEHDÄ JOTAIN MUUTA JÄYNÄÄ
                // Randomly pick number for CityDusthollowRetreat selection.
                let chooseRandomCityDusthollowRetreat = Math.floor(Math.random() * Math.floor(1));

                // Use switch to choose random DusthollowRetreat function
                switch (chooseRandomCityDusthollowRetreat) {
                    case 0:
                        

                        Locations.cityDusthollow("load");

                        // Update score amount and save the game
                        Rewards.killRewardScore();

                        GameManager.setSave();

                        break;




                    /*case 1:
                        cityDusthollowRetreat01();
                        break;
                    */
                }

                break;

            case "travel":

                getTownImage.src = "pics/dusthollow.jpg";
            //    getTownTitle.innerHTML = "Dusthollow Town";

                getHeader.innerHTML = '<p> Gates of the Dusthollow Town.</p>';

                getHeader.style.visibility = "visible";

                getPlayerHP.style.visibility = "visible";
                getPlayerHPBar.style.visibility = "visible";
               /// getArena.style.visibility = "visible";
                getInterface.style.visibility = "visible";

                // Show restart, save, heal, score and map buttons
                restartBTN.style.visibility = "visible";
                restartBTN.style.display = "flex";
                saveBTN.style.visibility = "visible";
                saveBTN.style.display = "flex";
                healBTN.style.visibility = "visible";
                healBTN.style.display = "flex";
                campBTN.style.visibility = "visible";
                scoreBTN.style.visibility = "visible";
                scoreBTN.style.display = "flex";
                mapBTN.style.display = "flex";

                getEnemyHP.style.visibility = "hidden";
               // getTownTitle.style.visibility = "visible";
                getTownImage.style.visibility = "visible";

                if (player.classType == "Mage") {
                    fireboltBTN.style.display = "none"
                }

                // Update current location
                player.currentLoc = "cityDusthollow";

                // Update description, add restart/save buttons and clear messages/enemy info.
                getMessages.innerHTML = ("");
                getMessages2.innerHTML = ("");
                getEnemy.innerHTML = "";
                getEnemyHPBar.style.width = (100) + "%";

                // Update score amount
                Rewards.killRewardScore();

                if (player.playerLvlUp > 0) {

                    // Hide unwanted stuff from screen
                    getInterface.style.visibility = "hidden";
                    getHeader.style.visibility = "hidden";
                  //  getArena.style.visibility = "hidden";
                    exploreBTN.style.visibility = "hidden";
                    healBTN.style.visibility = "hidden";
                    campBTN.style.visibility = "hidden";
                    scoreBTN.style.visibility = "hidden";
                    getPlayerHP.style.visibility = "hidden";
                    saveBTN.style.visibility = "hidden";
                    restartBTN.style.visibility = "hidden";
                    getEnemyHP.style.visibility = "hidden";
                    getTownTitle.style.visibility = "hidden";
                    getTownImage.style.visibility = "hidden";

                    // Show lvl up screen
                    getLvlUpScreen.style.display = "flex";
                }

                break;
        }
    },

    mistyForest: function (eventType) {

        // Get messages and townTitle to change later
        let getMessages = document.querySelector(".messages");
        let getMessages2 = document.querySelector(".messages2");
     //   let getTownTitle = document.querySelector(".townTitle");
        let getTownImage = document.querySelector(".townImage");

        // Get header to change description
        let getHeader = document.querySelector(".header");

        // Get enemyinfo to change them later
        let getEnemy = document.querySelector(".enemy");
        let getEnemyHP = document.querySelector(".enemyProgress");
        let getEnemyHPBar = document.getElementById('enemyBar');

        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerHP = document.querySelector(".playerProgress");
        let getPlayerHPBar = document.getElementById('playerBar');

       // let getArena = document.querySelector(".arena");
        let getInterface = document.querySelector(".interface");

        switch (eventType) {

            case "camp":

                getMessages.innerHTML = (" ");
                getMessages2.innerHTML = (" ");

                // Heal player to full hp and update stats + HPBar
                player.health = player.maxhp;
                getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
                getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";

                // Tell player, that he's healed up
                getMessages.innerHTML = ('You camped for couple hours and feel much better!');

                break;

            case "explore":

                getMessages.innerHTML = (" ");
                getMessages2.innerHTML = (" ");

                // Randomly pick number for MistyForest selection
                let chooseRandomMistyForest = Math.floor(Math.random() * Math.floor(1));

                // Use switch to choose random MistyForest function
                switch (chooseRandomMistyForest) {
                    case 0:
                        mistyForest01();
                        break;
                    /*case 1:
                        mistyForest02();
                        break;
                    case 2:
                        mistyForest03();
                        break;
                    case 3:
                        mistyForest04();
                        break;
                    case 4:
                        mistyForest05();
                        break;*/
                }

                function mistyForest01() {

                    // Update current location
                    player.currentLoc = "mistyForest";

                    // Make sure that retreat button shows proper value.
                    document.getElementById('retreatBTN').innerHTML = '<img class="BTNimage" src="pics/retreattr.png" alt="retreattr">' + 'Retreat';

                    // Hide unwanted buttons/titles and show attack/retreat buttons
                    exploreBTN.style.visibility = "hidden";
                    saveBTN.style.visibility = "hidden";
                    restartBTN.style.visibility = "hidden";
                    healBTN.style.visibility = "hidden";
                    campBTN.style.visibility = "hidden";
                    scoreBTN.style.visibility = "hidden";
               //     getTownTitle.style.visibility = "hidden";
                    getTownImage.style.visibility = "hidden";
                    mapBTN.style.display = "none";
                    attackBTN.style.visibility = "visible";
                    retreatBTN.style.visibility = "visible";

                    // If player is mage, show firebolt button
                    if (player.classType == "Mage") {
                        fireboltBTN.style.display = "flex";
                        fireboltBTN.style.visibility = "visible"
                    }

                    // Create enemy
                    CreateEnemy.createEnemyNormal();

                    // Update header description and enemy info
                    getHeader.innerHTML = '<p>As you explore the Misty Forest, you encounter an enemy! Choose your move!</p>';
                    getEnemy.innerHTML = '<img src ="pics/monsters/' +
                        enemy.enemyType.toLowerCase() + '.png" alt="' + enemy.enemyType + '"class="img-avatar"><div><h3>'
                        + enemy.enemyType + '</h3><p class="health-enemy">Health: ' + enemy.health + '</p><p><Mana: '
                        + enemy.mana + '</p><p>Strength: ' + enemy.strength + '</p><p>Agility: '
                        + enemy.agility + '</p><p>Speed: ' + enemy.speed + '</p></div>';

                    // Set enemyHPbar visible and reset health
                    getEnemyHP.style.visibility = "visible";
                    getEnemyHPBar.style.width = (100) + "%";

                    // Get enemyType and give message, that opponent is charging towards player. ********* RANDOM MESSAGES LATER? ********
                    getMessages2.innerHTML = ("");
                    getMessages.innerHTML = (enemy.enemyType + " notices you and charges towards you!");
                }
                function mistyForest02() {

                }
                function mistyForest03() {

                }
                function mistyForest04() {

                }
                function mistyForest05() {

                }

                break;


            case "load":

                // Change image and description
                getTownImage.src = "pics/mistyforest.jpg";
               // getTownTitle.innerHTML = "Misty Forest";

                // Update description
                //getHeader.innerHTML = '<p> You are standing at the entrance of the Misty Forest. Dare to enter?</p>';
                getHeader.innerHTML = '<p>Misty Forest</p>';
                exploreBTN.style.visibility = "visible";

                mapBTN.style.display = "flex";
                getTownImage.style.visibility = "visible";
              // getTownTitle.style.visibility = "visible";

                getHeader.style.visibility = "visible";
                getPlayerHP.style.visibility = "visible";
                getPlayerHPBar.style.visibility = "visible";
               // getArena.style.visibility = "visible";
                getInterface.style.visibility = "visible";
                attackBTN.style.visibility = "hidden";
                retreatBTN.style.visibility = "hidden";
                exploreBTN.style.visibility = "visible";
                campBTN.style.visibility = "visible";

                getMessages.innerHTML = ("");
                getMessages2.innerHTML = ("");

                getEnemy.innerHTML = "";
                getEnemyHPBar.style.width = (100) + "%";
                getEnemyHP.style.visibility = "hidden";

                if (player.classType == "Mage") {
                    fireboltBTN.style.display = "none"
                }

                break;

            case "retreat":

                getMessages.innerHTML = (" ");
                getMessages2.innerHTML = (" ");
                // Set location
                player.currentLoc = "mistyForest";

                GameManager.setSave();

                // Randomly pick number for MistyForestRetreat selection.
                let chooseRandomMistyForestRetreat = Math.floor(Math.random() * Math.floor(1));

                // Use switch to choose random MistyForestRetreat function
                switch (chooseRandomMistyForestRetreat) {

                    case 0:
                        // Update description, normal entrance and nothing special happened
                        Locations.mistyForest("load");

                        break;

                    // TÄSSÄ VOISI TEHDÄ RANDOMROLLIN MAHDOLLISESTA RETREAT EVENTEISTÄ JA JOKO PÄÄSTÄÄ PELAAJA KARKUUN NÄTISTI, TAI TEHDÄ JOTAIN MUUTA JÄYNÄÄ
                    /*case 1:
                        mistyForestRetreat01();
                        break;
                    */
                }

            case "travel":

                // Update current location
                player.currentLoc = "mistyForest";


                randomNumber = Math.random() * 100;
                if (randomNumber <= 40) { // 0-40 = 40% chance

                    // Update description, nothing special happened
                    Locations.mistyForest("load");
                }
                else {  // 41-100 = 60% chance

                    // Randomly pick number for MistyForestTravel selection.
                    let chooseRandomMistyForestTravel = Math.floor(Math.random() * Math.floor(1));

                    // Use switch to choose random MistyForestTravel function
                    switch (chooseRandomMistyForestTravel) {

                        case 0:

                            Locations.mistyForest("explore");

                            break;

                        // TÄSSÄ VOISI TEHDÄ RANDOMROLLIN MAHDOLLISESTA TRAVEL EVENTEISTÄ JA JOKO PÄÄSTÄÄ PELAAJA MATKUSTAMAAN NÄTISTI, TAI TEHDÄ JOTAIN MUUTA JÄYNÄÄ
                        /*case 1:
                           
    
                        */
                    }
                }
        }
    }
}


