const { normalizeURl } = require('./crawl.js');
const { test, expect } = require('@jest/globals'); 

test('normalizeURl strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURl trailing slash', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURl strip capitals', () => {
    const input = 'https://BLOG.boot.dev/path';
    const actual = normalizeURl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURl strip http', () => {
    const input = 'http://BLOG.boot.dev/path';
    const actual = normalizeURl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
