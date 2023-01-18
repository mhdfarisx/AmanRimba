
function load()	{


        Promise.all([
        	d3.json('https://inventory.amanrimba.com/data/getPublicItem.json'),
        	d3.json('https://inventory.amanrimba.com/data/getPublicBooking.json')

        ]).then(raw=>{

 				console.group('%cload', 'color:magenta');
       	console.log('raw',raw);


	        years = []

	        item_dataset = raw[0];

	        item_dataset.forEach((d, i) => {

	            if (d.purchase_date != null) {
	                d.year = d.purchase_date.substring(0, 4)
	            }

	            if (!years.includes(d.year) && d.year != null) {
	                years.push(d.year)
	            }

	        })



	        booking_dataset = raw[1];


	        booking_dataset.forEach((d, i) => {

	            checkIn = d.check_in
	            checkOut = d.check_out

	            startYear = checkIn.substring(0, 4)
	            startMonth = checkIn.substring(7, 5)
	            startDay = checkIn.substring(10, 8)
	            endYear = checkOut.substring(0, 4)
	            endMonth = checkOut.substring(7, 5)
	            endDay = checkOut.substring(10, 8)

	            d.rangeDate = [
	                d3.timeDays(new Date(startYear, startMonth - 1, startDay), new Date(endYear, endMonth - 1, endDay))

	            ];


	            if (!years.includes(startYear)) {

	                years.push(startYear)
	            }
	            if (!years.includes(endYear)) {

	                years.push(endYear)
	            }

	        });


	        console.log('years', years);



	        groupCategory = d3.groups(item_dataset, d => d.category).map(d => {
	            return {
	                category: d[0],
	                //value: d[1]
	                value: d3.groups(d[1], d => d.subcategory).map(d1 => {
	                    return {
	                        subcategory: d1[0],
	                        value: d3.groups(d1[1], d => d.year).map(d2 => {
	                            return {
	                                year: d2[0],
	                                value: d3.groups(d1[1], d => d.purchase_date).map(d2 => {
	                                    return {
	                                        date: d2[0],
	                                        value: d2[1]

	                                    }
	                                }),
	                                active: d3.some(d[1], d => d.active)
	                            }
	                        })
	                    }
	                })
	            }
	        })


	        console.log('groupCategory', groupCategory);

	        renderLayout();
	        render();


					console.groupEnd('load');

        });



}
