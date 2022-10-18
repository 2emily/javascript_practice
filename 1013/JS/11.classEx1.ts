{
    type CoffeeOrder = {
        shots: number;
        hasMilk: boolean;
    };

    // 커피 머신이 하는일
    // 1. 물을 끓인다 
    // 2. 커피 콩을 갈아서 파우더 만든다 
    // 3. 커피를 내린다
    // 4. 커피를 컵에 담는다 

    class CoffeeMaker {
        readonly COFFEE_GRAM: number = 10;
        coffeeBeans: number = 0;
        powder: number = 0;
        constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;
        }

        printState() {
            console.log(`[ 커피콩 : ${this.coffeeBeans} ] `);
        }

        addBeans(beans: number) {
            if (beans <= 0) {
                this.printState();
                throw new Error('0보다 큰 값을 입력해야합니다');
            }
            this.coffeeBeans += beans;
        }

        preheat() {
            console.log(" 물 끓이는 중 ----- ")
        }
        grindBean() {
            if (this.coffeeBeans - 20 < 0) {
                throw new Error('커피콩이 모자랍니다 추가하십쇼');
            }
            console.log(" 커피 가는중  ----- ")
            this.coffeeBeans -= 20;
            this.powder += 10;
        }

        brewCoffee() {
            if (this.powder - 10 < 0) {
                throw new Error('커피 파우더 모자랍니다 추가하십쇼');
            }
            this.powder -= 10;
            console.log(" 커피내리는 중 ----- ")
        }

        makeOrder(name: string): CoffeeOrder {
            console.log(` --- 주문 하신 ${name} 나왔습니다 --- `)
            return {
                shots: 2,
                hasMilk: false,
            }
        }

    }

    const machine = new CoffeeMaker(100);

    //machine.addBeans(-100);
    machine.printState();
    machine.preheat();
    machine.grindBean();
    machine.brewCoffee();
    const americano = machine.makeOrder('아메리카노');
    console.log(americano);


}