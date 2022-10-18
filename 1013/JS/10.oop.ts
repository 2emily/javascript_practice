{

    class Player {
        dead: boolean = false;
        name: string;
        maxHp: number;
        power: number;
        constructor(name: string, maxHp: number, power: number) {
            this.name = name;
            this.maxHp = maxHp;
            this.power = power;
        }
        attack(enemy: Player) {
            enemy.maxHp -= this.power;
            console.log(`[ ${this.name} ] => [${enemy.name}] 공격 `);
            console.log(`[ ${this.name} ] : hp ${this.maxHp} `);
            console.log(`[ ${enemy.name} ] : hp ${enemy.maxHp} `);
            console.log("================");
            this.isDead(enemy);
        }

        isDead(player: Player) {
            if (player.maxHp <= 0) {
                player.dead = true;
                console.log(`${player.name}님이 사망하셨습니다`);
            }
        }

    }

    function play(p1: Player, p2: Player) {
        let turn = true;
        while (true) {
            if (p1.dead || p2.dead) return;
            if (turn) {
                p1.attack(p2);
            } else {
                p2.attack(p1);
            }
            turn = !turn;
        }
    }

    const p1: Player = new Player('프로프', 100, 10);
    const p2: Player = new Player('일벌레', 150, 50);

    play(p1, p2);

}