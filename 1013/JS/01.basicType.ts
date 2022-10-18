{

    const num: number = -6;

    const str: string = 'yeonmi';

    const boal: boolean = false;

    let name: undefined;

    let age: number | undefined;
    age = undefined;
    age = 30;

    function find(): number | undefined {
        return undefined;
    }

    // null
    let person: null;
    let person2: string | null;

    // unknown 
    let dontKnow: unknown = 0;
    dontKnow = 'he';
    dontKnow = true;


    // any 
    let anything: any = null;
    anything = true;
    anything = 'string';

    // void
    function sayHi(): void {
        console.log('hi~~');
        return;
    }

    let notUse1: void = undefined;

    // never : 없다 
    function throwError(message: string): never {

        throw new Error(message);
        while (true) { }
    }
    let notUse2: never;


    let obj: object;

    function anyObject(obj: object) { }
    anyObject([1, 2, 3]);
    anyObject({ name: '나비', age: 5 });
}
