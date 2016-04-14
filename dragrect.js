/* Height, Width of the SVG */
var w = 1600,
    h = 750,
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
                      .attr("x", function(d) { return d.x ; })
                      .attr("y", function(d) { return d.y+ 4*dragbarw; })
                      .attr("height", height - 4*dragbarw)
                      .attr("id", "dragleft")
                      .attr("width", dragbarw)
                      .attr("fill-opacity", 0)
                      .attr("stroke-width",1)
                      .attr("stroke", "#009900")
                      .attr("cursor", "ew-resize")
                      .call(dragleft);

/* The right dragbar object */
var dragbarright = newg.append("rect")
      .attr("x", function(d) { return d.x + width; })
      .attr("y", function(d) { return d.y+4*dragbarw; })
      .attr("id", "dragright")
      .attr("height", height-8*dragbarw)
      .attr("width", dragbarw)
      .attr("stroke", "#009900")
      .attr("stroke-width", 1)
      .attr("cursor", "ew-resize")
      .call(dragright);

/* The top dragbar object */
var dragbartop = newg.append("rect")
      .attr("x", function(d) { return d.x + 4* dragbarw; })
      .attr("y", function(d) { return d.y; })
      .attr("height", dragbarw)
      .attr("id", "dragtop")
      .attr("width", width - 8*dragbarw)
      .attr("stroke", "#009900")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragtop);

/* The bottom dragbar object */
var dragbarbottom = newg.append("rect")
      .attr("x", function(d) { return d.x + 4* dragbarw; })
      .attr("y", function(d) { return d.y + height; })
      .attr("id", "dragbottom")
      .attr("height", dragbarw)
      .attr("width", width - 8*dragbarw)
      .attr("stroke", "#009900")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragbottom);

/* Set the background image */
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = 'url(file:///C:/Users/mahrajag.ORADEV/Desktop/D3/DragResize/MagBarChart.png)';

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
      
      d.y = Math.max(0, Math.min(d.y + height - dragbarw , d3.event.y)); 

      /* recalculate the height */
      height = height + (oldy - d.y);
      dragbartop
        .attr("y", function(d) { return d.y - dragbarw; });
       
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
   
     var dragy = Math.max(d.y + dragbarw, Math.min(h, d.y + height + d3.event.dy));

     /* recalculate height */
     height = dragy - d.y;

     
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

/* This function  prints the pixel data */
function printpixeldata()
{
     var imagedata;
     var canvas     = document.createElement("canvas");
     var ctx        = canvas.getcontext("2d");
     var img        = new Image();

     img.src    ="file:///C:/Users/mahrajag.ORADEV/Desktop/D3/DragResize/MagBarChart.png";
     img.width  = w;
     img.height = h;

  
    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img,0,0,w,h);


    imagedata = ctx.getImageData(dragrect.attr("x"), dragrect.attr("y"), width, height);


    for (var x=0; x< width *height*4; x+=1)
       alert(imagedata.data[x]);

}
