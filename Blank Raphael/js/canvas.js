var Canvas = new Class({
    initialize: function(){
        this.height    = 600;
        this.width     = 600;
        this.xCenter   = this.width / 2;
        this.yCenter   = this.height / 2;
		
        //
        // Initalize the canvas area
        //
        this.paper = Raphael('Canvas', this.width, this.height);
        this.paper.rect(15, 15, this.width-15, this.height-15).attr({
        	'fill': '#333',
        	'stroke': 'green',
        	'stroke-width':5
        });
        
        var txt = this.paper.text(this.xCenter, this.yCenter, 'New Canvas').attr({
        	'fill':'#888',
        	'font-family':'Verdana',
        	'font-size':35
        });
        
        txt.node.addEvents({
        	'mouseover': function(){
        		txt.attr({
        			'fill':'yellow',
		        	'cursor':'pointer'
		        });
		    },
		    'mouseout': function(){
        		txt.attr({
        			'fill':'#888'
		        });
		    },
		    'click': function(){
		    	txt.animate({
		    		'fill':'red',
		    		transform: 'r360s2...'
		    	}, 5000, 'bounce', function() {
			    	txt.animate({
			    		'fill':'#888',
			    		transform:''
			    	}, 5000, 'elastic');
			    });
		    }
		});
    }
})

window.addEvent('domready', function(){
	new Canvas;
});
