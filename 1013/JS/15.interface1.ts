
{

    type Skill = {
        name: string;
        power: number;
    }
    interface Unit {
        dead: boolean;
        name: String;
        attack(op: Unit): void;
        isDead(op: Unit): void;
        getHp(): number;
        setHp(hp: number): void;
    }

    interface healable {
        giveHeal(player: Player, addHp: number): void;
    }

    abstract class Player implements Unit {
        maxHp: number;
        dead: boolean = false;
        constructor(public name: String, protected hp: number, protected power: number) {
            this.name = name;
            this.hp = this.hp;
            this.power = this.power;
            this.maxHp = this.hp;
        }
        setHp(hp: number): void {
            this.hp -= hp;
        }
        getHp() {
            return this.hp;
        }

        attack(op: Unit): void {
            if (op instanceof Monster) {
                op as Monster;
                op.setHp(this.power);
                console.log(`[ ${this.name} ] => [${op.name}] 공격 `);
                console.log(`[ ${op.name} ] : [${op.getHp()}] `);
                console.log("================");
                this.isDead(op);
            }
        }

        isDead(op: Unit): void {
            if (op.getHp() <= 0) {
                op.dead = true;
                console.log(`${op.name} 처치 하셨습니다`);
            }
        }
    }

    abstract class Monster implements Unit {
        maxHp: number;
        dead: boolean = false;
        constructor(public name: String, protected hp: number, protected power: number) {
            this.name = name;
            this.hp = this.hp;
            this.power = this.power;
            this.maxHp = this.hp;
        }
        getHp() {
            return this.hp;
        }
        setHp(hp: number): void {
            this.hp += hp;
        }
        attack(op: Unit): void {
            if (op instanceof Player) {
                op = op as Player;
                op.setHp(this.power);
                console.log(`[ ${this.name} ] => [${op.name}] 공격 `);
                console.log(`[ ${op.name} ] : [${op.getHp()}] `);
                console.log("================");
                this.isDead(op);
            }
        }
        isDead(op: Unit): void {
            if (op.getHp() <= 0) {
                op.dead = true;
                console.log(`${op.name}님이 사망 하셨습니다`);
            }
        }

    }

    class Soldier extends Player {
        skill: Skill;

        constructor(public name: String, protected hp: number, protected power: number) {
            super(name, hp, power);

            this.skill = { name: "전체 공격", power: 30 };

        }

        useSkill(mons: Monster[]): void {

            mons.map(mon => {
                mon.setHp(this.skill.power);
                console.log(`[ ${mon.name} 공격! ]`);
            }
            );

        }


    }

    class Healer extends Player implements healable {
        skill: Skill;
        constructor(public name: String, protected hp: number, protected power: number) {
            super(name, hp, power);

            this.skill = { name: "힐", power: 40 };

        }
        giveHeal(team: Player, addHp: number): void {
            team.setHp(15);
            console.log(`[ ${team.name}님 ++ ${addHp} 체력 증가 ]`);
        }

    }

    class Wolf extends Monster {
        superAttack: Skill;

        constructor(protected hp: number, protected power: number) {
            super('울프', hp, power);

            this.superAttack = { name: "할퀴기 ", power: 10 };

        }

        useSuperAttack(players: Player[]): void {
            players.map(player => {
                console.log(`[ ${player.name}님 ${this.superAttack.name} 당했다 ]`);
                player.setHp(-this.superAttack.power)
            });

        }

    }

    class Bat extends Monster {
        superAttack: Skill;

        constructor(protected hp: number, protected power: number) {
            super('박쥐', hp, power);

            this.superAttack = { name: "음파공격 ", power: 15 };

        }

        useSuperAttack(players: Player[]): void {
            players.map(player => {
                console.log(`[ ${player.name}님 ${this.superAttack.name} 당했다 ]`);
                player.setHp(-this.superAttack.power)
            });

        }

    }


    const p1 = new Soldier('test1', 100, 20);
    const p2 = new Healer('lovely1004', 280, 10);
    const p3 = new Soldier('heartbreaker', 300, 30);

    const m1 = new Wolf(150, 10);
    const m2 = new Wolf(150, 10);
    const m3 = new Bat(100, 10);
    const m4 = new Bat(100, 10);

    const monterList = [m1, m2, m3, m4];
    const playerList = [p1, p2, p3];
    p1.attack(m1);
    const rand_Idx = Math.floor(Math.random() * monterList.length);

    console.log(monterList[rand_Idx].attack(p1));
    console.log(monterList[rand_Idx].useSuperAttack(playerList));


    const unitList = [...monterList, ...playerList]; // 업케스팅 

    unitList.forEach((unit) => { console.log(unit.name) })
    const m5 = unitList[0];

    (m5 as Wolf).useSuperAttack(playerList); // 다운케스팅 

}