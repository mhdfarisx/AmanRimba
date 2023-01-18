

function renderYear() {
	console.group('%crenderYear', 'color:magenta');

    yearData = []

    years.forEach((d, i) => {
        yearData.push(d)
    })

    console.log(yearData)

    selectedYear = []

    btnYears = years.map(d=>{
    	return {
      	year	: d,
      	active: true
      }
    });

    d3.select('.selectYear')
        .selectAll('.selected')
        .data([1])
          .join('div')
          .attr('class', 'selected')
          .call(sel => {

              sel.selectAll('.year-display')
                  //.data(years)
                  .data(btnYears)
                  .join('button')
                    .attr('class', 'year-display bp4-button')
                    .attr('type', 'button')
                    .classed('bp4-active',d=>d.active)
                    .classed('bp4-intent-primary', d => d.active)

                    .html(d => d.year)
                    .on('click', function (e, d) {

                    	d.active = !d.active;

                    	d3.select(this)
                    		.classed('bp4-active', d=>d.active)
                    		.classed('bp4-intent-primary', d => d.active)

											render();

                    })
          })

	console.groupEnd('renderYear');
}


function firstSelect() {

	console.group('%cfirstSelect', 'color:magenta');

   d3.select(".firstSelect")
        .selectAll('select')
        .data([1])
        .join('select')
        .on('change', function (e, d) {
					render();
        })
        .selectAll('option').data(d => {

            let grouping = groupCategory.map(d=>d.category);

            console.log('grouping', grouping);

            return grouping

        })
        .join('option')
        .html(d => d);


	console.groupEnd('firstSelect');

}
