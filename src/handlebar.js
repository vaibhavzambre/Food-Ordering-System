const { handlebars } = require("hbs");

handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 1; i <= n; i++)
        accum += block.fn(i)
    return accum;
});
handlebars.registerHelper('nextPage', function (n, block) {
    return Number(n) + 1;
})
handlebars.registerHelper('prevPage', function (n, block) {
    return Number(n) - 1;
})

handlebars.registerHelper('ifnext', function (currentPage, endPage, block) {
    if (Number(currentPage) >= Number(endPage))
        return 'disabled';
    else
        return false;
})
handlebars.registerHelper('ifprev', function (currentPage, block) {
    console.log(currentPage)
    if (Number(currentPage) <= 1)
        return 'disabled';
    else
        return false;
})

handlebars.registerHelper("ifCancelOrder",function(states,id,block){
    if(states=="NA"){
        return '<a href="/user/cancelOrder/'+id+'" class="main-btn">Cancel order</a>';
    }
})