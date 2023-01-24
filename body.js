function body() {

    d3.select('.top')
		.style('background','#f9f9f9')
		.style('color','#000')
		.selectChildren('.panel-main').data([1])
			.join('div').attr('class','panel-main')
			.style('margin','12px')
			.call(sel=>{

				sel.selectChildren('.logo').data(d=>[d])
					.join('div').attr('class','logo')
						.style('text-align','center')
						.selectChildren('img').data(d=>[d])
							.join('img')
								.attr('src','https://favicons.pages.dev/amanrimba-text.png')
								.style('max-height','50px')


				sel.selectChildren('.title').data(d=>[d])
					.join('h1').attr('class','title')
						.style('text-align','center')
						.style('margin-top','6px')
						.style('margin-bottom','6px')
						.html('Bookings & Consumables')

				sel.selectChildren('.main-legend').data(d=>[d])
					.join('div').attr('class','main-legend')
						.style('display','flex')
						.style('justify-content','center')
						.style('margin-bottom','6px')
						.selectChildren('svg').data(d=>[d])
							.join('svg')
								.style('flex','0 1 360px')
								.style('width','360px')
								.attr('viewBox','0 0 480 30')
								.selectChildren('g').data(d=>[d])
									.join('g')
										.attr('transform','translate(0,15)')
										.call(sel=>{

											sel.selectChildren('.book').data(d=>[d])
												.join('g').attr('class','book')
													.attr('transform','translate(20,0)')
													.call(sel=>{

														sel.selectChildren('circle').data(d=>[d])
															.join('circle')
																.attr('r',5)
																.attr('fill','#81B622')

														sel.selectChildren('text').data(d=>[d])
															.join('text')
																.attr('x',10)
																.attr('y',5)
																.text('Guests Booking')

													});

											sel.selectChildren('.internal').data(d=>[d])
												.join('g').attr('class','internal')
													.attr('transform','translate(150,0)')
													.call(sel=>{

														sel.selectChildren('circle').data(d=>[d])
															.join('circle')
																.attr('r',5)
																.attr('fill','#9D0F40')

														sel.selectChildren('text').data(d=>[d])
															.join('text')
																.attr('x',10)
																.attr('y',5)
																.text('Internal Booking')

													});

											sel.selectChildren('.purchase').data(d=>[d])
												.join('g').attr('class','book')
													.attr('transform','translate(280,0)')
													.call(sel=>{

														sel.selectChildren('rect').data(d=>[d])
															.join('rect')
																.attr('x',-5)
																.attr('y',-5)
																.attr('width',10)
																.attr('height',10)
																.attr('fill','#da8ee7')

														sel.selectChildren('text').data(d=>[d])
															.join('text')
																.attr('x',10)
																.attr('y',5)
																.text('Purchased Items')

													});


										});

                                    })
}