/**
 * Convert a date to a string as "YYYY-MM-DD HH:MM:SS".
 * @param Date date.
 * @returns String.
 */
function date2string(date) {
	var padStr = function (i) {
		return (i < 10) ? "0" + i : i;
	};
	
	return date.getFullYear() + '-' + 
		padStr((1 + date.getMonth())) + '-' +
		padStr(date.getDate()) + ' ' +
		padStr(date.getHours()) + ':' +
		padStr(date.getMinutes()) + ':' +
		padStr(date.getSeconds());
}


/**
 * Exports.
 */
exports.date2string = date2string;