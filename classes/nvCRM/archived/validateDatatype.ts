export default function validateDatatype(test: string, response: any) {
    const getSafe = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
    const result = getSafe(["meta", "type"], response);

    if (result !== test) {
        throw new Error(`Datatype does not appear to be correct. "${test}" type expected from ${response}.`);
		/**
		 * Would be amazing to see the software attempt to repair the file.
		 */
    } else {
        return response
    }
}