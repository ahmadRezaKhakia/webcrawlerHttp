const {sortPage} = require('./report');
const { test, expect } = require('@jest/globals'); 

test('sprtPage 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    };
    const actual = sortPage(input);
    const expected = [
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path',1],
    ];
    expect(actual).toEqual(expected);
})

test('sprtPage 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 5,
        'https://wagslane.dev/path3': 2,
        'https://wagslane.dev/path4': 9,
    };
    const actual = sortPage(input);
    const expected = [
        ['https://wagslane.dev/path4',9],
        ['https://wagslane.dev/path2',5],
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path3',2],
        ['https://wagslane.dev/path',1],
    ];
    expect(actual).toEqual(expected);
})