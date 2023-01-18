


				//====================================================================================
				//
				//====================================================================================

        function calendar() {

        		console.group('%ccalendar', 'color:magenta');



            selectedYear = d3.selectAll('.year-display.bp4-active').data().map(d=>d.year);

            console.log('selectedYear',selectedYear);

            let selectedCategory = d3.select('.firstSelect select').property('value');

            let category = groupCategory.filter(d => d.category == selectedCategory);

            console.log('category', category)

//
//            if (selectedData != undefined || selectedData != null) {
//                console.log('enter')
//                groupCategory = selectedData
//            }
//            else {
//                console.log('enter 2')
//                groupCategory = groupCategory.filter(d => d.category == 'FnB')
//            }

//
//            if (activeYear != undefined || activeYear != null) {
//                console.log('enter')
//                selectedYear = activeYear
//            }
//
//            console.log('selectedYear', selectedYear)

            cellSize = 20
            width = 1200
            height = 200



            // create a tooltip
            var Tooltip = d3.select(".tooltip")
                .style("opacity", 0)
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
                .style("position", "absolute")
                .style("pointer-events", "none") // this will make the container of the tooltip disappear


            var mouseover = function (e, d) {
                Tooltip
                    .style("opacity", 1)
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
            }
            var mousemove = function (e, d) {
                Tooltip
                    .html("The exact value of<br>this cell is: " + d)
                // .style("left", (e.pageX + 20) + "px")
                // .style("top", (e.pageY - 40) + "px")
            }
            var mouseleave = function (e, d) {
                Tooltip
                    .style("opacity", 0)
                d3.select(this)
                    .style("stroke", "white")
                    .style("opacity", 0.8)
            }


            d3.select('.viz')
                .selectAll('.categories')
                //.data(groupCategory, d => d.category)
                .data(category, d => d.category)
                .join('div')
                .attr('class', 'categories')
                .call(sel => {

                    sel.selectAll('.title')
                      .data(d => [d])
                      .join('div')
                        .attr('class', 'title')
                        .attr('class', 'title bp4-text-large')
                        .style('margin-top', '24px')
                        .style('margin-bottom', '12x')
                        .style('text-align', 'center')
                        .style('background', '#6a8f39')
                        .style('color', '#fff')
                        .style('font-size', '30px')
                        .style('padding', '6px')
                        .html(d => d.category.toUpperCase())


                    sel.selectAll('.container')
                        .data(d => [d])
                        .join('div')
                        .attr('class', 'container')

                        .style('margin', 0)
                        .style('margin-top', '24px')
                        .style('margin-bottom', '12x')

                        // .style('display', 'flex')
                        // .style('flex-wrap', 'wrap')
                        .call(sel => {


                            sel.selectAll('.items')
                                .data(d => d.value)
                                .join('div')
                                .attr('class', 'items')
                                // .style('display', 'flex')
                                // .style('flex-wrap', 'wrap')
                                // .style('justify-content', 'center')
                                .call(sel => {



                                    sel.selectAll('.subcategory')
                                        .data(d => [d])
                                        .join('div')
	                                        .attr('class', 'subcategory bp4-text-large')
	                                        .style('margin-top', '24px')
	                                        .style('margin-bottom', '12x')
	                                        .style('text-align', 'center')
	                                        .style('background', '#006600')
	                                        .style('color', '#fff')
	                                        .style('padding', '6px')
	                                        .html(function (d) {

	                                            if (d.subcategory != null) {
	                                                return d.subcategory.toUpperCase()
	                                            }
	                                        })



                                    sel.selectAll('.calendars')
                                        .data(function (d) {

                                            let value = d.value
                                            let newYear = []

                                            value.forEach((k1, l1) => {

                                                if (k1.year != '') {
                                                    newYear.push(k1.year)
                                                }
                                            })

                                            years.forEach((k2, l2) => {

                                                if (!newYear.includes(k2)) {
                                                    value.unshift({ year: k2, value: [], active: false })
                                                }
                                            })


                                            let newData = []
                                            value.forEach((d, i) => {

                                                if (selectedYear.includes(d.year)) {
                                                    newData.push(d)
                                                }
                                            })

                                            let k =  newData.sort((a, b) => d3.descending(a.year, b.year))
                                            console.log('k', k);
                                            return k;


                                        }, d=>d.year)
                                        .join('div')
                                        .style('flex', '1 1 100%')
                                        .attr('class', 'calendars')

                                        .call(calendar_item)
                                })

                        })

                })




        		console.groupEnd('calendar');

        }







function detect(dataset, date) {

    let data = []

    dataset.forEach((d, i) => {

        var arr = d.rangeDate

        arr.forEach((k, l) => {

            k.forEach((k2, i2) => {

                if (formatTime(k2) == formatTime(date)) {
                    if (data != d) {
                        data.push(d)
                    }

                }
                else if (d.CheckOutDate == formatTime(date)) {
                    if (data.length == 0) {
                        data.push(d)
                    }
                }

            })
        })
    })

    return data
}


const formatTime = d3.timeFormat("%Y-%m-%d")


function pathMonth(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
        d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);


    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
}


function calendar_item(sel)	{


                                            sel.selectAll('.calendar')
                                                .data(d => [d])
                                                .join('svg')
                                                .attr('viewBox', [0, 0, width, height].join(' '))
                                                .attr("transform", "translate(30," + 0 + ")")
                                                .attr('class', 'calendar')


                                                .call(sel => {

                                                    sel.selectChildren('.tooltip').data(d => [d])
                                                        .join('text').attr('class', 'tooltip')
	                                                        .attr('transform', d => 'translate(' + [35, 190] + ')')
	                                                        .attr('font-size', '100%')


                                                    sel.selectAll('.label-year')
                                                        .data(d => [d])
                                                        .join('text')
                                                        .attr('class', 'label-year')
                                                        //.attr("transform", "translate(10," + (cellSize) + ")rotate(-90)") //rotate
                                                        .attr("transform", "translate(20," + (height / 2 - 10) + ")rotate(-90)")
                                                        .attr("font-family", "sans-serif")
                                                        .attr("font-size", 25)
                                                        .attr("text-anchor", "middle")
                                                        .text(function (d) { return d.year; })

                                                    formatDay = i => "SMTWTFS"[i], // given a day number in [0, 6], the day-of-week label

                                                        sel.selectAll('.label-day')
                                                            .data(d3.range(7))
                                                            .join('text')
                                                            .attr('class', 'label-day')
                                                            .attr('transform', d => 'translate(' + [32, d * cellSize + 7 + 33] + ')')
                                                            .attr("font-family", "sans-serif")
                                                            .attr("font-size", 10)
                                                            .attr("text-anchor", "middle")
                                                            .html(formatDay)



                                                    sel.selectAll('.days')
                                                        .data(d => [d])
                                                        .join('svg')
                                                        .attr('class', 'days')
                                                        .call(sel => {

                                                            sel.selectAll('.day')
                                                                .data(function (d) {
                                                                    let daterange = d3.timeDays(new Date(+d.year, 0, 1), new Date(+d.year + 1, 0, 1))
                                                                        .map(k => {

                                                                            return {
                                                                                date: k,
                                                                                values: d.value.filter(p => p.date == formatTime(k)),
                                                                                booking: detect(booking_dataset, k)
                                                                                //staff:
                                                                            }
                                                                        })

                                                                    return daterange
                                                                })
                                                                .join('svg')
                                                                .attr('class', 'day')
                                                                .call(sel => {

                                                                    sel.selectAll('day-rect')
                                                                        .data(d => [d])
                                                                        .join('rect')
                                                                        .attr('class', 'day-rect')
                                                                        // .html(d=>console.log(d.date))
                                                                        .attr('fill', function (k) {

                                                                            if (k.values && k.values.length) {
                                                                                return '#8FDDE7'
                                                                            }

                                                                            else if (k.date.getMonth() % 2 == 0) {
                                                                                return '#D3D3D3'
                                                                            }

                                                                            else {
                                                                                return '#EBEBE8'
                                                                            }

                                                                        })
                                                                        .attr("width", cellSize)
                                                                        .attr("height", cellSize)
                                                                        // .style('fill', '#ccc')
                                                                        .attr("stroke", "white")
                                                                        .attr("x", function (d) {
                                                                            return 45 + d3.timeWeek.count(d3.timeYear(d.date), d.date) * cellSize;
                                                                        })
                                                                        .attr("y", function (d) { return 25 + d.date.getDay() * cellSize; })
                                                                        .style('padding', 10)
                                                                        .style('cursor', 'pointer')


                                                                        .on('mouseover', rect_hover)
                                                                        .on('mouseout', function (e, d) {

																																						d3.select(this.closest('svg.calendar'))
																																								.selectAll('.tooltip')
																																										.style('opacity',0);

                                                                        })



                                                                    sel.selectAll('day-circle')
                                                                        .data(function (k) {

                                                                            if (k.booking && k.booking.length) {
                                                                                // console.log('test')
                                                                                return [k]
                                                                            }
                                                                            else {
                                                                                return []
                                                                            }
                                                                        })
                                                                        .join('circle')
                                                                        .attr('class', 'day-circle')
                                                                        // .html(d=>console.log(d.date))
                                                                        .attr('fill', function (k) {

                                                                            var booking = k.booking
                                                                            var color = []

                                                                            booking.forEach((d, i) => {

                                                                                //    console.log(d)
                                                                                if (k.booking && k.booking.length && d.Events == 'Internal Booking') {
                                                                                    if (color.length == 0) {
                                                                                        color.push('#9D0F40')
                                                                                    }
                                                                                }
                                                                                else {
                                                                                    if (color.length == 0) {
                                                                                        color.push('#81B622')
                                                                                    }
                                                                                }
                                                                            })


                                                                            return color

                                                                        })
                                                                        .attr("width", cellSize - 10)
                                                                        .attr("height", cellSize - 10)

                                                                        .style('r', 5)
                                                                        .attr("stroke", "white")
                                                                        .attr("cx", function (d) {
                                                                            if (d.booking && d.booking.length)
                                                                                return 55 + d3.timeWeek.count(d3.timeYear(d.date), d.date) * cellSize;
                                                                        })
                                                                        .attr("cy", function (d) {
                                                                            if (d.booking && d.booking.length)
                                                                                return 35 + d.date.getDay() * cellSize;
                                                                        })
                                                                        .style('padding', 10)



                                                                })


                                                            sel.selectAll('.path-month')
                                                                .data(function (d) { return d3.timeMonths(new Date(+d.year, 0, 1), new Date(+d.year + 1, 0, 1)); })
                                                                .join('path')
                                                                .attr('class', 'path-month')
                                                                .attr("transform", "translate(45," + 25 + ")")
                                                                .attr("fill", "none")
                                                                .attr("stroke", "black")
                                                                .attr("stroke-width", 1)
                                                                .attr("d", pathMonth)



                                                            sel.selectAll('.months-label')
                                                                .data(d => [d])
                                                                .join('svg')
                                                                .attr('class', 'months-label')
                                                                .attr('transform', d => 'translate(' + [250, 15] + ')')

                                                                .call(sel => {

                                                                    sel.selectAll('label')
                                                                        .data(function (d) {

                                                                            let data = d3.groups(d3.timeMondays(new Date(2023, 0, 1), new Date(2023, 11, 31)), d => d.getMonth())
                                                                                .map(d => d[1][1])

                                                                            return data
                                                                        })

                                                                        .join('text')
                                                                        .attr('class', 'label')
                                                                        .attr('transform', d => 'translate(' + [(d.getMonth() * cellSize * 4) + 80, 15] + ')')
                                                                        .text(d => 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')[d.getMonth()])
                                                                })
                                                        })
                                                })

}








        function rect_hover(e, d) {

            console.log(d);

//            d3.select( // doing this to make sure to select the right node
//                this					// rect
//                    .parentNode // g.days
//                    .parentNode // g.weeks
//                    .parentNode // g.plot
//                    .parentNode	// svg
//            )
//                .selectAll('.tooltip')


						console.log('tooltip', d3.select(this.closest('svg.calendar')).select('.tooltip').node() );


						d3.select(this.closest('svg.calendar'))
								.selectChildren('.tooltip').data([d])
								.join('text').attr('class','tooltip')
	                .text(d => {

	                    //console.log('k',k);


	                    let ymd = moment(d.date).format('YYYY-MM-DD'),
	                        list = [moment(d.date).format('dddd, D MMM YYYY')];


	                    if (d.booking != '' && d.booking != null) {


	                        var name = []

	                        d.booking.map(d=>{

	                            name.push(d.guest_name)
	                        })

	                        list.push('Booked by ' + name)
	                    }

	                    if(d.values != null && d.values != '') {

	                        var item = 0
	                        var quantity = 0

	                        value = d.values

	                        d.values.map(d=>{

	                            d.value.map(k=>{

	                                item = item + k.total_price
	                                quantity = quantity + 1
	                            })
	                        })

	                        list.push('Quantity of Item: ' + quantity +     ' (RM' + item + ')')
	                    }

					            console.log('list', list);


	                    return list.join(' / ')
	                })
	                .style('opacity',1)

        }


