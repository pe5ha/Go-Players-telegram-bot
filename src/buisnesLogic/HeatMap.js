// dataForHeatMap - данные для HeatMap
// data - массив из цифр. Каждая цифра - интенсивность за день
// levels - массив из уровней
// 	min, max - значения от до
// 	value - символ, который будет добавлен в HeatMap, если значение будет в диапазоне [min, max)
// 	max значение можно задать, как -1. Тогда верхняя граница не будет учитываться
// startDay - день недели с которого надо начать. 0-пн, 1-вт и т.д.
// fill - заполнитель для начала календаря, а также для ошибочных значений
// let dataForHeatMap = {
// 	data: [0,0,0,1,1,4,2,10,5,10,1,1,3,2,6,3,10,0,0,0,2,3,0,0,1,1,4,2,5,0],
// 	levels: [
// 		{ min: 0, max: 1, value: "⬜️" },
// 		{ min: 1, max: 4, value: "🟨" },
// 		{ min: 4, max: 10, value: "🟧" },
// 		{ min: 10, max: -1, value: "🟥" }
// 	],
// 	startDay: 2,
// 	fill: "▫️"
// }

/** */

const renderHeatMap = ({ data, levels, startDay, fill }) => {
	// let resultString = "пн вт ср чт пт сб вс\n"; // результирующая строка с heatMap
  
	let resultString = "";

	let dayOfTheWeek = startDay; // день недели, необходим для перехода на новую строку в конце недели
	for (let i = 0; i < startDay; i++) // добавление заполнителя до нужного дня недели
		resultString += fill;

	// пробегаемся по каждому числу в data
	data.forEach(d => {
		let emoji = fill; // мало ли возникнет ошибка с условием, тогда добавочный эмоджи будет как заполнитель определяться
		for (let i = 0; i < levels.length; i++) {
			// находим нужный эмоджи в соответствии с уровнем
			if (d >= levels[i].min && (d <= levels[i].max || levels[i].max == -1)) {
				emoji = levels[i].value;
				break;
			}
		}
		resultString += emoji; // добавляем эмоджи в heatMap

		// наращиваем день недели и при необходимости переходим на новую строку
		dayOfTheWeek++;
		if (dayOfTheWeek == 7) {
			resultString += "\n";
			dayOfTheWeek = 0;
		}
	});

	return resultString;
}