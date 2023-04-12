const buildMean = (mean) => {
  const data = JSON.parse(mean);
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += `<div style='padding-top:5px;color:#3367d6'>
			◆ ${data[i].mean}
	</div>`;
  }
  return result;
};
module.exports = buildMean;
