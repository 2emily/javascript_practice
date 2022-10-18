{
    type Player = {
        name: string;
        maxHp: number;
        power: number;
        dead: boolean;
    }

    const p1: Player = {
        name: "프로프",
        maxHp: 100,
        power: 10,
        dead: false,
    }

    const p2: Player = {
        name: "일벌레",
        maxHp: 150,
        power: 50,
        dead: false,
    }

    function attack(player: Player, enemy: Player): boolean {
        enemy.maxHp -= player.power
        console.log(`[ ${player.name} ] => [${enemy.name}] 공격 `);
        console.log(`[ ${player.name} ] : hp ${player.maxHp} `);
        console.log(`[ ${enemy.name} ] : hp ${enemy.maxHp} `);
        console.log("================");
        return isDead(enemy);

    }

    function isDead(player: Player): boolean {
        if (player.maxHp <= 0) {
            player.dead = true;
            console.log(`${player.name}님이 사망하셨습니다`);
        }
        return !player.dead;
    }
    let turn = true;
    let run = true;
    while (run) {
        if (turn) {
            run = attack(p1, p2);
        } else {
            run = attack(p2, p1);
        }
        turn = !turn;
    }

}