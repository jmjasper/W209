/* Height, Width of the SVG */
var w = 1600,
    h = 900,
    r = 120;

/* Original height and width of rectangle; dragbar width */
var width    = 90,
    height   = 50,
    dragbarw = 1; 


/* Moves the rectangle */
var drag = d3.behavior.drag()
                      .origin(Object)
                      .on("drag", dragmove);

/* Drag right */
var dragright = d3.behavior.drag()
                           .origin(Object)
                           .on("drag", rightdragresize);

/* Drag Left */
var dragleft = d3.behavior.drag()
                          .origin(Object)
                          .on("drag", leftdragresize);
/* Drag Top */
var dragtop = d3.behavior.drag()
                         .origin(Object)
                         .on("drag", topdragresize);

/* Drag Bottom */
var dragbottom = d3.behavior.drag()
                            .origin(Object)
                            .on("drag", bottomdragresize);

/* The SVG */
var svg = d3.select("body").append("svg")
            .attr("width", w)
            .attr("height", h)

/* Group */
var newg = svg.append("g")
              .data([{x:45, y: 600}]); 

/* Add the rectangle that can be dragged and resized */
var dragrect = newg.append("rect")
                   .attr("id", "active")
                   .attr("x", function(d) { return d.x; })
                   .attr("y", function(d) { return d.y; })
                   .attr("height", height)
                   .attr("width", width)
                   .attr("stroke", "#009900")
                   .attr("stroke-width", 2)
                   .attr("fill","none")
                   .attr("cursor", "move")
                   .call(drag);

/* The left dragbar object */
var dragbarleft = newg.append("rect")
                      .attr("x", function(d) { return d.x - dragbarw; })
                      .attr("y", function(d) { return d.y; })
                      .attr("height", height - dragbarw)
                      .attr("id", "dragleft")
                      .attr("width", dragbarw)
                      .attr("fill-opacity", 0)
                      .attr("stroke-width",2)
                      .attr("stroke", "#009900")
                      .attr("cursor", "ew-resize")
                      .call(dragleft);

/* The right dragbar object */
var dragbarright = newg.append("rect")
      .attr("x", function(d) { return d.x + width - dragbarw; })
      .attr("y", function(d) { return d.y; })
      .attr("id", "dragright")
      .attr("height", height)
      .attr("width", dragbarw)
      .attr("stroke", "#009900")
      .attr("stroke-width", 2)
      .attr("cursor", "ew-resize")
      .call(dragright);

/* The top dragbar object */
var dragbartop = newg.append("rect")
      .attr("x", function(d) { return d.x + dragbarw; })
      .attr("y", function(d) { return d.y - dragbarw; })
      .attr("height", dragbarw)
      .attr("id", "dragtop")
      .attr("width", width - dragbarw)
      .attr("fill", "none")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragtop);

/* The bottom dragbar object */
var dragbarbottom = newg.append("rect")
      .attr("x", function(d) { return d.x + dragbarw; })
      .attr("y", function(d) { return d.y + height - dragbarw; })
      .attr("id", "dragbottom")
      .attr("height", dragbarw)
      .attr("width", width - dragbarw)
      .attr("fill", "none")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragbottom);

/* Updates the x and y coordinates for the objects */

function dragmove(d) {
  
      dragrect
          .attr("x", d.x = Math.max(0, Math.min(w - width, d3.event.x)))

      dragbarleft 
          .attr("x", function(d) { return d.x + dragbarw; })
      dragbarright 
          .attr("x", function(d) { return d.x + width - dragbarw; })
      dragbartop 
          .attr("x", function(d) { return d.x})
      dragbarbottom 
          .attr("x", function(d) { return d.x; })

 
  
      dragrect
          .attr("y", d.y = Math.max(0, Math.min(h - height, d3.event.y)));

      dragbarleft 
          .attr("y", function(d) { return d.y; });
      dragbarright 
          .attr("y", function(d) { return d.y; });
      dragbartop 
          .attr("y", function(d) { return d.y - dragbarw; });
      dragbarbottom 
          .attr("y", function(d) { return d.y + height - dragbarw; });

}

/* Updates the x, y on a left resize */

function leftdragresize(d) {
   
      var oldx = d.x; 
     /* Max x on the right is x + width - dragbarw
      * Max x on the left is 0 - dragbarw
      */
      d.x = Math.max(0, Math.min(d.x + width - dragbarw, d3.event.x)); 
      width = width + (oldx - d.x);
      dragbarleft
        .attr("x", function(d) { return d.x - dragbarw; });
       
      dragrect
        .attr("x", function(d) { return d.x; })
        .attr("width", width);

     dragbartop 
        .attr("x", function(d) { return d.x + dragbarw; })
        .attr("width", width - dragbarw)
     dragbarbottom 
        .attr("x", function(d) { return d.x + dragbarw; })
        .attr("width", width - dragbarw)
  
}

/* updates the x, y on a right resize */

function rightdragresize(d) {
   
     /* Max x on the left is x - width 
      * Max x on the right is width of screen + (dragbarw/2)
      */
     var dragx = Math.max(d.x + dragbarw, Math.min(w, d.x + width + d3.event.dx));

     /* recalculate width */
     width = dragx - d.x;

     /* move the right drag handle */
     dragbarright
        .attr("x", function(d) { return dragx - dragbarw});

     /* resize the drag rectangle
      * as we are only resizing from the right, the x coordinate does not need to change
      */
     dragrect
        .attr("width", width);
     dragbartop 
        .attr("width", width - dragbarw)
     dragbarbottom 
        .attr("width", width - dragbarw)
  
}

/* updates the x, y on a top resize */

function topdragresize(d) {
 
  
      var oldy = d.y; 
      /* Max x on the right is x + width - dragbarw
       * Max x on the left is 0 - dragbarw
       */
      d.y = Math.max(0, Math.min(d.y + height - dragbarw , d3.event.y)); 
      height = height + (oldy - d.y);
      dragbartop
        .attr("y", function(d) { return d.y - (dragbarw / 2); });
       
      dragrect
        .attr("y", function(d) { return d.y; })
        .attr("height", height);

      dragbarleft 
        .attr("y", function(d) { return d.y + dragbarw; })
        .attr("height", height - dragbarw);
      dragbarright 
        .attr("y", function(d) { return d.y + dragbarw; })
        .attr("height", height - dragbarw);
  
}

/* updates the x, y on a bottom resize */

function bottomdragresize(d) {
   
     /* Max x on the left is x - width 
      * Max x on the right is width of screen + dragbarw
      */
     var dragy = Math.max(d.y + (dragbarw/2), Math.min(h, d.y + height + d3.event.dy));

     /* recalculate width */
     height = dragy - d.y;

     /* move the right drag handle */
     dragbarbottom
        .attr("y", function(d) { return dragy - dragbarw });

     /* resize the drag rectangle
      * as we are only resizing from the right, the x coordinate does not need to change.
      */
     dragrect
        .attr("height", height);
     dragbarleft 
        .attr("height", height - dragbarw);
     dragbarright 
        .attr("height", height - dragbarw);
  
}