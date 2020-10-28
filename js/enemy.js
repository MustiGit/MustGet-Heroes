let enemy;

function Enemy(enemyType, health, mana, strength, agility, speed, maxhp) {
    this.enemyType = enemyType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.maxhp = maxhp;
}

let CreateEnemy = {

    createEnemyNormal: function () {

        //Create enemy
        let enemy00 = new Enemy("Goblin", 150, 0, 50, 100, 100, 150);
        let enemy01 = new Enemy("Troll", 200, 0, 150, 80, 50, 200);
        let enemy02 = new Enemy("Spider", 120, 0, 25, 120, 120, 120);
        let enemy03 = new Enemy("Werewolf", 220, 0, 130, 90, 90, 220);
        let enemy04 = new Enemy("Morko", 180, 0, 130, 80, 80, 180);

        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(5));

        // Use switch to choose random enemy
        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
                break;
            case 2:
                enemy = enemy02;
                break;
            case 3:
                enemy = enemy03;
                break;
            case 4:
                enemy = enemy04;
                break;
        }
    }
}


