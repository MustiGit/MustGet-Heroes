let Rewards = {

    // Function to calculate gold reward from kill, based on enemyType
    killRewardGold: function () {

        var min = 0;
        var max = 0;

        if (enemy.enemyType == "Goblin") {
            min = 1;
            max = 3;

        } else if (enemy.enemyType == "Troll") {
            min = 2;
            max = 4;
        } else if (enemy.enemyType == "Spider") {
            min = 1;
            max = 2;
        } else if (enemy.enemyType == "Werewolf") {
            min = 3;
            max = 4;
        } else if (enemy.enemyType == "Morko") {
            min = 2;
            max = 4;
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // Function to calculate exp reward from kill, based on enemyType
    killRewardExp: function () {

        var min = 0;
        var max = 0;

        if (enemy.enemyType == "Goblin") {
            min = 10;
            max = 15;

        } else if (enemy.enemyType == "Troll") {
            min = 20;
            max = 35;
        } else if (enemy.enemyType == "Spider") {
            min = 8;
            max = 12;
        } else if (enemy.enemyType == "Morko") {
            min = 18;
            max = 36;
        } else if (enemy.enemyType == "Werewolf") {
            min = 30;
            max = 45;
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // Function used to calculate total score based on kills
    killRewardScore: function () {

        var score = 0;

        score += (player.killedSpider * 1);
        score += (player.killedGoblin * 2);
        score += (player.killedTroll * 3);
        score += (player.killedMorko * 3);
        score += (player.killedWerewolf * 4);

        player.playerScore = score;
    },

    rewardLoot: function (lootType) {

        // All possible item rewards listed in array
        var lootArray = [{ name: 'Knife', type: 'bladed_weapon', droppedBy: ['Goblin, Morko'], value: '5', condition: '100', dropsIn: ['forest, mountains'] },
        { name: 'Club', type: 'bludgeon_weapon', droppedBy: ['Goblin, Troll'], value: '5', condition: '100', dropsIn: ['forest, mountains'] },
        { name: 'Teeth', type: 'item', droppedBy: ['Goblin, Troll'], value: '2', condition: '100', dropsIn: ['forest, mountains'] }];

        switch (lootType) {

            // Filter lootArray element with conditions, return matches in query.
            case "kill":

                var query = lootArray.filter(function (el) {
                    return el.droppedBy = enemy.enemyType /*&&
                           el.dropsIn = 'forest' &&
                           */;
                });
                return query[(Math.random() * query.length) | 0]

            case "chest":

                var query = lootArray.filter(function (el) {
                    return el.dropsIn = player.currentLoc /*&&
                           el.dropsIn = 'forest' &&
                           */;
                });
                return query[(Math.random() * query.length) | 0]
        }
    }
}

let PlayerLevels = {

    calcExperience: function () {
        var reqExp = 0;
        let getPlayerLvl = document.querySelector(".classLvl-player");
        let getPlayerExp = document.querySelector(".exp-player");

        if (player.playerLvl == 1) {
            reqExp = 100;
        } else if (player.playerLvl == 2) {
            reqExp = 500;
        } else if (player.playerLvl == 3) {
            reqExp = 1000;
        } else if (player.playerLvl == 4) {
            reqExp = 2000;
        } else if (player.playerLvl == 5) {
            reqExp = 3500;
        } else if (player.playerLvl == 6) {
            reqExp = 5000;
        } else if (player.playerLvl == 7) {
            reqExp = 7500;
        } else if (player.playerLvl == 8) {
            reqExp = 12500;
        } else if (player.playerLvl == 9) {
            reqExp = 18500;
        } else if (player.playerLvl == 10) {
            reqExp = 25000;
        }

        if (player.playerExp >= reqExp) {
            player.playerLvl++;
            player.playerExp = player.playerExp - reqExp;
            player.playerLvlUp++;

            getPlayerLvl.innerHTML = player.classType + ' Level:  ' + player.playerLvl;

            getPlayerExp.innerHTML = 'Exp: ' + player.playerExp + ' / ' + reqExp;
        } else {
            getPlayerExp.innerHTML = 'Exp: ' + player.playerExp + ' / ' + reqExp;
        }
    }
}