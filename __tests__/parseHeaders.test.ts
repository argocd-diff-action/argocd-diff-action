import {expect, test} from '@jest/globals';
import {parseHeaders} from '../src/getActionInput.js';

test('parseHeaders with a single header', () => {
    const headers = parseHeaders('Authorization: Bearer super-secret-bearer-token');
    expect(headers).toStrictEqual(new Map<string, string>(Object.entries({
        'Authorization': 'Bearer super-secret-bearer-token',
    })))
});

test('parseHeaders with multiple headers', () => {
    const headers = parseHeaders('Authorization: Bearer super-secret-bearer-token, X-Example: example-value');
    expect(headers).toStrictEqual(new Map<string, string>(Object.entries({
        'Authorization': 'Bearer super-secret-bearer-token',
        'X-Example': 'example-value',
    })))
});

test('parseHeaders with a bad header', () => {
    expect(() => {
        parseHeaders('Authorization')
    }).toThrow();
});

test('parseHeaders with empty string', () => {
    const headers = parseHeaders('');
    expect(headers).toStrictEqual(new Map<string, string>());
});