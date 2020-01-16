new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    watch: {
        playerHealth: function() { setTimeout(() => {this.checkWin();}, 500); },
        monsterHealth: function() { setTimeout(() => {this.checkWin();}, 500); },
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning=true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function() {
            this.monsterHealth = this.calculateLife(this.randomNumber(1,20), this.monsterHealth,'damage');
            this.playerHealth = this.calculateLife(this.randomNumber(1,20), this.playerHealth,'damage', true);
        },
        specialAttack: function() {
            this.monsterHealth = this.calculateLife(this.randomNumber(20,40), this.monsterHealth,'superDamage');
            this.playerHealth = this.calculateLife(this.randomNumber(20,40), this.playerHealth,'superDamage', true);
        },
        heal: function() {
            this.playerHealth = this.calculateLife(this.randomNumber(1,20), this.playerHealth,'damage', true);
            if(this.playerHealth>0){this.playerHealth =  this.calculateLife(this.randomNumber(15,30), this.playerHealth,'heal', true);}
        },
        randomNumber: function(min, max) { 
            return Math.floor(Math.random() * ( Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
        },
        calculateLife: function(points, affectedLife, type, isPlayer=false) {
            this.turns.unshift({
                isPlayer: isPlayer,
                type: type,
                hit: points,
                message: 
                    (type !='heal') ?
                        (isPlayer) ? 
                            ('The player has been '+ ((type==='damage') ? '': 'severely ')+'damaged by the monster, decrement his life in:- '+points) 
                           :('The monster has been '+ ((type==='damage') ? '': 'severely ')+'damaged by the player, decrement his life in:- '+points) 
                    :('The player has healed, increased his life in:+ '+points)

                });
            return type==='heal' ? 
            ((affectedLife + points)>=100 ? 100 : affectedLife + points) :
            ((affectedLife - points)<=0 ? 0 : affectedLife - points);
        },
        showDialog: function(status) {
            this.gameIsRunning = false;
            const loseMessage = "You Lose! Start a new game?";
            const winMessage = "You Won! Start a new game?";
            if (confirm((status==='win' ? winMessage : loseMessage))) { this.startNewGame(); }
            else {  }
        },
        checkWin: function() {
            if(!this.gameIsRunning){ return;}
            return this.playerHealth <=0 ? 
            this.showDialog('lose') : 
            this.monsterHealth <=0 ?
            this.showDialog('win') :
            false;
        }
    }
})
