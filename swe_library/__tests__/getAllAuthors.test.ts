import getAllAuthors from '@/actions/authors';
import {describe, expect, test} from '@jest/globals';


test('getAllAuthors returns an array of authors', async () => {
    const authors = await getAllAuthors();

    expect(authors).not.toBeNull();
    expect(authors).toBeInstanceOf(Array);

    if (authors) {
        expect(authors.length).toBeGreaterThan(0);

    }
});