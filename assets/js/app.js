// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;

// Define chart's margins as an object
var cM = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 75
};

// Define dimensions of the chart area
var cW = svgWidth - cM.left -cM.right;
var cH = svgHeight - cM.top - cM.bottom;

// Select where chart goes and append to it, also set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${cM.left}, ${cM.top})`);



// Loading Data
d3.csv("assets/data/data.csv").then(function(demodata) {
    
    // Log the data
    console.log(demodata);

    // Map obesity
    var obesity =  demodata.map(d => +d.obesity)
    console.log(obesity);

    // Map abbr
    var abbr = demodata.map(d => d.abbr)
    console.log(abbr);

    // Map income
    var income = demodata.map(d => +d.income)
    console.log(income);

    var xScale = d3.scaleLinear()
    .domain([d3.min(obesity),d3.max(obesity)])
    .range([0, cW]);

    var yScale = d3.scaleLinear()
    .domain([d3.min(income),d3.max(income)])
    .range([cH,0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
    .call(leftAxis);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${cH})`)
    .call(bottomAxis);

    chartGroup.selectAll("circle")
   .data(demodata).enter()
   .append("circle")
   .attr("cx", d => xScale(d.obesity))
   .attr("cy", d => yScale(d.income))
   .attr("r", 15)
   .attr("fill", "lightblue")

   chartGroup.selectAll("text")
   .data(demodata,function(d){return d;})
   .enter()
   .append("text")
   .text(d => d.abbr)
   .attr("x",d => xScale(d.obesity))
   .attr("y", d => yScale(d.income))
   .attr("fill", "gray")
   .attr("text-anchor", "middle")

   var labelGroup = chartGroup.append("text")
    .attr("transform", `translate(${cW / 2}, ${cH + 20})`)
    .classed("axis-text", true)
    .attr("x", 0)
    .attr("y",20)
    .text("Obesity %")

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",0 - cM.left)
    .attr("x", 0 - (cH/2))
    .attr("dy","1em")
    .classed("axis-text", true)
    .text("Income")
  
}).catch(function(error) {
    console.log(error);
});
