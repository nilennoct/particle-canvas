import { Settings } from './constants';
import { shuffle } from './utils';

export class Lottery {
    fromList: string[];
    toList: string[];
    result: [string, string][] = [];
    readonly id: string;

    constructor(id?: string) {
        if (id) {
            this.id = id;

            try {
                const lottery: Lottery = JSON.parse(localStorage.getItem(this.id)!);

                this.fromList = lottery.fromList;
                this.toList = lottery.toList;
                this.result = lottery.result;

                return;
            } catch {
            }
        } else {
            this.id = `lottery-${Date.now()}`;
        }

        this.fromList = shuffle(Settings.lotteryList.slice(0));
        this.toList = shuffle(Settings.lotteryList.slice(0));

        this.writeStorage();
    }

    get size() {
        return Math.min(this.fromList.length, this.toList.length);
    }

    execute(): [string, string] {
        const [fromIndex, fromValue] = Lottery.getRandomEntry(this.fromList);
        let toEntry: [number, string];

        this.fromList.splice(fromIndex, 1);

        do {
            toEntry = Lottery.getRandomEntry(this.toList);
        } while (fromValue === toEntry[1] || (toEntry[0] !== 0 && this.fromList[0] === this.toList[0]));

        this.toList.splice(toEntry[0], 1);

        const pair: [string, string] = [fromValue, toEntry[1]];

        this.result.push(pair);

        this.writeStorage();

        return pair;
    }

    private static getRandomEntry(list: string[]): [number, string] {
        let index = Math.floor(Math.random() * list.length);
        return [index, list[index]];
    }

    private writeStorage() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }
}
