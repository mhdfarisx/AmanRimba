


function renderLayout() {

	console.group('%crenderLayout', 'color:magenta');

	renderYear();
	firstSelect();

	console.groupEnd('renderLayout');

}



function render() {

	console.group('%crender', 'color:magenta');

	calendar();
//	charts();

	console.groupEnd('render');

}




//function renderFilters() {
//
//	console.group('%crenderFilters', 'color:magenta');
//
//    allGroup = []
//
//    groupCategory.forEach((d, i) => {
//
//        allGroup.push(d)
//    })
//
//    firstSelect()
//
//	console.groupEnd('renderFilters');
//
//}




