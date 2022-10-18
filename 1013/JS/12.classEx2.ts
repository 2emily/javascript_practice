{

    type CoffeeOrder = {
        shots: number;
        hasMilk: boolean;
    };


    // getter setter 추가 
    class CoffeeMaker {
        private static readonly COFFEE_GRAM: number = 10;
        private coffeeBeans: number = 0;
        private powder: number = 0;
        constructor(coffeeBeans: number) {
            this.addBean = coffeeBeans;
        }

        get addBean() {
            return this.coffeeBeans;
        }

        set addBean(beans: number) {
            if (beans <= 0) {
                this.printState();
                throw new Error('0보다 큰 값을 입력해야합니다');
            }
            this.coffeeBeans += beans;
        }


        private printState() {
            console.log(`[ 커피콩 : ${this.coffeeBeans} ] `);
        }

        private preheat() {
            console.log(" 물 끓이는 중 ----- ")
        }
        private grindBean() {
            if (this.coffeeBeans - 20 < 0) {
                throw new Error('커피콩이 모자랍니다 추가하십쇼');
            }
            console.log(" 커피 가는중  ----- ")
            this.coffeeBeans -= 20;
            this.powder += 10;
        }

        private brewCoffee() {
            if (this.powder - 10 < 0) {
                throw new Error('커피 파우더 모자랍니다 추가하십쇼');
            }
            this.powder -= 10;
            console.log(" 커피내리는 중 ----- ")
        }

        makeOrder(name: string): CoffeeOrder | string {
            if (!this.order()) {
                return "주문 실패 : 죄송합니다";
            }
            console.log(` --- 주문 하신 ${name} 나왔습니다 --- `)
            return {
                shots: 2,
                hasMilk: false,
            }
        }

        private order(): boolean {
            try {
                this.printState();
                this.preheat();
                this.grindBean();
                this.brewCoffee();
                this.printState();
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

    }

    const machine1 = new CoffeeMaker(100);
    const machine2 = new CoffeeMaker(40);
    const machine3 = new CoffeeMaker(50);
    const machine4 = new CoffeeMaker(5);

    //machine.addBean(-10);
    // machine.printState();
    // machine.preheat();
    // machine.grindBean();
    // machine.brewCoffee();
    const americano = machine1.makeOrder("아메리카노");
    const coffee = machine4.makeOrder("아메리카노");
    console.log(americano);
    console.log(coffee);

}