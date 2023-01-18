





        function charts() {


            arc = d3.arc()
                .innerRadius(0)
                .outerRadius(200 / 2)

            arcLabel = d3.arc()
                .innerRadius(2)
                .outerRadius((100 / 2) * .9);


            d3.select('.charts')
                .selectAll('.display')
                .data([1])
                .join('div')
                .attr('class', 'display')
                .style('display', 'flex')
                .style('flex-wrap', 'wrap')
                .attr('viewBox', [0, 0, width, 1000].join(' '))
                .call(sel => {

                    sel.selectAll('.lollipop-container')
                        .data(d => [d])
                        .join('svg')
                        .attr('class', 'lollipop-container')
                        .style('flex', '1 1 100%')
                        .attr('viewBox', [0, 0, 600, 600].join(' '))
                        .call(sel => {

                            sel.selectAll('.lollipop')
                                .data(function (d) {

                                    var data = item_dataset.filter(d => d.category == 'Lain-lain')
                                    var groupSubCat = d3.groups(data, k => k.category).map(d => {

                                        return {
                                            category: d[0],
                                            value: d3.groups(d[1], k1 => k1.subcategory).map(d1 => {

                                                return {
                                                    subcategory: d1[0],
                                                    sum: d3.sum(d1[1], d1 => d1.total_price),
                                                    value: d1[1]
                                                }

                                            })
                                        }
                                    })

                                    groupSubCat.forEach((d, i) => {

                                        var value = d.value

                                        value.forEach((k, l) => {

                                            k.y = l + 1
                                        })


                                    })

                                    console.log(groupSubCat)
                                    return groupSubCat
                                })
                                .join('svg')
                                .attr('class', 'lollipop')
                                .attr("width", 500)
                                .attr("height", 1500)
                                .call(sel => {

                                    sel.selectAll('.lines')
                                        .data(d => d.value)
                                        .join('g') // only g can use the transform translate
                                        .attr('class', 'lines')
                                        .attr("transform", d => "translate(" + 40 + "," + d.y * 10 + ")")
                                        .call(sel => {

                                            sel.selectAll('.candle')
                                                .data(d => [d])
                                                .join('line')
                                                .attr('class', 'candle')
                                                //.attr("transform", d => "translate(" + 0 + "," + 30 + ")")
                                                .attr("x1", d => d.sum / 4.5)
                                                .attr("x2", 0)
                                                .attr("y1", d => d.y * 20)
                                                .attr("y2", d => d.y * 20)
                                                .attr("stroke", "grey")

                                            sel.selectAll('.circ')
                                                .data(d => [d])
                                                .join('circle')
                                                .attr('class', 'circ')
                                                .attr("cx", d => d.sum / 4.5)
                                                .attr("cy", d => d.y * 20)
                                                .attr("r", "5")
                                                .style("fill", "rgb(0 102 0)")
                                                .attr("stroke", "black")

                                            sel.selectAll('.label')
                                                .data(d => [d])
                                                .join('text')
                                                .attr('class', 'label')
                                                //.attr("transform", d => "translate(" + (d.sum/4.5 + 10) + "," + d.y * 20 + ")")
                                                .attr('x', -5)
                                                .attr('y', d => d.y * 20 + 3)
                                                .style('font-size', '10px')
                                                .style('text-anchor', 'end')
                                                .html(d => d.subcategory)

                                            sel.selectAll('.label-sum')
                                                .data(d => [d])
                                                .join('text')
                                                .attr('class', 'label-sum')
                                                //.attr("transform", d => "translate(" + (d.sum/4.5 + 10) + "," + d.y * 20 + ")")
                                                .attr('x', d => d.sum / 4.5 + 10)
                                                .attr('y', d => d.y * 20 + 3)
                                                .style('font-size', '10px')
                                                .html(d => 'RM' + comma(d.sum))
                                        })

                                })
                        })

                    sel.selectAll('.piechart-container')
                        .data(d => [d])
                        .join('svg')
                        .attr('class', 'piechart-container')
                        .style('flex', '1 1 100%')
                        .attr('viewBox', [0, 0, 600, 600].join(' '))
                        .call(sel => {

                            sel.selectAll('.piecharts')
                                .data(function (d) {

                                    //  let buckets = item_dataset.filter(d => d.subcategory == 'BBQ')



                                    let buckets = item_dataset
                                    let groupCategory = d3.groups(buckets, d => d.category).map(d => {
                                        return {
                                            category: d[0],
                                            sum: d3.sum(d[1], k => k.total_price),
                                            values: d3.groups(d[1], d => d.subcategory).map(d1 => {
                                                return {
                                                    subcategory: d1[0],
                                                    sum: d3.sum(d1[1], d => d.total_price),
                                                    values: d1[1]
                                                }
                                            })
                                        }
                                    })
                                    let total = d3.sum(buckets, d => d.total_price);

                                    // groupCategory.forEach(d => {

                                    //     d.perc = d.total_price / d3.sum(buckets, d => d.total_price);
                                    // });

                                    update = d3.pie()
                                        .value(function (d) {

                                            return d.sum
                                        })
                                        (groupCategory)

                                    console.log(groupCategory)
                                    return update
                                })
                                .attr('class', 'piecharts')
                                .join('svg')
                                //.attr('viewBox', [0, 0, 200, 200].join(' '))
                                .attr("width", 300)
                                .attr("height", 300)
                                .call(sel => {



                                    sel.selectAll("g").data(d => [d])
                                        .join('g')
                                        .attr("transform", "translate(" + 300 / 2 + "," + 300 / 2 + ")")
                                        .call(sel => {

                                            sel.selectAll('.slices')
                                                .data(d => [d])
                                                .join('g')
                                                .attr("class", "slices")
                                                .selectAll('path').data(d => [d])
                                                .join('path')
                                                .attr('fill', d => d3.interpolateTurbo(d.data.sum))
                                                .attr('d', arc);

                                            sel.selectAll('.labels')
                                                .data(d => [d])
                                                .join('g')
                                                .attr("class", "labels")
                                                .selectAll('text').data(d => [d])
                                                .join('text')
                                                .html(d => console.log(d))
                                                .attr('transform', d => 'translate(' + [arcLabel.centroid(d)] + ')')
                                                .attr('text-anchor', 'middle')
                                                .attr('fill', d => chroma(d3.interpolateTurbo(d.data.sum)).luminance() > .4 ? '#000' : '#fff')
                                                .attr('font-size', '80%')
                                                .selectAll('tspan').data(d => {
                                                    return [
                                                        d.data.key,
                                                        d.data.value,
                                                        d3.format('.1f')(d.data.sum) + '%',
                                                    ]
                                                })
                                                .join('tspan')
                                                .attr('x', 0)
                                                .attr('dy', '1em')
                                                .text(d => d);

                                        })
                                })
                        })

                })
        }







