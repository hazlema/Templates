/***
 * @version 1
 * Missing Drag and Drop functions in RaphaelJS
 *
 * RaphaelJS is an awsome library for doing canvas
 * related projects in a cross browser fassion.
 *
 * What the extention does is fill in a few little 
 * gaps in the library that specifically relate to
 * drag and drop.
 *
 * Matthew Hazlett
 * Clarity Computers
 * http://www.devclarity.com/
 * 3/4/2012
 *
 ***
 * Function: getFirst()
 *     Args: none
 *    Notes: This function walks the list of objects
 *           in RaphaelJS the find the first object created
 *  Returns: object
 *      Use: firstObject = myObject.getFirst();
 */
Raphael.el.getFirst = function(){
	var thisObject = this,
		saveObject = null;
			
	while (thisObject != null){
		saveObject = thisObject;
	  	thisObject = thisObject.prev;
	}
					
	return saveObject;
};
	        	
/***
 * Function: getAll()
 *     Args: none
 *    Notes: This function walks the list of objects
 *           in RaphaelJS and returns an array of objects
 *  Returns: [ object, object, object ]
 *      Use: allObjects = myObject.getAll();
 */
Raphael.el.getAll = function(){
   	var root  = this.getFirst(),
		child = root,
		list  = [];
	    	
	while (child != null){
		if (child != this) list.push(child);
	    	child = child.next;
	}

	return list;
}		    		
	    	
/***
 * Function: intersects(myObject)
 *     Args: Object to compare
 *    Notes: This function takes two objects and tells you
 *           if they intersect
 *  Returns: boolean
 *      Use: isIntersect = myObject.intersects(myObject);
 */
Raphael.el.intersects = function(cmp){
	var r1Box = this.getBBox(),
		r2Box = cmp.getBBox();
			
	r1 = { top: r1Box.x, bottom: r1Box.x + r1Box.height,
		   left: r1Box.x, right: r1Box.x + r1Box.width }

	r2 = { top: r2Box.x, bottom: r2Box.x + r2Box.height,
		   left: r2Box.x, right: r2Box.x + r2Box.width }
			
	return !(r2.left > r1.right || 
			r2.right < r1.left || 
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
}

/***
 * Function: intersectsWith()
 *     Args: none
 *    Notes: This function looks at all the objects
 *           and sees if this object intersects with any
 *  Returns: [ object, object, object ]
 *      Use: allIntersect = myObject.intersectsWith();
 */
Raphael.el.intersectsWith = function(){
	var list = [];
			
	this.getAll().each(function(el){
		if (this.intersects(el)) {
			list.push(el);
	  	}
	}.bind(this));
			
	return list;
}

var dragHelper = new Class({

	add: function(el){
		el.drag(this.moveDrag, this.startDrag, this.doneDrag);
	},
	
	startDrag: function (x, y){
		var dragAxis = this.type == 'rect' ? ['x', 'y'] : ['cx', 'cy'];
		var dragInfo = [ this.attr(dragAxis[0]), this.attr(dragAxis[1]) ];
		
		this.toFront();
		this.attr('opacity', .8);

		this.data('dragAxis', dragAxis);
		this.data('dragInfo', dragInfo);
		
		this.fireEvent('dragStart', [this, dragAxis, dragInfo]);
	},
		
	moveDrag: function (dx, dy){
		var dragAxis   = this.data('dragAxis'),
		    dragInfo   = this.data('dragInfo'),
		    dragValues = [this.attr(dragAxis[0], dragInfo[0] + dx),
						  this.attr(dragAxis[1], dragInfo[1] + dy)];
		
		this.attr('cursor', 'move');
		this.paper.safari();

		this.fireEvent('dragMove', [this, dragAxis, dragInfo, dragValues]);
	},
		
	doneDrag: function (){
		this.attr('opacity', 1);

		this.fireEvent('dragDone', [this, this.intersectsWith()]);
	}
});
