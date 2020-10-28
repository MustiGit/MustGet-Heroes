let player;

function Player(name, playerLvl, playerLvlUp, classType, health, mana, strength, agility, speed, maxhp, currentLoc, playerInv, playerGold, playerExp, playerScore, isDead, currentHour, currentDay, killedGoblin, killedTroll, killedSpider, killedWerewolf, killedMorko) {
    this.name = name;
    this.playerLvl = playerLvl;
    this.playerLvlUp = playerLvlUp;
    this.classType = classType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.maxhp = maxhp;
    this.currentLoc = currentLoc;
    this.playerInv = playerInv;
    this.playerGold = playerGold;
    this.playerExp = playerExp;
    this.playerScore = playerScore;
    this.isDead = isDead;
    this.currentHour = currentHour;
    this.currentDay = currentDay;
    this.killedGoblin = killedGoblin;
    this.killedTroll = killedTroll;
    this.killedSpider = killedSpider;
    this.killedWerewolf = killedWerewolf;
    this.killedMorko = killedMorko;
}

let PlayerMoves = {
    calcAttack: function (atk) {

        /******DIFFERENT KIND OF ATTACKS ************/

        // Player attacks NORMAL
        let playerNormalAttack = function () {

            let calcBaseDamage;
            if (player.mana > 0) {
                calcBaseDamage = player.strength * player.mana / 1000;
            } else {
                calcBaseDamage = player.strength * player.agility / 1000;
            }
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = Math.round(calcBaseDamage + offsetDamage);
            // Number of hits per attack
            let numberOfHits = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1;
            let attackValues = [calcOutputDamage, numberOfHits];

            return attackValues;
        }

        // Player attacks - mage - FIREBOLT
        let playerMageFirebolt = function () {

            let calcBaseDamage;
           
            calcBaseDamage = player.strength * player.mana / 100;
           
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = Math.round(calcBaseDamage + offsetDamage);
            // Number of hits per attack
            let numberOfHits = 1;
            let attackValues = [calcOutputDamage, numberOfHits];

            return attackValues;
        }

        // Enemy attacks
        let enemyAttack = function () {
            let calcBaseDamage;
            if (enemy.mana > 0) {
                calcBaseDamage = enemy.strength * enemy.mana / 1000;
            } else {
                calcBaseDamage = enemy.strength * enemy.agility / 1000;
            }
            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = Math.round(calcBaseDamage + offsetDamage);

            // Number of hits per attack
            let numberOfHits = Math.floor(Math.random() * Math.floor(enemy.agility / 10) / 2) + 1;
            let attackValues = [calcOutputDamage, numberOfHits];

            return attackValues;
        }

        //**************************************** */

        // Who attacks first?
        let getPlayerSpeed = player.speed;
        let getEnemySpeed = enemy.speed;

        // Get player/enemy health to change later
        let getPlayerHealth = document.querySelector(".health-player");
        let getEnemyHealth = document.querySelector(".health-enemy");

        // Get player/enemy HPBars to update later
        let getPlayerHPBar = document.getElementById('playerBar');
        let getEnemyHPBar = document.getElementById('enemyBar');

        // Get player's gold and exp amount to update later
        let getPlayerGold = document.querySelector(".gold-player");
        let getPlayerExp = document.querySelector(".exp-player");

        // Get Messages/header to change later
        let getMessages = document.querySelector(".messages");
        let getMessages2 = document.querySelector(".messages2");
        let getHeader = document.querySelector(".header");

        //Get rewards to update later
        let rewardGold;
        let rewardExp;
        let rewardScore;

        // Set playerAttackValues to be used in switch
        let playerAttackValues = [];

        // Different attack modes TO BE EXPDANDED, allows many different attack types through switch & using HTML buttons
        switch (atk) {
            case "normalAttack":
                playerAttackValues = playerNormalAttack();
                break;

            case "mageFirebolt":
                playerAttackValues = playerMageFirebolt();
                break;
        }

        //Initiate attacks!
        if (getPlayerSpeed >= getEnemySpeed) {
            
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];

            getMessages2.innerHTML = (" ");

            enemy.health = enemy.health - totalDamage;

            if (enemy.health <= 0) {
                getEnemyHPBar.style.width = 0 + "%";
                getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
                getEnemyHealth.innerHTML = 'Health: 0';

                if (enemy.enemyType == "Goblin") {
                    player.killedGoblin++;
                } else if (enemy.enemyType == "Troll") {
                    player.killedTroll++;
                } else if (enemy.enemyType == "Spider") {
                    player.killedSpider++;
                } else if (enemy.enemyType == "Werewolf") {
                    player.killedWerewolf++;
                } else if (enemy.enemyType == "Morko") {
                    player.killedMorko++;
                }

                // Update gold amount
                rewardGold = Rewards.killRewardGold();
                player.playerGold += rewardGold;
                getPlayerGold.innerHTML = 'Gold: ' + player.playerGold;

                // Update exp amount
                rewardExp = Rewards.killRewardExp();
                player.playerExp += rewardExp;

                // Check for possible level ups and update experience
                PlayerLevels.calcExperience();

                // Check for loot and add it to player inventory
                player.playerInv.push(Rewards.rewardLoot("kill"));

                getMessages2.innerHTML = ("");
                getMessages.innerHTML = ("You hit enemy lethally for " + totalDamage + " damage! (" + playerAttackValues[0] + "*" + playerAttackValues[1] + ")\nYou win! Want to explore further?");

                attackBTN.style.visibility = "hidden";

                if (player.classType == "Mage") {
                    fireboltBTN.style.visibility = "hidden";
                }

                exploreBTN.style.visibility = "visible";

                // Change retreatBTN to "Back to town"
                document.getElementById('retreatBTN').innerHTML = '<img class="BTNimage" src="pics/retreattr.png" alt="retreattr">' + 'Find the way out';

            } else {
                // Update remaining health
                getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
                getEnemyHPBar.style.width = ((enemy.health / enemy.maxhp) * 100) + "%";

                getMessages.innerHTML = ("You hit enemy for " + totalDamage + " damage! (" + playerAttackValues[0] + "*" + playerAttackValues[1] + ")");

                // Disable attack / retreat buttons for timeout period
                attackBTN.disabled = "true";

                if (player.classType == "Mage") {
                    fireboltBTN.disabled = "true";
                }

                retreatBTN.disabled = "true";
                
                setTimeout(function () {

                    // Enemy attacks
                    let enemyAttackValues = enemyAttack();
                    totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

                    // Calculate remaining health
                    player.health = player.health - totalDamage;

                    if (player.health <= 0) {
                        getPlayerHPBar.style.width = 0 + "%";
                        getPlayerHealth.innerHTML = 'Health 0' + ' / ' + player.maxhp;
                        getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
                        getMessages.innerHTML = ("Enemy hits you lethally for " + totalDamage + " damage! (" + enemyAttackValues[0] + "*" + enemyAttackValues[1] + ")\nYou died! Restart game to try again.");
                        getMessages2.innerHTML = ("You killed " + player.killedSpider + " spiders, " + player.killedGoblin + " goblins, " + player.killedTroll + " trolls, " + player.killedWerewolf + " werewolves and " + player.killedMorko + " morkos on your journeys! You also gathered " + player.playerGold + "gp! Well done!");


                        // Set dead status and save
                        player.isDead = 1;
                        GameManager.setSave();

                        attackBTN.style.visibility = "hidden";

                        if (player.classType == "Mage") {
                            fireboltBTN.style.visibility = "hidden";
                        }

                        retreatBTN.style.visibility = "hidden";

                        getHeader.innerHTML = '<p> Choose your move!</p><button class="button" id="restartBTN" onclick="location.reload()">Restart game</button><button class="button" id="scoreBTN" onclick="GameManager.setScore()">Show scores</button>';

                        restartBTN.style.visibility = "visible";
                        scoreBTN.style.visibility = "visible";
                        scoreRestartBTN.style.visibility = "visible";

                        // ************ LOAD BUTTON HERE? NÁAH, IT'S ROGUELIKE!

                    } else {
                        // Update remaining health
                        getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
                        getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";
                        getMessages2.innerHTML = ("Enemy hits you for " + totalDamage + " damage! (" + enemyAttackValues[0] + "*" + enemyAttackValues[1] + ")");
                    }

                    // Re-enable attack / retreat buttons
                    document.getElementById('attackBTN').disabled = false;
                    document.getElementById('retreatBTN').disabled = false;
                    document.getElementById('fireboltBTN').disabled = false;
                }, 1000);
            }
            // If enemy is faster
        } else if (getEnemySpeed >= getPlayerSpeed) {
            let enemyAttackValues = enemyAttack();
            let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

            getMessages2.innerHTML = (" ");

            player.health = player.health - totalDamage;

            if (player.health <= 0) {

                getPlayerHPBar.style.width = 0 + "%";
                getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
                getPlayerHealth.innerHTML = 'Health: 0' + ' / ' + player.maxhp;

                getMessages2.innerHTML = ("You killed " + player.killedSpider + " spiders, " + player.killedGoblin + " goblins, " + player.killedTroll + " trolls, " + player.killedWerewolf + " werewolves and " + player.killedMorko + " morkos on your journeys! You also gathered " + player.playerGold + "gp! Well done!");
                getMessages.innerHTML = ("Enemy is faster and hits you lethally for " + totalDamage + " damage! (" + enemyAttackValues[0] + "*" + enemyAttackValues[1] + ")\nYou died! Restart to try again.");
                attackBTN.style.visibility = "hidden";

                // Set dead status and save
                player.isDead = 1;
                GameManager.setSave();

                if (player.classType == "Mage") {
                    fireboltBTN.style.visibility = "hidden";
                }

                retreatBTN.style.visibility = "hidden";

                getHeader.innerHTML = '<p> Choose your move!</p><button class="button" id="restartBTN" onclick="location.reload()">Restart game</button><button class="button" id="scoreBTN" onclick="GameManager.setScore()">Show scores</button>';

                restartBTN.style.visibility = "visible";
                scoreBTN.style.visibility = "visible";
                scoreRestartBTN.style.visibility = "visible";

            } else {
                // Update remaining health
                getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;
                getPlayerHPBar.style.width = ((player.health / player.maxhp) * 100) + "%";

                getMessages.innerHTML = ("Enemy is faster and hits you for " + totalDamage + " damage! (" + enemyAttackValues[0] + "*" + enemyAttackValues[1] + ")");

                attackBTN.disabled = "true";

                if (player.classType == "Mage") {
                    fireboltBTN.disabled = "true";
                }

                retreatBTN.disabled = "true";

                setTimeout(function () {

                    // Player attacks

                    totalDamage = playerAttackValues[0] * playerAttackValues[1];
                    enemy.health = enemy.health - totalDamage;

                    if (enemy.health <= 0) {

                        getEnemyHPBar.style.width = 0 + "%";
                        getEnemyHealth.innerHTML = 'Health 0';
                        getPlayerHealth.innerHTML = 'Health: ' + player.health + ' / ' + player.maxhp;

                        if (enemy.enemyType == "Goblin") {
                            player.killedGoblin++;
                        } else if (enemy.enemyType == "Troll") {
                            player.killedTroll++;
                        } else if (enemy.enemyType == "Spider") {
                            player.killedSpider++;
                        } else if (enemy.enemyType == "Werewolf") {
                            player.killedWerewolf++;
                        } else if (enemy.enemyType == "Morko") {
                            player.killedMorko++;
                        }

                        // Update gold amount
                        rewardGold = Rewards.killRewardGold();
                        player.playerGold += rewardGold;
                        getPlayerGold.innerHTML = 'Gold: ' + player.playerGold;

                        // Update exp amount
                        rewardExp = Rewards.killRewardExp();
                        player.playerExp += rewardExp;

                        // Check for possible level ups and update experience
                        PlayerLevels.calcExperience();

                        // Check for loot and add it to player inventory
                        player.playerInv.push(Rewards.rewardLoot("kill"));

                        getMessages.innerHTML = ("");
                        getMessages2.innerHTML = ("You hit enemy lethally for " + totalDamage + " damage! (" + playerAttackValues[0] + "*" + playerAttackValues[1] + ")\nYou win! Want to explore further?");

                        exploreBTN.style.visibility = "visible";
                        attackBTN.style.visibility = "hidden";

                        if (player.classType == "Mage") {
                            fireboltBTN.style.visibility = "hidden";
                        }
                        // Change retreatBTN to "Find the way out"
                        document.getElementById('retreatBTN').innerHTML = '<img class="BTNimage" src="pics/retreattr.png" alt="retreattr">' + 'Find the way out';
                        

                    } else {
                        getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
                        getEnemyHPBar.style.width = ((enemy.health / enemy.maxhp) * 100) + "%";

                        getMessages2.innerHTML = ("You hit enemy for " + totalDamage + " damage! (" + playerAttackValues[0] + "*" + playerAttackValues[1] + ")");
                    }

                    // Re-enable attack / retreat buttons
                    document.getElementById('attackBTN').disabled = false;
                    document.getElementById('fireboltBTN').disabled = false;
                    document.getElementById('retreatBTN').disabled = false;

                }, 1000);
            }
        }
    }
}




