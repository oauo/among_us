const recursive_equal = (
	obj:any,//These may not be the same type
	comparison:any,
	maxDepth:number = 8,
	depth:number = 0,
):any => {
	if(maxDepth > 0 && depth == maxDepth) return true; //Assume rest matches once in too deep

	if(obj === comparison) return true;
	if(typeof obj != typeof comparison) return false;
	if(Array.isArray(obj) != Array.isArray(comparison)) return false;

	if(typeof obj == `object` && Array.isArray(obj)) {
		//Array
		if(obj.length != comparison.length) return false;
		if(obj.some((v,i) => typeof v != typeof comparison[i])) return false; //Simple type checking

		const zipped = //Can guarantee that elements aren't missed as lengths are compared
			obj.map((v,i) => [v, comparison[i]]);

		return zipped
			.every(([a,b]:any[]) =>
				recursive_equal(a, b, depth+1, maxDepth)
			);

	} else if(typeof obj == `object`) {
		//Object
		const keys = Object.keys(obj).sort();
		const comparison_keys = Object.keys(comparison).sort();
		if(keys.length != comparison_keys.length) return false;
		if(keys.some((k,i) => k != comparison_keys[i])) return false;

		const zipped = //Can guarantee that elements aren't missed as key lengths are compared
			keys.map(k => [obj[k], comparison[k]]);

		return zipped
			.every(([a,b]:any[]) =>
				recursive_equal(a, b, depth+1, maxDepth)
			);
	}
	return false;
}

type amongUsOptions = {
	shallowEqual?:boolean,
	maxDepth?:number,
}

/**
 * Determines whether an array includes a certain element, returning true or false as appropriate.
 * Follow with `.us(array)` method with the array to search through
 * @param obj Object to find in the array
 * @param options Options include `shallowEqual` and `maxDepth`, default to `false` and `8`
 * @returns If obj is included in the array
 */
const among = <T>(obj:T, {shallowEqual,maxDepth}:amongUsOptions = {}) => {
	return {
		us: shallowEqual ?
			(array:T[]) => array.includes(obj)
			: (array:T[]) => {
			if(typeof obj == `object`) {
				//Array or object
				return array.some(v => recursive_equal(obj, v, maxDepth));
			} else {
				//Other
				return array.includes(obj);
			}
		},
	}
}

export default among;